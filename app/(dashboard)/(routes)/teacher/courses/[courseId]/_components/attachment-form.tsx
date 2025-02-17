"use client";

import React, { useState } from "react";
import { File, Loader2, PlusCircle, X } from "lucide-react";

import * as z from "zod";
import axios from "axios";

import { FileUpload } from "@/components/file-upload";
import ButtonMotion from "@/components/ui/button-motion";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
  name: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 p-4 rounded-sm bg-white border-[1px] border-darkblue/20">
      <div className="font-medium flex items-center justify-between">
        <h1 className="text-xl font-medium">Course attachments</h1>
        <ButtonMotion
          icon={isEditing ? X : PlusCircle}
          onClick={toggleEdit}
          size="small"
          iconSize="small"
          color="darkblue"
          text="darkblue"
        >
          {isEditing ? <>Cancel</> : <>Add an file</>}
        </ButtonMotion>
      </div>

      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2 mt-5">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-lightblue/30  text-lightblack rounded-sm gap-x-2 font-medium"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(file) => {
              if (file?.url && file?.name) {
                onSubmit({ url: file.url, name: file.name });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};
