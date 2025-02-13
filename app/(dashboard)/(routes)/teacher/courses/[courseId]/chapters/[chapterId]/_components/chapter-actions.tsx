"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import ButtonMotion from "@/components/ui/button-motion";
import { BookCheck, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  chapterId,
  courseId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success("Chapter unpublished");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success("Chapter published");
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

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      toast.success("Chapter deleted");

      router.push(`/teacher/courses/${courseId}`);
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
        color="grey"
        text="grey"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </ButtonMotion>
      <ConfirmModal onConfirm={onDelete}>
        <ButtonMotion
          icon={Trash}
          disabled={isLoading}
          color="darkblue"
          text="darkblue"
        >
          Delete
        </ButtonMotion>
      </ConfirmModal>
    </div>
  );
};
