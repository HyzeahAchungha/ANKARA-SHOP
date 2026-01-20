"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Discount } from "@/types/product.types";

// Cart Item Type
export type CartItem = {
  id: number;
  name: string;
  srcUrl: string;
  price: number;
  attributes: string[];
  discount: Discount;
  quantity: number;
};

// Cart Type
export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

// Context Type
type CartContextType = {
  cart: Cart | null;
  totalPrice: number;
  adjustedTotalPrice: number;
  addToCart: (item: CartItem) => void;
  removeCartItem: (id: number, attributes: string[]) => void;
  removeItem: (id: number, attributes: string[]) => void;
};

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper: Calculate adjusted price with discounts
const calcAdjustedTotalPrice = (
  totalPrice: number,
  data: CartItem,
  quantity?: number
): number => {
  return (
    (totalPrice + data.discount.percentage > 0
      ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
      : data.discount.amount > 0
      ? Math.round(data.price - data.discount.amount)
      : data.price) * (quantity ? quantity : data.quantity)
  );
};

// Helper: Compare arrays
const compareArrays = (a: any[], b: any[]) => {
  return a.toString() === b.toString();
};

// Provider Component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [adjustedTotalPrice, setAdjustedTotalPrice] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart.cart);
      setTotalPrice(parsedCart.totalPrice);
      setAdjustedTotalPrice(parsedCart.adjustedTotalPrice);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart !== null) {
      localStorage.setItem(
        "cart",
        JSON.stringify({ cart, totalPrice, adjustedTotalPrice })
      );
    }
  }, [cart, totalPrice, adjustedTotalPrice]);

  // Add to cart
  const addToCart = (item: CartItem) => {
    // If cart is empty, create new cart
    if (cart === null) {
      setCart({
        items: [item],
        totalQuantities: item.quantity,
      });
      setTotalPrice(item.price * item.quantity);
      setAdjustedTotalPrice(calcAdjustedTotalPrice(item.price, item));
      return;
    }

    // Check if item already in cart
    const existingItem = cart.items.find(
      (cartItem) =>
        item.id === cartItem.id &&
        compareArrays(item.attributes, cartItem.attributes)
    );

    if (existingItem) {
      // Update quantity of existing item
      const updatedItems = cart.items.map((cartItem) => {
        if (
          cartItem.id === item.id &&
          compareArrays(cartItem.attributes, item.attributes)
        ) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + item.quantity,
          };
        }
        return cartItem;
      });

      setCart({
        items: updatedItems,
        totalQuantities: cart.totalQuantities + item.quantity,
      });
      setTotalPrice(totalPrice + item.price * item.quantity);
      setAdjustedTotalPrice(
        adjustedTotalPrice + calcAdjustedTotalPrice(item.price, item)
      );
    } else {
      // Add new item to cart
      setCart({
        items: [...cart.items, item],
        totalQuantities: cart.totalQuantities + item.quantity,
      });
      setTotalPrice(totalPrice + item.price * item.quantity);
      setAdjustedTotalPrice(
        adjustedTotalPrice + calcAdjustedTotalPrice(item.price, item)
      );
    }
  };

  // Remove one quantity from cart item
  const removeCartItem = (id: number, attributes: string[]) => {
    if (!cart) return;

    const existingItem = cart.items.find(
      (item) => item.id === id && compareArrays(item.attributes, attributes)
    );

    if (!existingItem) return;

    const updatedItems = cart.items
      .map((item) => {
        if (item.id === id && compareArrays(item.attributes, attributes)) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart({
      items: updatedItems,
      totalQuantities: cart.totalQuantities - 1,
    });
    setTotalPrice(totalPrice - existingItem.price);
    setAdjustedTotalPrice(
      adjustedTotalPrice -
        calcAdjustedTotalPrice(existingItem.price, existingItem, 1)
    );
  };

  // Remove entire item from cart
  const removeItem = (id: number, attributes: string[]) => {
    if (!cart) return;

    const existingItem = cart.items.find(
      (item) => item.id === id && compareArrays(item.attributes, attributes)
    );

    if (!existingItem) return;

    const updatedItems = cart.items.filter(
      (item) =>
        !(item.id === id && compareArrays(item.attributes, attributes))
    );

    setCart({
      items: updatedItems,
      totalQuantities: cart.totalQuantities - existingItem.quantity,
    });
    setTotalPrice(totalPrice - existingItem.price * existingItem.quantity);
    setAdjustedTotalPrice(
      adjustedTotalPrice -
        calcAdjustedTotalPrice(
          existingItem.price,
          existingItem,
          existingItem.quantity
        )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        adjustedTotalPrice,
        addToCart,
        removeCartItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}