import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto mt-8 z-20">
        <Separator />
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <Separator />
        <div className="bg-white dark:bg-dark border-[1px] border-darkblue/20 dark:border-white/20 rounded-md m-4">
          <div className="p-4 pl-6 flex flex-col md:flex-row items-center justify-between mt-10">
            <h2 className="text-2xl font-semibold mb-2 dark:text-gray-300">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <div className="m-4">
            <Preview value={chapter.description!} />
          </div>
        </div>

        {!!attachments.length && (
          <div className="p-4 space-y-2 bg-white dark:bg-dark border-[1px] dark:border-white/20 border-darkblue/20 rounded-md m-4">
            <h2 className="text-darkgray/60 dark:text-gray-300 pl-4">
              Attachments
            </h2>
            {attachments.map((attachment) => (
              <a
                href={attachment.url}
                target="_blank"
                key={attachment.id}
                className="flex items-center p-2 w-full text-lightblue/70 dark:text-gray-400 rounded-md hover:underline gap-2 border-[1px] border-darkblue/20  bg-lightblue/5 dark:bg-[#2B2E31] dark:border-none text-sm"
              >
                <File />
                <p className="line-clamp-1">{attachment.name}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterIdPage;
