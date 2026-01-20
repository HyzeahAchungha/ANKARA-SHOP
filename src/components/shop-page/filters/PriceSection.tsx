"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { Slider } from "@/components/ui/slider";

type PriceSectionProps = {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
};

const PriceSection = ({ priceRange, setPriceRange }: PriceSectionProps) => {
  const handleValueChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-6" contentClassName="overflow-visible">
          <div className="px-2 pt-8 pb-4">
            <input
              type="range"
              min={7000}
              max={50000}
              step={1000}
              value={priceRange[0]}
              onChange={(e) => handleValueChange([Number(e.target.value), priceRange[1]])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <input
              type="range"
              min={7000}
              max={50000}
              step={1000}
              value={priceRange[1]}
              onChange={(e) => handleValueChange([priceRange[0], Number(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black -mt-2"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-black/60">
            <span>{priceRange[0].toLocaleString()} CFA</span>
            <span>{priceRange[1].toLocaleString()} CFA</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;