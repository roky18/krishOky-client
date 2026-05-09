"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // রাউটিং এর জন্য
import { ImagePlus, Send, MessageCircle, Heart } from "lucide-react";

export default function CommunityPage() {
  const router = useRouter();
  const isLoggedIn = false; // লগইন স্ট্যাটাস

  const posts = [
    {
      id: 1,
      user: "করিম চাচা",
      type: "ফসল",
      title: "তাজা লাল শাক",
      desc: "আমার জমিতে এবার দারুণ লাল শাক হয়েছে। কোনো বিষ প্রয়োগ করা হয়নি, সম্পূর্ণ অর্গানিক। আগ্রহী ক্রেতারা যোগাযোগ করতে পারেন সরাসরি খামারে...",
      img: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 2,
      user: "রহিম ভাই",
      type: "ফল",
      title: "মিষ্টি আম",
      desc: "রাজশাহীর একদম বিশুদ্ধ ফজলি আম। সরাসরি বাগান থেকে নিতে চাইলে যোগাযোগ করুন। ফরমালিন মুক্ত গ্যারান্টি...",
      img: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=500",
    }
  ];

  // বিস্তারিত দেখার ফাংশন
  const handleViewDetails = (id: number) => {
    if (!isLoggedIn) {
      alert("বিস্তারিত ডেসক্রিপশন দেখতে হলে দয়া করে আগে লগইন করুন।");
      router.push("/login");
    } else {
      router.push(`/community/${id}`);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* পোস্ট ইনপুট সেকশন (শুধুমাত্র লগইন থাকলে ফুললি কাজ করবে) */}
      <div className="ko-card p-4 h-auto! bg-white dark:bg-slate-900">
        <h3 className="text-lg font-bold mb-3 text-primary flex items-center gap-2">
           <ImagePlus size={20} /> আপনার আপডেট শেয়ার করুন
        </h3>
        <textarea 
          className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 outline-none h-20"
          placeholder={isLoggedIn ? "আপনার ফসল সম্পর্কে কিছু বলুন..." : "পোস্ট করতে হলে লগইন করুন..."}
          disabled={!isLoggedIn}
        />
        <div className="flex justify-end mt-2">
          <button 
            onClick={() => !isLoggedIn && router.push("/login")}
            className="btn-krishoky !py-2 !px-6 flex items-center gap-2 text-white"
          >
            পোস্ট করুন <Send size={16} />
          </button>
        </div>
      </div>

      {/* পোস্ট ফিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="ko-card flex flex-col h-[500px] bg-white dark:bg-slate-900">
            <div className="h-56 w-full relative">
              <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-primary">
                <span className="bg-emerald-100 px-2 py-1 rounded">{post.type}</span>
                <span className="text-gray-400">• {post.user}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 dark:text-white">{post.title}</h2>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                {post.desc}
              </p>

              <div className="mt-auto flex justify-between items-center border-t pt-4">
                <div className="flex gap-4 text-gray-400">
                  <Heart size={20} className="hover:text-red-500 cursor-pointer" />
                  <MessageCircle size={20} className="hover:text-primary cursor-pointer" />
                </div>
                <button 
                  onClick={() => handleViewDetails(post.id)}
                  className="text-primary font-bold text-sm hover:underline"
                >
                  বিস্তারিত দেখুন
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}