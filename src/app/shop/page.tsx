"use client";

import { useState, useMemo } from "react";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ankaraProducts } from "@/lib/data/products";

const ITEMS_PER_PAGE = 9;

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"most-popular" | "low-price" | "high-price">("most-popular");
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([7000, 50000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...ankaraProducts];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) => 
        p.color && selectedColors.includes(p.color)
      );
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes && p.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    // Sort products
    if (sortBy === "low-price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-price") {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      // Most popular - sort by rating
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [selectedCategory, priceRange, selectedColors, selectedSizes, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // Category name mapping
  const getCategoryTitle = () => {
    if (!selectedCategory) return "All Products";
    const categoryMap: { [key: string]: string } = {
      "short-gowns": "Short Gowns",
      "long-gowns": "Long Gowns",
      "midi-dress": "Midi Dresses",
      "jumpsuits": "Jumpsuits",
      "two-pieces": "Two Pieces",
      "traditional-wedding-party": "Traditional & Wedding",
    };
    return categoryMap[selectedCategory] || "All Products";
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Filters</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters
              selectedCategory={selectedCategory}
              setSelectedCategory={(cat) => {
                setSelectedCategory(cat);
                handleFilterChange();
              }}
              priceRange={priceRange}
              setPriceRange={(range) => {
                setPriceRange(range);
                handleFilterChange();
              }}
              selectedColors={selectedColors}
              setSelectedColors={(colors) => {
                setSelectedColors(colors);
                handleFilterChange();
              }}
              selectedSizes={selectedSizes}
              setSelectedSizes={(sizes) => {
                setSelectedSizes(sizes);
                handleFilterChange();
              }}
            />
          </div>
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">
                  {getCategoryTitle()}
                </h1>
                <MobileFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={(cat) => {
                    setSelectedCategory(cat);
                    handleFilterChange();
                  }}
                  priceRange={priceRange}
                  setPriceRange={(range) => {
                    setPriceRange(range);
                    handleFilterChange();
                  }}
                  selectedColors={selectedColors}
                  setSelectedColors={(colors) => {
                    setSelectedColors(colors);
                    handleFilterChange();
                  }}
                  selectedSizes={selectedSizes}
                  setSelectedSizes={(sizes) => {
                    setSelectedSizes(sizes);
                    handleFilterChange();
                  }}
                />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} Products
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="low-price">Low Price</SelectItem>
                      <SelectItem value="high-price">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {currentProducts.length > 0 ? (
              <>
                <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} data={product} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <>
                    <hr className="border-t-black/10" />
                    <Pagination className="justify-between">
                      <PaginationPrevious
                        href="#"
                        className="border border-black/10"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                      />
                      <PaginationContent>
                        {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = idx + 1;
                          } else if (currentPage <= 3) {
                            pageNum = idx + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + idx;
                          } else {
                            pageNum = currentPage - 2 + idx;
                          }

                          return (
                            <PaginationItem key={idx}>
                              <PaginationLink
                                href="#"
                                className="text-black/50 font-medium text-sm"
                                isActive={currentPage === pageNum}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(pageNum);
                                }}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                        {totalPages > 5 && (
                          <PaginationItem>
                            <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                      <PaginationNext
                        href="#"
                        className="border border-black/10"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                      />
                    </Pagination>
                  </>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-black/60">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([7000, 50000]);
                    setSelectedColors([]);
                    setSelectedSizes([]);
                    setCurrentPage(1);
                  }}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-black/80"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}