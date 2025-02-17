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
import ButtonMotion from "@/components/ui/button-motion";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number(),
});

export const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
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
    <div className="mt-6 p-4 rounded-sm bg-white border-[1px] border-darkblue/20">
      <div className="font-medium flex items-center justify-between">
        <h1 className="text-xl font-medium">Course price</h1>
        <ButtonMotion
          icon={isEditing ? X : Pencil}
          onClick={toggleEdit}
          size="small"
          iconSize="small"
          color="darkblue"
          text="darkblue"
        >
          {isEditing ? <>Cancel</> : <>Edit price</>}
        </ButtonMotion>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.price && "text-slate-500 italic"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "No price"}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-b-2 rounded-sm border-lightblack bg-white"
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course"
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
