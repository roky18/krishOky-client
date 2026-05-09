"use client";
import CommunityBanner from "@/components/community/CommunityBanner";
import PostCard from "@/components/community/PostCard";
import PostInput from "@/components/community/PostInput";
import React from "react";

const posts = [
  {
    id: 1,
    user: "করিম চাচা",
    type: "শাকসবজি",
    title: "তাজা লাল শাক",
    desc: "আমার জমিতে এবার দারুণ লাল শাক হয়েছে। কোনো বিষ প্রয়োগ করা হয়নি, সম্পূর্ণ অর্গানিক।",
    img: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 2,
    user: "রহিম ভাই",
    type: "ফলমূল",
    title: "মিষ্টি আম",
    desc: "রাজশাহীর একদম বিশুদ্ধ ফজলি আম। সরাসরি বাগান থেকে নিতে চাইলে যোগাযোগ করুন।",
    img: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=500",
  },
];

export default function CommunityPage() {
  return (
    <main className="max-w-6xl mx-auto p-6 md:p-10">
      <CommunityBanner />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <PostInput />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar (Optional) */}
        <div className="hidden lg:block">
          <div className="ko-card p-6 sticky top-28 h-auto!">
            <h4 className="font-black text-foreground mb-4 border-b border-border pb-2">
              Trending Topics
            </h4>
            <div className="space-y-3">
              <p className="text-sm font-bold text-primary cursor-pointer hover:underline">
                #OrganicFarming
              </p>
              <p className="text-sm font-bold text-primary cursor-pointer hover:underline">
                #RajshahiMango
              </p>
              <p className="text-sm font-bold text-primary cursor-pointer hover:underline">
                #WinterCrops
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
