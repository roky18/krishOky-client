"use client";
import React from "react";
import Link from "next/link";
import { Home, Search, Ghost } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      {/* এনিমেটেড আইকন */}
      <div className="relative mb-8">
        <Ghost size={120} className="text-primary/20 animate-bounce" />
        <div className="absolute inset-0 flex items-center justify-center">
           <Search size={40} className="text-primary animate-pulse" />
        </div>
      </div>

      <h1 className="text-8xl md:text-[12rem] font-black text-foreground/5 leading-none absolute -z-10 select-none">
        404
      </h1>

      <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
        {t("রাস্তা হারিয়ে ফেলেছেন?", "Are you lost, farmer?")}
      </h2>
      
      <p className="text-foreground/60 max-w-md mx-auto mb-10 text-lg font-medium">
        {t(
          "দুঃখিত, আপনি যে পাতাটি খুঁজছেন সেটি এই ফসলের মাঠে খুঁজে পাওয়া যায়নি।",
          "Sorry, the page you are looking for was not found in this harvest field."
        )}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="bg-primary text-white font-black px-10 py-5 rounded-[24px] shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
        >
          <Home size={20} />
          {t("হোমে ফিরে যান", "Go to Home")}
        </Link>
        <Link 
          href="/shop" 
          className="bg-secondary text-foreground font-black px-10 py-5 rounded-[24px] border border-border hover:bg-secondary/80 transition-all"
        >
          {t("বাজার দেখুন", "Explore Shop")}
        </Link>
      </div>
    </div>
  );
}