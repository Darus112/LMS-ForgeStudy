"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import { ArrowRight, BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { useState } from "react";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link href={`/courses/${id}`}>
      <div
        className="group overflow-hidden p-4 h-full"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <motion.div
          className="relative w-full aspect-video rounded-xl overflow-hidden"
          animate={{
            scale: isHover ? 1.06 : 1,
          }}
          transition={{
            ease: "easeIn",
            duration: 0.2,
          }}
        >
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </motion.div>
        <div className="flex flex-col pt-2">
          <p className="text-sm font-medium text-muted-foreground">
            {category} &#x2022;
          </p>
          <div className="text-lg md:text-2xl font-semibold group-hover:text-darkblue transition line-clamp-2">
            <motion.div
              className="relative"
              animate={{
                x: isHover ? 24 : 0,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <motion.div
                className="absolute"
                animate={{
                  x: isHover ? 6 : 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <div className="absolute right-2 top-1">
                  <ArrowRight />
                </div>
              </motion.div>
              {title}
            </motion.div>
          </div>

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="md" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
