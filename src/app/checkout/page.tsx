"use client";
import React, { createContext, useContext, useState } from "react";
import { IItem } from "@/types/item"; // আপনার আইটেম টাইপ ইমপোর্ট করুন

// ১. কার্টের আইটেমের জন্য টাইপ (প্রোডাক্টের সাথে কোয়ান্টিটি যোগ করা হলো)
interface ICartItem extends IItem {
  quantity: number;
}

// ২. কন্টেক্সট ভ্যালুর জন্য ইন্টারফেস
interface ICartContextType {
  cartItems: ICartItem[];
  addToCart: (product: IItem) => void;
  removeFromCart: (productId: string) => void;
}

// ৩. createContext এ 'any' এর বদলে সঠিক টাইপ ব্যবহার করলাম
const CartContext = createContext<ICartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const addToCart = (product: IItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item._id === product._id);
      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};