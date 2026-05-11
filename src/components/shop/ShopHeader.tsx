"use client";
import React from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// ১. প্রপস এর জন্য ইন্টারফেস ডিফাইন করা (any এরর এড়াতে)
interface ShopHeaderProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ShopHeader = ({ setSearchTerm }: ShopHeaderProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <h1 className="text-3xl font-black text-foreground">
        {t("তাজা পণ্যের বাজার", "Fresh Market")}
      </h1>

      <div className="relative w-full md:w-72">
        <input
          type="text"
          // ২. ইনপুট চেঞ্জ হলে সার্চ টার্ম আপডেট হবে
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("পণ্য খুঁজুন...", "Search products...")}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-card text-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        <Search
          className="absolute left-3 top-2.5 text-foreground/40"
          size={18}
        />
      </div>
    </div>
  );
};

export default ShopHeader;
