"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "@/services/itemApi";
import ProductCard from "@/components/shop/ProductCard";
import ShopHeader from "@/components/shop/ShopHeader";
import { IItem } from "@/types/item"; // IItem অবশ্যই ইমপোর্ট করতে হবে

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ১. useQuery-তে জেনেরিক টাইপ ব্যবহার করা হয়েছে jate 'data' এর টাইপ টাইপস্ক্রিপ্ট বুঝতে পারে
  const { data, isLoading, isError } = useQuery({
    queryKey: ["items", searchTerm],
    queryFn: () => getAllItems({ searchTerm }),
  });

  // ২. products এর টাইপ নির্দিষ্ট করে দেওয়া হয়েছে
  const products: IItem[] = data?.data || [];

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        পণ্য লোড করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-10">
      {/* ৩. setSearchTerm পাস করা হয়েছে সার্চ ফিল্টারিং এর জন্য */}
      <ShopHeader setSearchTerm={setSearchTerm} />

      {/* লোডিং অবস্থা (Skeleton Loader) */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-card/50 animate-pulse rounded-xl border border-border" />
          ))}
        </div>
      )}

      {/* ডেটা না থাকলে */}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-20 text-foreground/50 font-bold">
          কোনো পণ্য পাওয়া যায়নি!
        </div>
      )}

      {/* প্রোডাক্ট গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((item: IItem) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </main>
  );
}