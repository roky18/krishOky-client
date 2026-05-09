"use client";
import React from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PostProps {
  post: {
    id: number;
    user: string;
    type: string;
    title: string;
    desc: string;
    img: string;
  };
}

const PostCard = ({ post }: PostProps) => {
  const { t } = useLanguage();

  return (
    <div className="ko-card flex flex-col h-[520px] group transition-all hover:shadow-xl hover:border-primary/30">
      <div className="h-60 w-full overflow-hidden relative">
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
          {post.type}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm border border-primary/20">
            {post.user[0]}
          </div>
          <div>
            <p className="text-sm font-black text-foreground">{post.user}</p>
            <p className="text-[10px] font-bold text-foreground/40">
              2 hours ago
            </p>
          </div>
        </div>

        <h2 className="text-xl font-black mb-3 text-foreground line-clamp-1">
          {post.title}
        </h2>
        <p className="text-foreground/60 text-sm font-medium line-clamp-3 mb-6">
          {post.desc}
        </p>

        <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
          <div className="flex gap-5 text-foreground/50">
            <button className="hover:text-red-500 transition-colors flex items-center gap-1">
              <Heart size={20} /> <span className="text-xs font-bold">12</span>
            </button>
            <button className="hover:text-primary transition-colors flex items-center gap-1">
              <MessageCircle size={20} />{" "}
              <span className="text-xs font-bold">5</span>
            </button>
          </div>
          <button className="text-primary font-black text-xs hover:underline uppercase tracking-tighter">
            {t("বিস্তারিত", "Details")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
