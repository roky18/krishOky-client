"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Loader2 } from "lucide-react";
import { getAllPosts } from "@/services/communityApi";
import { IPost } from "@/interfaces/communityInterface";
import CommunityBanner from "@/components/community/CommunityBanner";
import PostCard from "@/components/community/PostCard";
import PostInput from "@/components/community/PostInput";
import { useLanguage } from "@/context/LanguageContext";

type PostsResponse =
  | IPost[]
  | {
      data?: IPost[] | { posts?: IPost[] };
      posts?: IPost[];
    };

const normalizePosts = (response?: PostsResponse): IPost[] => {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.posts)) return response.posts;
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.data?.posts)) return response.data.posts;
  return [];
};

export default function CommunityPage() {
  const { t } = useLanguage();

  const { data, isLoading, error } = useQuery<PostsResponse>({
    queryKey: ["community-posts"],
    queryFn: getAllPosts,
  });

  const posts = normalizePosts(data);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center px-4 text-center text-red-500">
        <AlertCircle className="mb-2 h-12 w-12" />
        <p className="font-bold">
          {t(
            "ডাটা লোড করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।",
            "Failed to load community posts. Please try again.",
          )}
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-6 transition-all duration-300 md:p-10">
      <CommunityBanner />

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PostInput />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <div className="col-span-full rounded-xl border border-border bg-card px-6 py-10 text-center text-foreground/60">
                {t(
                  "কোনো পোস্ট পাওয়া যায়নি। প্রথম পোস্টটি আপনিই করুন!",
                  "No posts found. Be the first to share an update!",
                )}
              </div>
            )}
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-xl border border-border bg-card p-6 shadow-sm">
            <h4 className="mb-4 border-b border-border pb-2 text-lg font-black text-foreground">
              {t("জনপ্রিয় বিষয়", "Trending Topics")}
            </h4>
            <div className="space-y-3">
              <p className="cursor-pointer text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
                #OrganicFarming
              </p>
              <p className="cursor-pointer text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
                #AgriculturalAdvice
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
