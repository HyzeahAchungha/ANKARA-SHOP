export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  category?: string; 
  color?: string; 
  sizes?: string[];
};

export type Category = 
  | "short-gowns"
  | "long-gowns"
  | "midi-dress"
  | "jumpsuits"
  | "two-pieces"
  | "traditional-wedding-party";

// Color options for filtering
export type ColorOption = {
  name: string;
  value: string; // The color string like "red", "blue", etc.
  bgClass: string; // Tailwind class like "bg-red-600"
};

// Size options
export type SizeOption = 
  | "XX-Small"
  | "X-Small"
  | "Small"
  | "Medium"
  | "Large"
  | "X-Large"
  | "XX-Large"
  | "3X-Large"
  | "4X-Large";

// Filter state for shop page
export type FilterState = {
  category: string | null;
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  sortBy: "most-popular" | "low-price" | "high-price";
};