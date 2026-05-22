"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/services/communityApi";
import { IPost } from "@/interfaces/communityInterface";
import CommunityBanner from "@/components/community/CommunityBanner";
import PostCard from "@/components/community/PostCard";
import PostInput from "@/components/community/PostInput";
import { Loader2, AlertCircle } from "lucide-react";

export default function CommunityPage() {
  // TanStack Query দিয়ে ডাটা ফেচ করা
  const { data, isLoading, error } = useQuery<{ data: IPost[] }>({
    queryKey: ["community-posts"],
    queryFn: getAllPosts,
  });

  // ১. লোডিং স্টেট
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-emerald-500" />
      </div>
    );

  // ২. এরর স্টেট
  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <AlertCircle className="w-12 h-12 mb-2" />
        <p>ডাটা লোড করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।</p>
      </div>
    );

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-10 transition-all duration-300">
      <CommunityBanner />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
        {/* মেইন কন্টেন্ট */}
        <div className="lg:col-span-2">
          <PostInput />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data?.data && data.data.length > 0 ? (
              data.data.map((post: IPost) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-slate-500 dark:text-slate-400">
                কোনো পোস্ট পাওয়া যায়নি। প্রথম পোস্টটি আপনিই করুন! 🌾
              </div>
            )}
          </div>
        </div>

        {/* সাইডবার */}
        <aside className="hidden lg:block">
          <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-slate-800 sticky top-28 shadow-sm">
            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              Trending Topics
            </h4>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-emerald-600 cursor-pointer hover:underline">
                #OrganicFarming
              </p>
              <p className="text-sm font-semibold text-emerald-600 cursor-pointer hover:underline">
                #AgriculturalAdvice
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
