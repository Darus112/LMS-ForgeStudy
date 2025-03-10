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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import ButtonMotion from "@/components/ui/button-motion";

interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

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

  return (
    <div className="mt-6 p-4 rounded-sm bg-white border-[1px] border-darkblue/20 dark:bg-dark dark:border-white/20">
      <div className="font-medium flex items-center justify-between">
        <h1 className="text-xl font-medium">Course description</h1>
        <ButtonMotion
          icon={isEditing ? X : Pencil}
          onClick={toggleEdit}
          size="small"
          iconSize="small"
        >
          {isEditing ? <>Cancel</> : <> Edit description</>}
        </ButtonMotion>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {initialData.description || "No description"}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="bg-dark/5 dark:bg-white/10 focus-visible:ring-0"
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course is about...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <ButtonMotion
                icon={Check}
                disabled={!isValid || isSubmitting}
                type="submit"
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
