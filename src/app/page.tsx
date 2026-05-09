"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-primary mb-4">
        {t("কৃষকভাইদের ডিজিটাল প্ল্যাটফর্ম", "Digital Platform for Farmers")}
      </h1>

      <div className="ko-card p-6 h-auto!">
        <p className="text-foreground/80 leading-relaxed">
          {t(
            "এখানে আপনি সব ধরণের তাজা ফসল, ফল এবং সবজির আপডেট পাবেন। সরাসরি কৃষকদের কাছ থেকে সেরা পণ্য সংগ্রহ করুন।",
            "Get all types of fresh crops, fruits, and vegetable updates here. Collect the best products directly from farmers.",
          )}
        </p>
      </div>
    </div>
  );
}
