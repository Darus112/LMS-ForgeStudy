"use client";

import { useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";

import { formatPrice } from "@/lib/format";
import ButtonMotion from "@/components/ui/button-motion";
import { ShoppingBag } from "lucide-react";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ButtonMotion icon={ShoppingBag} onClick={onClick}>
      Enroll for {formatPrice(price)}
    </ButtonMotion>
  );
};
