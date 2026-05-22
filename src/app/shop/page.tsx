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

  // ফিল্টার এবং সার্চ স্টেটসমূহ
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  // TanStack Query ডাটা ফেচিং
  const { data, isLoading, isError } = useQuery({
    queryKey: ["items", searchTerm, category, sort, page],
    queryFn: () => getAllItems({ searchTerm, category, sort, page, limit: 8 }),
  });

  // টাইপ-সেফ ডাটা কাস্টিং
  const responseData = data as unknown as {
    items?: IItem[];
    meta?: { page: number; limit: number; total: number; totalPage: number };
    data?: {
      items?: IItem[];
      meta?: { page: number; limit: number; total: number; totalPage: number };
    };
  };

  const products: IItem[] =
    responseData?.items || responseData?.data?.items || [];
  const meta = responseData?.meta ||
    responseData?.data?.meta || { totalPage: 1 };

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500 font-bold bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-md mx-auto my-10 p-4">
        {t(
          "পণ্য লোড করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।",
          "Failed to load products. Please try again.",
        )}
      </div>
    );
  }

  return (
    /* 🛠️ FIX: dark:via-zinc-900 যুক্ত করা হয়েছে যাতে গ্রেডিয়েন্ট ডার্ক মোডে সাদা না হয়ে কুচকুচে ডার্ক থিম ধরে রাখে */
    <main className="min-h-screen pt-28 pb-16 px-4 max-w-7xl mx-auto transition-colors duration-300">
      {/* ফিল্টার হেডার */}
      <ShopHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        setPage={setPage}
      />

      {/* কন্টেন্ট গ্রিড এবং প্রিমিয়াম লোডিং স্কেলিটন */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-96 w-full animate-pulse bg-zinc-200/50 dark:bg-white/5 border border-zinc-300/40 dark:border-white/5 rounded-2xl shadow-sm backdrop-blur-xl"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-32 text-zinc-400 dark:text-zinc-500 text-lg font-medium bg-white/50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm backdrop-blur-md">
          {t("কোনো পণ্য পাওয়া যায়নি!", "No products found!")}
        </div>
      ) : (
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
            className="px-5 py-2.5 text-sm font-medium rounded-xl  bg-zinc-800  text-zinc-100 disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all shadow-md backdrop-blur-sm"
          >
            {t("পূর্ববর্তী", "Previous")}
          </button>

          <span className="text-sm font-semibold   px-4 py-2 rounded-lg  pt-3 bg-primary dark:bg-zinc-700 text-white dark:text-gray-100 backdrop-blur-sm shadow-md">
            {page} / {meta.totalPage}
          </span>

          <button
            disabled={page === meta.totalPage}
            onClick={() => {
              setPage((prev) => prev + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-5 py-2.5 text-sm font-medium rounded-xl  bg-zinc-800  text-zinc-100 disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all shadow-md backdrop-blur-sm"
          >
            {t("পরবর্তী", "Next")}
          </button>
        </div>
      )}
    </main>
  );
}
