"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Logo from "@/components/Logo";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      console.log("🔥 রেজিস্ট্রেশন ডাটা ব্যাকএন্ডে পাঠানো হচ্ছে...", data);

      // ১. এক্সপ্রেস ব্যাকএ্যান্ডে রেজিস্ট্রেশন রিকোয়েস্ট পাঠানো
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        },
      );

      const resultData = await res.json();

      // যদি ব্যাকএন্ড কোনো এরর দেয় (যেমন: Email already exists)
      if (!res.ok) {
        throw new Error(resultData.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।");
      }

      alert("অ্যাকাউন্ট তৈরি সফল হয়েছে! 🎉");

      // ২. 🧠 অটোমেটিক লগইন মেকানিজম (ইউজারকে আবার লগইন পেজে না পাঠিয়ে সরাসরি ড্যাশবোর্ডে নেওয়া)
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (loginResult?.error) {
        // যদি কোনো কারণে অটো-লগইন মিস হয়, লগইন পেজে পুশ করা
        router.push("/login");
        return;
      }

      // লগইন সফল হলে HOME রিডাইরেক্ট
      router.push("/");
      router.refresh();
    } catch (error) {
      // টাইপ সেফ এরর হ্যান্ডলিং
      const errorMessage =
        error instanceof Error ? error.message : "একটি ভুল হয়েছে।";
      console.error("❌ রেজিস্ট্রেশন এরর:", errorMessage);
      alert(errorMessage);
    }
  };
  return (
    // মেইন ব্যাকগ্রাউন্ড এখন ডার্ক মোডে অটোমেটিক চেঞ্জ হবে
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-background transition-colors duration-300">
      <div className="ko-card p-8 max-w-md w-full shadow-xl border border-border">
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-8">
          <Logo />
          <h2 className="text-2xl font-black text-foreground mt-4">
            {t("অ্যাকাউন্ট তৈরি করুন", "Create Account")}
          </h2>
          <p className="text-foreground/60 text-sm font-medium text-center">
            {t(
              "কৃষক্যের সাথে আপনার যাত্রা শুরু করুন",
              "Join KrishOky and start your journey",
            )}
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-black flex items-center gap-2 text-foreground/80 text-sm py-2 uppercase tracking-wider">
                <User size={16} className="text-primary" />{" "}
                {t("পুরো নাম", "Full Name")}
              </span>
            </label>
            <input
              type="text"
              placeholder={t("আপনার নাম", "Your Name")}
              className={`input px-3 py-2 input-bordered w-full border rounded-md bg-background text-foreground focus:outline-primary ${errors.name ? "border-red-500" : "border-border"}`}
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tight">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text  font-black flex items-center gap-2 text-foreground/80 text-sm py-2 uppercase tracking-wider">
                <Mail size={16} className="text-primary" />{" "}
                {t("ইমেইল ঠিকানা", "Email Address")}
              </span>
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className={`input px-3 py-2 input-bordered w-full border rounded-md bg-background text-foreground focus:outline-primary ${errors.email ? "border-red-500" : "border-border"}`}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tight">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text py-2 font-black flex items-center gap-2 text-foreground/80 text-sm uppercase tracking-wider">
                <Lock size={16} className="text-primary" />{" "}
                {t("পাসওয়ার্ড", "Password")}
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`input px-3 py-2 input-bordered w-full border rounded-md bg-background text-foreground focus:outline-primary pr-10 ${errors.password ? "border-red-500" : "border-border"}`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tight">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-krishoky w-full flex items-center justify-center gap-2 group mt-2 bg-primary text-white font-black py-3 rounded-lg shadow-lg hover:shadow-primary/30 transition-all"
          >
            {isSubmitting
              ? t("অ্যাকাউন্ট তৈরি হচ্ছে...", "Creating account...")
              : t("রেজিস্ট্রেশন করুন", "Register Now")}
            {!isSubmitting && (
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 pt-6 border-t border-border text-center text-sm">
          <p className="text-foreground/50 font-bold">
            {t("ইতিমধ্যে অ্যাকাউন্ট আছে?", "Already have an account?")}{" "}
            <Link
              href="/login"
              className="text-primary font-black hover:underline uppercase tracking-tighter"
            >
              {t("লগইন করুন", "Login here")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
