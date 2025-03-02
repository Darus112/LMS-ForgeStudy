"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import ButtonMotion from "@/components/ui/button-motion";

import { BookCheck, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published");
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted");

      router.push(`/teacher/courses`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <ButtonMotion
        icon={BookCheck}
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </ButtonMotion>
      <ConfirmModal onConfirm={onDelete}>
        <ButtonMotion icon={Trash} disabled={isLoading}>
          Delete
        </ButtonMotion>
      </ConfirmModal>
    </div>
  );
};
