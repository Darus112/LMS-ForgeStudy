"use client";

import React from "react";
import { BookOpen, BookCheck, LogIn, Play, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ButtonMotion from "./ui/button-motion";
import { CourseProgress } from "./course-progress";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  descritpion: string;
  progress: number | null;
  courseId: string;
}

export const CourseModal = ({
  isOpen,
  onClose,
  title,
  imageUrl,
  chaptersLength,
  descritpion,
  progress,
  courseId,
}: CourseModalProps) => {
  const { userId } = useAuth();
  const router = useRouter();

  const handleButtonClick = () => {
    if (userId) {
      router.push(`/courses/${courseId}`);
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 " />
      <DialogPanel className="fixed inset-0 flex justify-center items-center p-4 z-50">
        <motion.div
          className="bg-white dark:bg-dark rounded-md w-full max-w-3xl h-auto p-6 border border-lightblack/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-medium dark:text-slate-200">
              {title}
            </h3>
            <button onClick={onClose} className="text-lg text-gray-500">
              <X />
            </button>
          </div>
          <div className="flex gap-4 md:gap-x-20">
            <div className="flex flex-col gap-3">
              <div className="w-44 h-24 sm:w-72 sm:h-40 relative">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mt-4">
                <ButtonMotion
                  icon={userId ? (progress === 100 ? BookCheck : Play) : LogIn}
                  size="small"
                  iconSize="small"
                  onClick={handleButtonClick}
                >
                  {userId
                    ? progress === 100
                      ? "Course Completed"
                      : progress === 0 || progress === null
                      ? "Start Course"
                      : "Continue Course"
                    : "Sign In"}
                </ButtonMotion>
                <p className="text-sm text-gray-500 mt-2">
                  {userId
                    ? progress === 100
                      ? "You have completed the course!"
                      : progress === 0 || progress === null
                      ? "Ready to start the course?"
                      : "Ready to continue the course?"
                    : "Log In to continue to platform"}
                </p>
              </div>
            </div>
          </div>
          <div className="my-3 flex items-center gap-x-3 text-sm">
            <div className="flex items-center gap-x-1 text-lightblue bg-lightblue/10 dark:bg-white/5 dark:text-slate-500 rounded-md px-2 py-[4px]">
              <BookOpen className="h-5 w-5" />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          <CourseProgress
            variant={progress === 100 ? "success" : "default"}
            size="sm"
            value={progress || 0}
          />
          <div className="text-gray-600 dark:text-gray-500 pt-3">
            {descritpion}
          </div>
        </motion.div>
      </DialogPanel>
    </Dialog>
  );
};
