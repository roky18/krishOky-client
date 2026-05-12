"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Logo from "@/components/Logo";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-background transition-colors duration-300">
      <div className="ko-card p-8 max-w-md w-full shadow-xl border border-border">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-8">
          <Logo />
          <h2 className="text-2xl font-black text-foreground mt-4">
            {t("ফিরে আসার জন্য ধন্যবাদ", "Welcome Back")}
          </h2>
          <p className="text-foreground/60 text-sm font-medium text-center">
            {t("লগইন করতে আপনার তথ্য দিন", "Please enter your details to login")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-black flex items-center gap-2 text-foreground/80 text-sm py-2 uppercase tracking-wider">
                <Mail size={16} className="text-primary" /> {t("ইমেইল ঠিকানা", "Email Address")}
              </span>
            </label>
            <input
              type="email"
              placeholder="roky@example.com"
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
              <span className="label-text font-black flex items-center gap-2 text-foreground/80 text-sm py-2 uppercase tracking-wider">
                <Lock size={16} className="text-primary" /> {t("পাসওয়ার্ড", "Password")}
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
            
            <label className="label justify-end py-1">
              <Link
                href="#"
                className="text-[10px] font-black text-primary hover:underline uppercase tracking-tighter"
              >
                {t("পাসওয়ার্ড ভুলে গেছেন?", "Forgot password?")}
              </Link>
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-krishoky w-full flex items-center justify-center gap-2 group mt-2 bg-primary text-white font-black py-3 rounded-lg shadow-lg hover:shadow-primary/30 transition-all"
          >
            {isSubmitting ? t("লগইন হচ্ছে...", "Logging in...") : t("লগইন করুন", "Login Now")}
            {!isSubmitting && (
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-border text-center text-sm">
          <p className="text-foreground/50 font-bold">
            {t("অ্যাকাউন্ট নেই?", "Don't have an account?")}{" "}
            <Link
              href="/register"
              className="text-primary font-black hover:underline uppercase tracking-tighter"
            >
              {t("নতুন অ্যাকাউন্ট খুলুন", "Create Account")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}