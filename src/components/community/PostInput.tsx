"use client";
import React from "react";
import { ImagePlus, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PostInput = () => {
  const { t } = useLanguage();

  return (
    <div className="ko-card p-6 mb-10 h-auto!">
      <h3 className="text-lg font-bold mb-4 text-primary flex items-center gap-2">
        <ImagePlus size={20} /> {t("নতুন পোস্ট করুন", "Create New Post")}
      </h3>
      <textarea
        className="w-full p-4 rounded-xl bg-secondary/5 dark:bg-white/5 border border-border outline-none focus:ring-2 focus:ring-primary/50 h-28 resize-none text-foreground placeholder:text-foreground/40 transition-all"
        placeholder={t("আপনার ফসলের খবর লিখুন...", "Share your crop news...")}
      />
      <div className="flex justify-end mt-4">
        <button className="btn-krishoky flex items-center gap-2">
          {t("পোস্ট করুন", "Post Now")} <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default PostInput;
