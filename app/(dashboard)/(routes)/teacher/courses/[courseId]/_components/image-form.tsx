"use client";

import React, { useState } from "react";
import { Check, ImageIcon, Pencil, PlusCircle } from "lucide-react";

import * as z from "zod";
import axios from "axios";

import { FileUpload } from "@/components/file-upload";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import ButtonMotion from "@/components/ui/button-motion";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const getButtonIcon = () => {
    if (isEditing) return Check;
    if (!initialData.imageUrl) return PlusCircle;
    return Pencil;
  };

  return (
    <div className="mt-6 p-4 rounded-2xl shadow-[5px_5px_0px_0px_rgba(26,47,251)] bg-white/80">
      <div className="font-medium flex items-center justify-between">
        <h1 className="text-xl font-medium">Course image</h1>
        <ButtonMotion
          icon={getButtonIcon()}
          onClick={toggleEdit}
          size="small"
          iconSize="small"
          color="darkblue"
          text="darkblue"
        >
          {isEditing
            ? "Cancel"
            : initialData.imageUrl
            ? "Edit image"
            : "Add an image"}
        </ButtonMotion>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-lightblue/20 rounded-2xl mt-5">
            <ImageIcon className="h-10 w-10 text-lightblack/80" />
          </div>
        ) : (
          <div className="relative aspect-video mt-5">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-2xl"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div className="mt-5">
          <FileUpload
            endpoint="courseImage"
            onChange={(file) => {
              if (file) {
                onSubmit({ imageUrl: file.url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
