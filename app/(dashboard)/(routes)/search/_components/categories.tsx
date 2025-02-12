"use client";

import React from "react";

import { Category } from "@prisma/client";
import {
  MdOutlineEngineering,
  MdOutlineMusicNote,
  MdOutlineCameraAlt,
  MdDevices,
  MdOutlineFitnessCenter,
  MdOutlinePointOfSale,
} from "react-icons/md";
import { IoMdFilm } from "react-icons/io";
import { IconType } from "react-icons/lib";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Music": MdOutlineMusicNote,
  "Photography": MdOutlineCameraAlt,
  "Filming": IoMdFilm,
  "Engineering": MdOutlineEngineering,
  "Computer Science": MdDevices,
  "Fitness": MdOutlineFitnessCenter,
  "Accounting": MdOutlinePointOfSale,
};

export default function Categories({ items }: CategoriesProps) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 custom-scrollbar">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
}
