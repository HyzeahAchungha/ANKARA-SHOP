"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMdCheckmark } from "react-icons/io";
import { cn } from "@/lib/utils";

type ColorOption = {
  name: string;
  value: string;
  bgClass: string;
};

const colorOptions: ColorOption[] = [
  { name: "Green", value: "green", bgClass: "bg-green-600" },
  { name: "Red", value: "red", bgClass: "bg-red-600" },
  { name: "Yellow", value: "yellow", bgClass: "bg-yellow-300" },
  { name: "Orange", value: "orange", bgClass: "bg-orange-600" },
  { name: "Cyan", value: "cyan", bgClass: "bg-cyan-400" },
  { name: "Blue", value: "blue", bgClass: "bg-blue-600" },
  { name: "Purple", value: "purple", bgClass: "bg-purple-600" },
  { name: "Pink", value: "pink", bgClass: "bg-pink-600" },
  { name: "White", value: "white", bgClass: "bg-white" },
  { name: "Black", value: "black", bgClass: "bg-black" },
];

type ColorsSectionProps = {
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
};

const ColorsSection = ({
  selectedColors,
  setSelectedColors,
}: ColorsSectionProps) => {
  const toggleColor = (colorValue: string) => {
    if (selectedColors.includes(colorValue)) {
      setSelectedColors(selectedColors.filter((c) => c !== colorValue));
    } else {
      setSelectedColors([...selectedColors, colorValue]);
    }
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-colors">
      <AccordionItem value="filter-colors" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Colors
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex space-2.5 flex-wrap md:grid grid-cols-5 gap-2.5">
            {colorOptions.map((color, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  color.bgClass,
                  "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border border-black/20 hover:scale-110 transition-transform",
                ])}
                onClick={() => toggleColor(color.value)}
                title={color.name}
              >
                {selectedColors.includes(color.value) && (
                  <IoMdCheckmark
                    className={cn(
                      "text-base",
                      color.value === "white" || color.value === "yellow"
                        ? "text-black"
                        : "text-white"
                    )}
                  />
                )}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorsSection;