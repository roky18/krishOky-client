"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const CommunityBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full py-12 px-6 rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/10 mb-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
          {t("কৃষক কমিউনিটি", "Farmer Community")}
        </h1>
        <p className="text-foreground/70 text-lg leading-relaxed font-medium">
          {t(
            "আপনার ফসলের আপডেট শেয়ার করুন এবং অন্য কৃষকদের সাথে যোগাযোগ করুন।",
            "Share your crop updates and connect with other farmers."
          )}
        </p>
      </div>
    </div>
  );
};

export default CommunityBanner;