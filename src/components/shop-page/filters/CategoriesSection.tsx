"use client";

import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";

type Category = {
  title: string;
  value: string;
};

const categoriesData: Category[] = [
  {
    title: "Short Gowns",
    value: "short-gowns",
  },
  {
    title: "Long Gowns",
    value: "long-gowns",
  },
  {
    title: "Midi Dresses",
    value: "midi-dress",
  },
  {
    title: "Jumpsuits",
    value: "jumpsuits",
  },
  {
    title: "Two Pieces",
    value: "two-pieces",
  },
  {
    title: "Traditional & Wedding",
    value: "traditional-wedding-party",
  },
];

type CategoriesSectionProps = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
};

const CategoriesSection = ({
  selectedCategory,
  setSelectedCategory,
}: CategoriesSectionProps) => {
  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      <button
        type="button"
        className={cn(
          "flex items-center justify-between py-2 text-left hover:text-black transition-colors",
          selectedCategory === null && "text-black font-semibold"
        )}
        onClick={() => setSelectedCategory(null)}
      >
        All Products <MdKeyboardArrowRight />
      </button>
      {categoriesData.map((category, idx) => (
        <button
          key={idx}
          type="button"
          className={cn(
            "flex items-center justify-between py-2 text-left hover:text-black transition-colors",
            selectedCategory === category.value && "text-black font-semibold"
          )}
          onClick={() => setSelectedCategory(category.value)}
        >
          {category.title} <MdKeyboardArrowRight />
        </button>
      ))}
    </div>
  );
};

export default CategoriesSection;