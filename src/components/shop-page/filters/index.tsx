import React from "react";
import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import ColorsSection from "@/components/shop-page/filters/ColorsSection";
import PriceSection from "@/components/shop-page/filters/PriceSection";
import SizeSection from "@/components/shop-page/filters/SizeSection";
import { Button } from "@/components/ui/button";

type FiltersProps = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
};

const Filters = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
}: FiltersProps) => {
  const handleClearAll = () => {
    setSelectedCategory(null);
    setPriceRange([7000, 50000]);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  const hasActiveFilters =
    selectedCategory !== null ||
    priceRange[0] !== 7000 ||
    priceRange[1] !== 50000 ||
    selectedColors.length > 0 ||
    selectedSizes.length > 0;

  return (
    <>
      <hr className="border-t-black/10" />
      <CategoriesSection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <hr className="border-t-black/10" />
      <PriceSection priceRange={priceRange} setPriceRange={setPriceRange} />
      <hr className="border-t-black/10" />
      <ColorsSection
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
      />
      <hr className="border-t-black/10" />
      <SizeSection
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
      />
      {hasActiveFilters && (
        <>
          <hr className="border-t-black/10" />
          <Button
            type="button"
            onClick={handleClearAll}
            variant="outline"
            className="w-full rounded-full text-sm font-medium py-4 h-12"
          >
            Clear All Filters
          </Button>
        </>
      )}
    </>
  );
};

export default Filters;