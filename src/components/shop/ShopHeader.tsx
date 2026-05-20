// "use client";
// import React from "react";
// import { Search } from "lucide-react";
// import { useLanguage } from "@/context/LanguageContext";

// // ১. প্রপস এর জন্য ইন্টারফেস ডিফাইন করা (any এরর এড়াতে)
// interface ShopHeaderProps {
//   setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
// }

// const ShopHeader = ({ setSearchTerm }: ShopHeaderProps) => {
//   const { t } = useLanguage();

//   return (
//     <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//       <h1 className="text-3xl font-black text-foreground">
//         {t("তাজা পণ্যের বাজার", "Fresh Market")}
//       </h1>

//       <div className="relative w-full md:w-72">
//         <input
//           type="text"
//           // ২. ইনপুট চেঞ্জ হলে সার্চ টার্ম আপডেট হবে
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder={t("পণ্য খুঁজুন...", "Search products...")}
//           className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-card text-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
//         />
//         <Search
//           className="absolute left-3 top-2.5 text-foreground/40"
//           size={18}
//         />
//       </div>
//     </div>
//   );
// };

// export default ShopHeader;

"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Search } from "lucide-react";

// মেইন পেজ থেকে আসা স্টেটগুলোর টাইপ ডিফাইন
interface ShopHeaderProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ShopHeader: React.FC<ShopHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  sort,
  setSort,
  setPage,
}) => {
  const { t } = useLanguage();

  // KrishOky প্রজেক্টের কৃষিপণ্যের ক্যাটাগরি লিস্ট
  const categories = ["Seeds", "Fertilizer", "Tools", "Branding", "Others"];

  return (
    <div className="w-full p-6 mb-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl transition-all">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* ১. রিয়েল-টাইম সার্চ ইনপুট */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder={t("পণ্য খুঁজুন...", "Search products...")}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 dark:bg-zinc-900/30 border border-white/10 focus:border-green-500/50 outline-none text-sm transition-all text-gray-800 dark:text-white"
          />
        </div>

        {/* ড্রপডাউন কন্ট্রোল সেকশন */}
        <div className="flex flex-wrap w-full md:w-auto gap-3 items-center justify-end">
          {/* ২. ক্যাটাগরি ড্রপডাউন */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 rounded-xl bg-white/5 dark:bg-zinc-900/50 border border-white/10 focus:border-green-500/50 outline-none text-sm text-gray-800 dark:text-white cursor-pointer transition-all"
          >
            <option value="" className="bg-white dark:bg-zinc-900">
              {t("সব ক্যাটাগরি", "All Categories")}
            </option>
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
                className="bg-white dark:bg-zinc-900"
              >
                {cat}
              </option>
            ))}
          </select>

          {/* ৩. সর্টিং ড্রপডাউন (দাম অনুযায়ী) */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 rounded-xl bg-white/5 dark:bg-zinc-900/50 border border-white/10 focus:border-green-500/50 outline-none text-sm text-gray-800 dark:text-white cursor-pointer transition-all"
          >
            <option value="" className="bg-white dark:bg-zinc-900">
              {t("সাজান (ডিফল্ট)", "Sort By (Default)")}
            </option>
            <option value="priceLowHigh" className="bg-white dark:bg-zinc-900">
              {t("দাম: কম থেকে বেশি", "Price: Low to High")}
            </option>
            <option value="priceHighLow" className="bg-white dark:bg-zinc-900">
              {t("দাম: বেশি থেকে কম", "Price: High to Low")}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
