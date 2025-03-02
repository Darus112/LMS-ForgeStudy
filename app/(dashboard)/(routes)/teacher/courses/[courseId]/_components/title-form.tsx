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

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ButtonMotion from "@/components/ui/button-motion";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
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
    <div className="mt-6 p-4 rounded-sm bg-white dark:bg-dark dark:border-white/20 border-[1px] border-darkblue/20">
      <div className="font-medium flex items-center justify-between">
        <h1 className="text-xl font-medium">Course title</h1>
        <ButtonMotion
          icon={isEditing ? X : Pencil}
          onClick={toggleEdit}
          size="small"
          iconSize="small"
        >
          {isEditing ? <>Cancel</> : <>Edit title</>}
        </ButtonMotion>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-dark/5 dark:bg-white/10 rounded-md focus-visible:ring-0"
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
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
