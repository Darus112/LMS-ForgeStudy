"use client";

import React, { useState } from "react";
import { Check, Pencil, PlusCircle, Video } from "lucide-react";

import * as z from "zod";
import axios from "axios";

import MuxPlayer from "@mux/mux-player-react";

import { FileUpload } from "@/components/file-upload";
import ButtonMotion from "@/components/ui/button-motion";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const getButtonIcon = () => {
    if (isEditing) return Check;
    if (!initialData.videoUrl) return PlusCircle;
    return Pencil;
  };

  return (
    <div className="mt-6 p-4 rounded-sm bg-white border-[1px] border-darkblue/20">
      <div className="font-medium flex items-center justify-between">
        <h1 className="text-xl font-medium">Chapter video</h1>
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
            : initialData.videoUrl
            ? "Edit video"
            : "Add a video"}
        </ButtonMotion>
      </div>

      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-lightblue/20 rounded-2xl mt-5">
            <Video className="h-10 w-10 text-lightblack/80" />
          </div>
        ) : (
          <div className="relative aspect-video mt-5 rounded-lg overflow-hidden">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
              className="shadow-xl rounded-2xl w-full h-full"
            />
          </div>
        ))}
      {isEditing && (
        <div className="mt-5">
          <FileUpload
            endpoint="chapterVideo"
            onChange={(file) => {
              if (file) {
                onSubmit({ videoUrl: file.url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if the
          video does not appear
        </div>
      )}
    </div>
  );
};
