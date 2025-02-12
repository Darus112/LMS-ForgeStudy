"use client";

import React, { useState } from "react";
import { Check, Pencil, X } from "lucide-react";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import ButtonMotion from "@/components/ui/button-motion";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree,
    },
  });

  const { isSubmitting, isValid } = form.formState;

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

  return (
    <div className="mt-6 p-4 rounded-2xl shadow-[5px_5px_0px_0px_rgba(26,47,251)]">
      <div className="font-medium flex items-center justify-between">
        <h1 className="text-xl font-medium">Chapter access</h1>
        <ButtonMotion
          icon={isEditing ? X : Pencil}
          onClick={toggleEdit}
          size="small"
          iconSize="small"
          color="darkblue"
          text="darkblue"
        >
          {isEditing ? <>Cancel</> : <>Edit access</>}
        </ButtonMotion>
      </div>
      {!isEditing && (
        <p className="text-slate-500 italic text-sm">
          {initialData.isFree ? (
            <>This chapter is free for preview</>
          ) : (
            <>This chapter is not free</>
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                  <FormControl>
                    <Checkbox
                      className=" rounded-full w-5 h-5"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this to make it free for preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <ButtonMotion
                icon={Check}
                disabled={!isValid || isSubmitting}
                type="submit"
                color="darkblue"
                text="darkblue"
              >
                Save
              </ButtonMotion>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
