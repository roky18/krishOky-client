"use client";
import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { IItem } from "@/types/item";

const ProductCard = ({ product }: { product: IItem }) => {
  const { t } = useLanguage();

  return (
    <div className="ko-card group overflow-hidden transition-all hover:shadow-xl">
      <div className="h-52 w-full relative overflow-hidden">
        <Image 
          src={product.image || "https://placehold.co/400"} 
          alt="Product Image"
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-md uppercase">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        {/* t() ফাংশন দিয়ে ভাষা অনুযায়ী নাম */}
        <h3 className="font-black text-foreground text-lg mb-1 truncate">
          {t(product.title.bn, product.title.en)}
        </h3>
        
        <p className="text-foreground/60 text-xs line-clamp-2 mb-4 h-8">
          {t(product.description.bn, product.description.en)}
        </p>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-tighter">দাম</p>
            <p className="text-primary font-black text-xl leading-none">৳{product.price}</p>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white p-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-primary/20">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;