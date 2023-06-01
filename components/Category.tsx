"use client";

import { useSearchParams } from "next/navigation";
import useCategories from "@/hooks/useCategories";
import CategoryItem from "./CategoryItem";

export default function Categories() {
  const { getAllCategories } = useCategories();
  const categories = getAllCategories();

  const params = useSearchParams();
  const category = params?.get("category");

  return (
    <div className="flex flex-wrap items-center justify-evenly bg-secondary px-4 pt-4">
      {categories.map((item) => (
        <CategoryItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={category === item.label}
        />
      ))}
    </div>
  );
}
