"use client";
import React from "react";
import { RefreshCcw, AlertTriangle, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-8">
        <ShieldAlert size={48} className="text-red-500" />
      </div>

      <h2 className="text-3xl font-black text-foreground mb-4">
        {t("কিছু একটা সমস্যা হয়েছে!", "Something went wrong!")}
      </h2>
      
      <div className="bg-card border border-border/50 p-6 rounded-[30px] max-w-lg mb-10">
        <p className="text-red-500 font-mono text-sm break-all">
          {error.message || "Unknown Application Error"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="bg-primary text-white font-black px-10 py-5 rounded-[24px] shadow-xl shadow-primary/25 hover:rotate-1 transition-all flex items-center justify-center gap-3"
        >
          <RefreshCcw size={20} />
          {t("আবার চেষ্টা করুন", "Try Again")}
        </button>
        
        <button
          onClick={() => window.location.href = "/"}
          className="text-foreground/60 font-bold hover:text-primary transition-colors"
        >
          {t("ফিরে যান", "Never mind, take me back")}
        </button>
      </div>
    </div>
  );
}