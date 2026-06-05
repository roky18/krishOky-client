"use client";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import {
  ShieldCheck,
  Sprout,
  Users,
  ShoppingBag,
  Package,
  Crown,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  AdminUser,
  AdminUserRole,
  DashboardSummary,
  getAdminUsers,
  getDashboardSummary,
  updateUserRole,
} from "@/services/adminApi";
import { useLanguage } from "@/context/LanguageContext";

type SessionWithRole = {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
  accessToken?: string;
};

type ApiListResponse<T> = {
  data?: T[] | { users?: T[]; summary?: DashboardSummary };
  users?: T[];
};

type ApiSummaryResponse = {
  data?: DashboardSummary;
} & DashboardSummary;

const getUserId = (user: AdminUser) => user._id || user.id || user.email;

const readUsers = (response?: ApiListResponse<AdminUser>) => {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.users)) return response.data.users;
  if (Array.isArray(response?.users)) return response.users;
  return [];
};

const readSummary = (response?: ApiSummaryResponse) => response?.data || response || {};

export default function DashboardPage() {
  const { t } = useLanguage();
  const { data: rawSession, status } = useSession();
  const queryClient = useQueryClient();
  const session = rawSession as SessionWithRole | null;
  const role = session?.user?.role || "user";
  const isAdmin = role === "admin";
  const accessToken = session?.accessToken;

  const summaryQuery = useQuery({
    queryKey: ["dashboard-summary", isAdmin],
    queryFn: () => getDashboardSummary(accessToken),
    enabled: status === "authenticated" && isAdmin,
  });

  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => getAdminUsers(accessToken),
    enabled: status === "authenticated" && isAdmin,
  });

  const roleMutation = useMutation({
    mutationFn: ({ userId, role: nextRole }: { userId: string; role: AdminUserRole }) =>
      updateUserRole(userId, nextRole, accessToken),
    onSuccess: () => {
      toast.success(t("ইউজারের রোল আপডেট হয়েছে।", "User role updated successfully."));
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
    },
    onError: () => toast.error(t("এই ইউজারের রোল আপডেট করা যায়নি।", "Could not update this user role.")),
  });

  if (status === "loading") {
    return (
      <main className="min-h-screen px-4 py-24 bg-zinc-50 text-zinc-950 dark:bg-slate-950 dark:text-zinc-50">
        <div className="mx-auto flex max-w-7xl items-center gap-3 text-sm font-bold text-emerald-600">
          <Loader2 className="size-5 animate-spin" />
          {t("ড্যাশবোর্ড লোড হচ্ছে...", "Loading dashboard...")}
        </div>
      </main>
    );
  }

  if (status !== "authenticated") {
    return (
      <main className="min-h-screen px-4 py-24 bg-zinc-50 text-zinc-950 dark:bg-slate-950 dark:text-zinc-50">
        <section className="mx-auto max-w-3xl rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
          <Sprout className="mb-4 size-10 text-emerald-500" />
          <h1 className="text-3xl font-black">{t("লগইন প্রয়োজন", "Login required")}</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            {t(
              "আপনার KrishOky ড্যাশবোর্ড দেখতে আগে লগইন করুন।",
              "Please login to view your KrishOky dashboard.",
            )}
          </p>
          <button
            onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
            className="mt-6 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-600"
          >
            {t("লগইন", "Login")}
          </button>
        </section>
      </main>
    );
  }

  const users = readUsers(usersQuery.data as ApiListResponse<AdminUser>);
  const summary = readSummary(summaryQuery.data as ApiSummaryResponse);
  const adminCount =
    summary.totalAdmins ?? users.filter((user) => user.role === "admin").length;

  const cards = [
    { label: t("পণ্য", "Products"), value: summary.totalProducts ?? t("লাইভ", "Live"), icon: Package },
    { label: t("অর্ডার", "Orders"), value: summary.totalOrders ?? t("সক্রিয়", "Active"), icon: ShoppingBag },
    { label: t("ইউজার", "Users"), value: summary.totalUsers ?? (users.length || t("সুরক্ষিত", "Secure")), icon: Users },
    { label: t("অ্যাডমিন", "Admins"), value: adminCount || (isAdmin ? 1 : 0), icon: ShieldCheck },
  ];

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-24 text-zinc-950 dark:bg-slate-950 dark:text-zinc-50">
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-emerald-600">
              {isAdmin
                ? t("অ্যাডমিন কন্ট্রোল সেন্টার", "Admin Control Center")
                : t("ইউজার ড্যাশবোর্ড", "User Dashboard")}
            </p>
            <h1 className="mt-2 text-3xl font-black md:text-5xl">
              {t("স্বাগতম", "Welcome")}, {session?.user?.name || "KrishOky User"}
            </h1>
            <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
              {isAdmin
                ? t(
                    "একটি সুরক্ষিত ড্যাশবোর্ড থেকে প্ল্যাটফর্ম ইউজার, রোল, পণ্য এবং অর্ডার অপারেশন পরিচালনা করুন।",
                    "Manage platform users, roles, products, and order operations from one protected dashboard.",
                  )
                : t(
                    "আপনার কৃষি কেনাকাটা, অ্যাকাউন্ট অ্যাক্টিভিটি এবং KrishOky সার্ভিস এই ড্যাশবোর্ড থেকে দেখুন।",
                    "Track your farming purchases, account activity, and KrishOky services from your dashboard.",
                  )}
            </p>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-black text-emerald-700 dark:text-emerald-300">
            {t("রোল", "Role")}: {role === "admin" ? t("অ্যাডমিন", "ADMIN") : t("ইউজার", "USER")}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.label}
                className="h-32 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                    {card.label}
                  </span>
                  <Icon className="size-5 text-amber-400" />
                </div>
                <p className="mt-4 text-3xl font-black">{card.value}</p>
              </article>
            );
          })}
        </div>

        {!isAdmin && (
          <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h2 className="text-xl font-black">{t("আমার ড্যাশবোর্ড", "My Dashboard")}</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300">
              {t(
                "আপনার অ্যাকাউন্ট ড্যাশবোর্ড তথ্য দেখতে পারবে। অ্যাডমিন কন্ট্রোল শুধু অ্যাডমিন ইউজারের জন্য সুরক্ষিত।",
                "Your account can view dashboard information. Admin controls are hidden and protected for admin users only.",
              )}
            </p>
          </section>
        )}

        {isAdmin && (
          <section className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-col gap-2 border-b border-zinc-200 p-6 dark:border-white/10 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-black">{t("ইউজার রোল ম্যানেজমেন্ট", "User Role Management")}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {t(
                    "বিশ্বস্ত ইউজারকে অ্যাডমিন করুন অথবা অ্যাডমিনকে ইউজার রোলে ফিরিয়ে দিন।",
                    "Promote trusted users to admin or return admins to user role.",
                  )}
                </p>
              </div>
              {usersQuery.isLoading && (
                <span className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                  <Loader2 className="size-4 animate-spin" />
                  {t("ইউজার লোড হচ্ছে", "Loading users")}
                </span>
              )}
            </div>

            {usersQuery.isError ? (
              <div className="p-6 text-sm font-bold text-red-500">
                {t(
                  "ইউজার লিস্ট পাওয়া যাচ্ছে না। রোল কন্ট্রোল চালু করতে admin users API যুক্ত করুন।",
                  "User list is unavailable. Connect the admin users API to enable role controls.",
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-zinc-100 text-xs uppercase text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
                    <tr>
                      <th className="px-6 py-4">{t("ইউজার", "User")}</th>
                      <th className="px-6 py-4">{t("ইমেইল", "Email")}</th>
                      <th className="px-6 py-4">{t("রোল", "Role")}</th>
                      <th className="px-6 py-4 text-right">{t("অ্যাকশন", "Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      const userId = getUserId(user);
                      const userRole = user.role === "admin" ? "admin" : "user";
                      const nextRole: AdminUserRole = userRole === "admin" ? "user" : "admin";
                      const isCurrentUser = user.email === session?.user?.email;

                      return (
                        <tr key={userId} className="border-t border-zinc-200 dark:border-white/10">
                          <td className="px-6 py-4 font-bold">{user.name || "KrishOky User"}</td>
                          <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">{user.email}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-700 dark:text-emerald-300">
                              {userRole === "admin" && <Crown className="size-3" />}
                              {userRole === "admin" ? t("অ্যাডমিন", "ADMIN") : t("ইউজার", "USER")}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              disabled={roleMutation.isPending || isCurrentUser}
                              onClick={() => roleMutation.mutate({ userId, role: nextRole })}
                              className="rounded-lg border border-emerald-500 px-4 py-2 text-xs font-black text-emerald-700 transition hover:bg-emerald-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:text-emerald-300"
                            >
                              {userRole === "admin" ? t("ইউজার করুন", "Make User") : t("অ্যাডমিন করুন", "Make Admin")}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {!usersQuery.isLoading && users.length === 0 && (
                  <div className="p-6 text-center text-sm font-bold text-zinc-500">
                    {t("Admin API থেকে কোনো ইউজার পাওয়া যায়নি।", "No users found from admin API.")}
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
