"use client";

import { useCart } from "@/lib/context/CartContext";
import Image from "next/image";
import React, { useState } from "react";
import CartSidebar from "@/components/layout/CartSidebar";

const CartBtn = () => {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative mr-[14px] p-1 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <Image
          priority
          src="/icons/cart.svg"
          height={100}
          width={100}
          alt="cart"
          className="max-w-[22px] max-h-[22px]"
        />
        {cart && cart.totalQuantities > 0 && (
          <span className="border bg-black text-white rounded-full w-fit h-fit px-1 text-xs absolute -top-3 left-1/2 -translate-x-1/2 min-w-[18px] text-center">
            {cart.totalQuantities}
          </span>
        )}
      </button>
    </>
  );
};

export default CartBtn;