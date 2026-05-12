"use client";
import React from "react";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const GlobalLoading = () => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      {/* মেইন এনিমেশন কন্টেইনার */}
      <div className="relative flex items-center justify-center">
        {/* বাইরের ঘূর্ণায়মান রিং */}
        <div className="absolute w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

        {/* মাঝখানের পালসিং পাতা (Leaf) */}
        <div className="bg-primary/10 p-4 rounded-2xl animate-pulse">
          <Leaf className="text-primary w-10 h-10 transition-transform hover:rotate-12" />
        </div>
      </div>

      {/* ব্র্যান্ডিং এবং টেক্সট */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-black tracking-tighter text-foreground mb-2">
          Krish<span className="text-primary">Oky</span>
        </h2>

        <div className="flex flex-col items-center gap-1">
          <p className="text-foreground/60 text-sm font-bold animate-pulse">
            {t("বীজ বপন করা হচ্ছে...", "Sowing the seeds...")}
          </p>

          {/* ছোট লোডিং বার */}
          <div className="w-32 h-1 bg-primary/10 rounded-full mt-2 overflow-hidden">
            <div className="w-full h-full bg-primary origin-left animate-loading-bar"></div>
          </div>
        </div>
      </div>

      {/* ব্যাকগ্রাউন্ডে হালকা গ্লো ইফেক্ট */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] -z-10 rounded-full"></div>
    </div>
  );
};

export default GlobalLoading;
