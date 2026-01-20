"use client";

import { useCart } from "@/lib/context/CartContext";
import { Product } from "@/types/product.types";
import React from "react";

type AddToCartBtnProps = {
  data: Product & { quantity: number };
  selectedSize: string;
  selectedColor: string;
  onAddSuccess: () => void;
};

const AddToCartBtn = ({
  data,
  selectedSize,
  selectedColor,
  onAddSuccess,
}: AddToCartBtnProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: data.id,
      name: data.title,
      srcUrl: data.srcUrl,
      price: data.price,
      attributes: [selectedSize, selectedColor],
      discount: data.discount,
      quantity: data.quantity,
    });
    
    // Trigger success callback (will open cart sidebar)
    onAddSuccess();
  };

  return (
    <button
      type="button"
      className="bg-primary text-primary-foreground hover:bg-secondary w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white transition-all hover:bg-black/80"
      style={{
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: "9999px",
        borderTopRightRadius: "9999px",
        borderBottomRightRadius: "9999px",
      }}
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;