"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const colorsData = [
  { name: "Red", value: "red", code: "bg-red-600" },
  { name: "Blue", value: "blue", code: "bg-blue-600" },
  { name: "Green", value: "green", code: "bg-green-600" },
  { name: "Yellow", value: "yellow", code: "bg-yellow-300" },
  { name: "Purple", value: "purple", code: "bg-purple-600" },
];

type ColorSelectionProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ColorSelection = ({
  selectedColor,
  setSelectedColor,
}: ColorSelectionProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Select Colors
      </span>
      <div className="flex items-center flex-wrap space-x-3 sm:space-x-4">
        {colorsData.map((color, index) => (
          <button
            key={index}
            type="button"
            className={cn([
              color.code,
              "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center hover:scale-110 transition-transform",
            ])}
            onClick={() => setSelectedColor(color.name)}
          >
            {selectedColor === color.name && (
              <IoMdCheckmark
                className={cn(
                  "text-base",
                  color.value === "yellow" ? "text-black" : "text-white"
                )}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;