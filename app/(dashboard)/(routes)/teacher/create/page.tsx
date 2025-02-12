"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import ButtonMotion from "@/components/ui/button-motion";
import { ArrowBigRight, X } from "lucide-react";
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreatePage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created");
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="max-w-5xl mx-auto flex items-center justify-center h-full p-6 top-64 relative">
      <div>
        <h1 className="text-3xl font-semibold text-lightblack">
          Name your course
        </h1>
        <p className="text-sm font-medium text-slate-400">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-lightblack">
                    Course title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white border-b-4 border-lightblue focus-visible:ring-lightblue font-medium text-lightblack"
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-medium text-slate-400">
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/teacher/courses">
                <ButtonMotion icon={X} color="darkblue" text="darkblue">
                  Cancel
                </ButtonMotion>
              </Link>
              <ButtonMotion
                type="submit"
                icon={ArrowBigRight}
                color="darkblue"
                text="darkblue"
                disabled={!isValid || isSubmitting}
              >
                Continue
              </ButtonMotion>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
