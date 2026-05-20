// "use client";
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getAllItems } from "@/services/itemApi";
// import ProductCard from "@/components/shop/ProductCard";
// import ShopHeader from "@/components/shop/ShopHeader";
// import { IItem } from "@/types/item"; // IItem অবশ্যই ইমপোর্ট করতে হবে

// export default function ShopPage() {
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   // ১. useQuery-তে জেনেরিক টাইপ ব্যবহার করা হয়েছে jate 'data' এর টাইপ টাইপস্ক্রিপ্ট বুঝতে পারে
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["items", searchTerm],
//     queryFn: () => getAllItems({ searchTerm }),
//   });

//   // ২. products এর টাইপ নির্দিষ্ট করে দেওয়া হয়েছে
//   const products: IItem[] = data?.data || [];

//   if (isError) {
//     return (
//       <div className="text-center py-20 text-red-500 font-bold">
//         পণ্য লোড করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।
//       </div>
//     );
//   }

//   return (
//     <main className="max-w-7xl mx-auto p-6 md:p-10">
//       {/* ৩. setSearchTerm পাস করা হয়েছে সার্চ ফিল্টারিং এর জন্য */}
//       <ShopHeader setSearchTerm={setSearchTerm} />

//       {/* লোডিং অবস্থা (Skeleton Loader) */}
//       {isLoading && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="h-80 bg-card/50 animate-pulse rounded-xl border border-border" />
//           ))}
//         </div>
//       )}

//       {/* ডেটা না থাকলে */}
//       {!isLoading && products.length === 0 && (
//         <div className="text-center py-20 text-foreground/50 font-bold">
//           কোনো পণ্য পাওয়া যায়নি!
//         </div>
//       )}

//       {/* প্রোডাক্ট গ্রিড */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {products.map((item: IItem) => (
//           <ProductCard key={item._id} product={item} />
//         ))}
//       </div>
//     </main>
//   );
// }

"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "@/services/itemApi";
import ProductCard from "@/components/shop/ProductCard";
import ShopHeader from "@/components/shop/ShopHeader";
import { IItem } from "@/types/item";
import { useLanguage } from "@/context/LanguageContext";

export default function ShopPage() {
  const { t } = useLanguage();

  // 🛠️ ফিক্স ১: স্টেটগুলোর ডিফল্ট ভ্যালু একদম ক্লিন করা হলো (কোনো স্পেস থাকবে না)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  // TanStack Query: ফিল্টার চেঞ্জ হলে রিয়েল-টাইমে ডাটা কল হবে
  const { data, isLoading, isError } = useQuery({
    queryKey: ["items", searchTerm, category, sort, page],
    queryFn: () => getAllItems({ searchTerm, category, sort, page, limit: 8 }),
  });

  // 🛠️ ফিক্স ২: any ছাড়া ১০০% টাইপ-সেফ ডাবল কাস্টিং স্ট্রাকচার
  const responseData = data as unknown as {
    success?: boolean;
    message?: string;
    items?: IItem[];
    meta?: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data?: {
      items?: IItem[];
      meta?: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
      };
    };
  };

  // 🛠️ ফিক্স ৩: ডাটা এক্সট্র্যাকশন লেয়ার রিম্যাপ (আপনার এপিআই রেসপন্সের সব কন্ডিশন হ্যান্ডেলড)
  const products: IItem[] =
    responseData?.items ||
    responseData?.data?.items ||
    (data as unknown as { data?: IItem[] })?.data ||
    [];

  const meta = responseData?.meta ||
    responseData?.data?.meta || { totalPage: 1 };

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500 font-bold bg-white/5 border border-white/10 rounded-xl max-w-md mx-auto my-10 p-4 backdrop-blur-md">
        {t(
          "পণ্য লোড করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।",
          "Failed to load products. Please try again.",
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50/10 via-zinc-50 to-emerald-50/5 dark:from-zinc-950 dark:via-zinc-900 dark:to-stone-950 pt-28 pb-16 px-4 max-w-7xl mx-auto">
      {/* ফিল্টার হেডার কম্পোনেন্ট */}
      <ShopHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        setPage={setPage}
      />

      {/* লোডিং অবস্থা (Premium Glassmorphism Skeleton) */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-96 w-full animate-pulse bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl backdrop-blur-xl shadow-lg"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        /* ডাটা ফাঁকা থাকলে ক্লিন মেসেজ */
        <div className="text-center py-32 text-gray-500 dark:text-gray-400 text-lg font-medium bg-white/5 dark:bg-black/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-inner">
          {t("কোনো পণ্য পাওয়া যায়নি!", "No products found!")}
        </div>
      ) : (
        /* রিয়েল প্রোডাক্ট গ্রিড */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item: IItem) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      )}

      {/* ডাইনামিক পেজিনেশন কন্ট্রোল */}
      {meta.totalPage > 1 && (
        <div className="flex justify-center items-center mt-14 gap-4">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage((prev) => prev - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-5 py-2.5 text-sm font-medium rounded-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/5 disabled:opacity-30 hover:bg-green-500/20 text-gray-800 dark:text-white transition-all shadow-md backdrop-blur-sm"
          >
            {t("পূর্ববর্তী", "Previous")}
          </button>

          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
            {page} / {meta.totalPage}
          </span>

          <button
            disabled={page === meta.totalPage}
            onClick={() => {
              setPage((prev) => prev + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-5 py-2.5 text-sm font-medium rounded-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/5 disabled:opacity-30 hover:bg-green-500/20 text-gray-800 dark:text-white transition-all shadow-md backdrop-blur-sm"
          >
            {t("পরবর্তী", "Next")}
          </button>
        </div>
      )}
    </main>
  );
}
