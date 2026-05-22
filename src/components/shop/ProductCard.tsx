"use client";
import React from "react";
import { ShoppingCart, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { IItem } from "@/types/item";

const ProductCard = ({ product }: { product: IItem }) => {
  const { t } = useLanguage();

  return (
    <div className="group relative shadow-md border border-border/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2">
      {/* ইমেজ সেকশন - প্রিমিয়াম ওভারলে সহ */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={product.image || "https://placehold.co/400"}
          alt={product.title?.en || "Product Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* ক্যাটাগরি ব্যাজ */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/80 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/20 uppercase tracking-widest">
            {product.category}
          </span>
        </div>

        {/* হোভার করলে যে বাটনটি আসবে (Quick View/See More) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/shop/${product._id}`}
            className="bg-white text-black p-3 rounded-full transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 shadow-xl"
          >
            <ArrowUpRight size={24} />
          </Link>
        </div>
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/shop/${product._id}`}>
            <h3 className="font-black text-foreground text-xl leading-tight hover:text-primary transition-colors cursor-pointer">
              {t(product.title.bn, product.title.en)}
            </h3>
          </Link>
          <div className="flex items-center text-yellow-500">
            <ShieldCheck size={16} className="text-primary/70" />
          </div>
        </div>

        {/* শর্ট ডেসক্রিপশন */}
        <p className="text-foreground/60 text-sm line-clamp-2 mb-6 min-h-[40px] leading-relaxed font-medium">
          {t(product.description.bn, product.description.en)}
        </p>

        {/* প্রাইস এবং অ্যাকশন বাটন */}
        <div className="flex justify-between items-center pt-4 border-t border-border/50">
          <div>
            <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest block mb-1">
              {t("মূল্য", "Price")}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-primary font-black text-2xl">
                ৳{product.price}
              </span>
              {/* আপনি চাইলে এখানে ডিসকাউন্ট প্রাইস দেখাতে পারেন */}
            </div>
          </div>

          <div className="flex gap-2">
            {/* See More Link */}
            <Link
              href={`/shop/${product._id}`}
              className="text-[12px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              {t("বিস্তারিত", "See Details")}
            </Link>

            <button className="bg-primary hover:bg-primary/90 text-white p-3 rounded-2xl transition-all active:scale-90 shadow-lg shadow-primary/25 group/btn">
              <ShoppingCart
                size={20}
                className="group-hover/btn:rotate-12 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
