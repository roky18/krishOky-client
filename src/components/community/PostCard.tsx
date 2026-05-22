"use client";

import Image from "next/image";
import { Heart, MessageCircle, Share2, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { IPost } from "@/interfaces/communityInterface";

const CATEGORY_LABELS: Record<string, { bn: string; en: string }> = {
  Fruits: { bn: "ফলমূল", en: "Fruits" },
  Vegetables: { bn: "শাকসবজি", en: "Vegetables" },
  Crops: { bn: "ফসল", en: "Crops" },
  "Agricultural Machinery": {
    bn: "কৃষি যন্ত্রপাতি",
    en: "Agricultural Machinery",
  },
  Spices: { bn: "মসলা", en: "Spices" },
  "Seeds & Saplings": { bn: "বীজ ও চারা", en: "Seeds & Saplings" },
  Fertilizer: { bn: "সার", en: "Fertilizer" },
  Others: { bn: "অন্যান্য", en: "Others" },
};

const PostCard = ({ post }: { post: IPost }) => {
  const { language, t } = useLanguage();
  const category = CATEGORY_LABELS[post.type];
  const createdAt = post.createdAt ? new Date(post.createdAt) : null;
  const dateLabel =
    createdAt && !Number.isNaN(createdAt.getTime())
      ? createdAt.toLocaleDateString(language === "BN" ? "bn-BD" : "en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : t("আজ", "Today");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:shadow-black/20">
      {post.img && (
        <div className="relative h-56 w-full overflow-hidden bg-secondary/10">
          <Image
            src={post.img}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 z-10">
            <span className="rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-700 shadow-sm backdrop-blur-md dark:bg-slate-950/80 dark:text-emerald-300">
              {category ? t(category.bn, category.en) : post.type}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {!post.img && (
          <span className="mb-4 w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            {category ? t(category.bn, category.en) : post.type}
          </span>
        )}

        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-xl font-black leading-tight text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h3>
            <p className="mt-2 truncate text-xs font-bold text-primary/80">
              @{post.user || t("কৃষক", "Farmer")}
            </p>
          </div>
          <ShieldCheck size={20} className="shrink-0 text-emerald-500/80" />
        </div>

        <p className="mb-6 line-clamp-3 text-sm leading-6 text-foreground/70">
          {post.desc}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/45">
            {dateLabel}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-bold text-foreground/60 transition-colors hover:text-red-500"
              aria-label={t("লাইক", "Like")}
            >
              <Heart size={18} />
              {post.likes?.length || 0}
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-bold text-foreground/60 transition-colors hover:text-primary"
              aria-label={t("মন্তব্য", "Comments")}
            >
              <MessageCircle size={18} />
              {post.comments?.length || 0}
            </button>
            <button
              type="button"
              className="text-foreground/60 transition-colors hover:text-primary"
              aria-label={t("শেয়ার", "Share")}
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
