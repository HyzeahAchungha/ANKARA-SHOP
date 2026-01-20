"use client";

import React from "react";
import { useCart } from "@/lib/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { X } from "lucide-react";

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cart, totalPrice, adjustedTotalPrice, removeItem } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
        </SheetHeader>

        {cart && cart.items.length > 0 ? (
          <div className="mt-8 space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 pb-4 border-b border-black/10">
                  <Link
                    href={`/shop/product/${item.id}/${item.name.split(" ").join("-")}`}
                    className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
                    onClick={onClose}
                  >
                    <Image
                      src={item.srcUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/shop/product/${item.id}/${item.name.split(" ").join("-")}`}
                        className="font-semibold text-sm hover:underline truncate"
                        onClick={onClose}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id, item.attributes)}
                        className="text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    <div className="text-xs text-black/60 mt-1">
                      <span>Size: {item.attributes[0]}</span>
                      <span className="mx-2">•</span>
                      <span>Color: {item.attributes[1]}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-sm">
                        {item.discount.percentage > 0
                          ? Math.round(item.price - (item.price * item.discount.percentage) / 100)
                          : item.discount.amount > 0
                          ? item.price - item.discount.amount
                          : item.price}{" "}
                        CFA
                      </span>
                      <span className="text-xs text-black/60">Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-3 pt-4 border-t border-black/10">
              <div className="flex justify-between text-sm">
                <span className="text-black/60">Subtotal</span>
                <span className="font-semibold">{totalPrice} CFA</span>
              </div>
              
              {totalPrice !== adjustedTotalPrice && (
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Discount</span>
                  <span className="font-semibold text-red-600">
                    -{Math.round(totalPrice - adjustedTotalPrice)} CFA
                  </span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span className="text-black/60">Delivery</span>
                <span className="font-semibold">Free</span>
              </div>
              
              <div className="flex justify-between pt-3 border-t border-black/10">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg">{Math.round(adjustedTotalPrice)} CFA</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                asChild
                className="w-full bg-black text-white rounded-full h-12 hover:bg-black/80 group"
                onClick={onClose}
              >
                <Link href="/cart">
                  View Cart
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                variant="outline"
                className="w-full rounded-full h-12"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="text-6xl mb-4">🛍️</div>
            <p className="text-lg font-semibold mb-2">Your cart is empty</p>
            <p className="text-sm text-black/60 mb-6">Add some beautiful Ankara dresses!</p>
            <Button
              asChild
              className="bg-black text-white rounded-full px-8"
              onClick={onClose}
            >
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;