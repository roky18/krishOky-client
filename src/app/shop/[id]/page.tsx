"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleItem } from "@/services/itemApi";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShoppingCart,
  CheckCircle,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IItem } from "@/types/item";

export default function ProductDetailsPage() {
  const params = useParams();
  const { t } = useLanguage();

  // টাইপ সেফ আইডি এক্সট্রাকশন
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getSingleItem(id as string),
    enabled: !!id,
  });

  const product = data?.data;

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center animate-pulse text-primary font-bold">
        {t("লোড হচ্ছে...", "Loading...")}
      </div>
    );

  if (isError || !product)
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        {t("পণ্যটি খুঁজে পাওয়া যায়নি!", "Product not found!")}
      </div>
    );

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-12">
      {/* ব্যাক বাটন */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span>{t("বাজারে ফিরে যান", "Back to Shop")}</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* বাম পাশ: ইমেজ গ্যালারি */}
        <div className="relative h-[400px] md:h-[600px] rounded-[40px] overflow-hidden border border-border/50 shadow-2xl group">
          <Image
            src={product.image || "https://placehold.co/800"}
            alt={product.title.en || "Product Image"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute top-6 left-6">
            <span className="bg-white/90 backdrop-blur-md text-primary font-black px-6 py-2 rounded-full text-xs uppercase tracking-widest shadow-lg border border-white/20">
              {product.category}
            </span>
          </div>
        </div>

        {/* ডান পাশ: প্রোডাক্ট কন্টেন্ট */}
        <div className="flex flex-col justify-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
              {t(product.title.bn, product.title.en)}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-primary text-4xl font-black">
                ৳{product.price}
              </span>
              <div className="h-8 w-[2px] bg-border"></div>
              <span
                className={`px-4 py-1 rounded-full text-xs font-bold ${
                  product.stock > 0
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {product.stock > 0
                  ? t("স্টকে আছে", "In Stock")
                  : t("স্টক আউট", "Out of Stock")}
              </span>
            </div>

            <p className="text-foreground/70 text-lg leading-relaxed font-medium border-l-4 border-primary/20 pl-6 py-2">
              {t(product.description.bn, product.description.en)}
            </p>

            {/* শর্ট ফিচারস */}
            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="flex items-center gap-3 text-sm font-bold text-foreground/60">
                <Truck size={20} className="text-primary" />
                {t("দ্রুত ডেলিভারি", "Fast Delivery")}
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-foreground/60">
                <ShieldCheck size={20} className="text-primary" />
                {t("নিরাপদ পেমেন্ট", "Secure Payment")}
              </div>
            </div>

            {/* অ্যাকশন বাটন */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-[24px] shadow-xl shadow-primary/25 transition-all active:scale-95 flex items-center justify-center gap-3">
                <ShoppingCart size={22} />
                {t("কার্টে যোগ করুন", "Add to Cart")}
              </button>
              <button className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground font-black py-5 rounded-[24px] border border-border transition-all active:scale-95">
                {t("সরাসরি কিনুন", "Buy It Now")}
              </button>
            </div>

            {/* সেলার ইনফো (গ্লাস মরফিজম কার্ড) */}
            <div className="mt-12 p-6 rounded-[30px] bg-card/50 border border-border/50 backdrop-blur-sm flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black border border-primary/20 text-xl">
                {typeof product.sellerId !== "string"
                  ? product.sellerId?.name?.charAt(0)
                  : "S"}
              </div>
              <div>
                <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">
                  {t("বিক্রেতা", "Seller")}
                </p>
                <p className="font-bold text-foreground">
                  {typeof product.sellerId !== "string"
                    ? product.sellerId?.name
                    : t("অজানা বিক্রেতা", "Unknown Seller")}
                </p>
              </div>
              <CheckCircle size={20} className="ml-auto text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
