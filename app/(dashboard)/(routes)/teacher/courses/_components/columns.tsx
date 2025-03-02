"use client";

import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { ArrowUpDown, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ButtonMotion from "@/components/ui/button-motion";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = new Intl.NumberFormat("ro-RO", {
        style: "currency",
        currency: "EUR",
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge
          className={cn(
            "bg-darkgray/80 dark:bg-white/50",
            isPublished && "bg-lightblue/90 dark:bg-white/90"
          )}
        >
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <div className="w-full flex items-center">
          <Link href={`/teacher/courses/${id}`}>
            <ButtonMotion icon={Pencil} size="small" iconSize="small">
              Edit
            </ButtonMotion>
          </Link>
        </div>
      );
    },
  },
];
