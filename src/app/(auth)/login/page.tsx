"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Logo from "@/components/Logo";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"; // Eye icons যোগ করা হয়েছে

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  // পাসওয়ার্ড দেখানো বা লুকানোর জন্য স্টেট
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-slate-50/50 dark:bg-transparent">
      <div className="ko-card p-8 max-w-md w-full h-auto! shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center mb-8">
          <Logo />
          <h2 className="text-2xl font-bold text-secondary dark:text-white mt-4">
            Welcome Back
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Please enter your details to login
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <Mail size={16} className="text-primary" /> Email Address
              </span>
            </label>
            <input
              type="email"
              placeholder="roky@example.com"
              className={`input input-bordered w-full focus:outline-primary ${errors.email ? "border-red-500" : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field with Show/Hide Toggle */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <Lock size={16} className="text-primary" /> Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // ডাইনামিক টাইপ
                placeholder="••••••••"
                className={`input input-bordered w-full focus:outline-primary pr-10 ${errors.password ? "border-red-500" : ""}`}
                {...register("password")}
              />
              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </span>
            )}
            <label className="label justify-end">
              <Link
                href="#"
                className="label-text-alt link link-hover text-primary font-medium"
              >
                Forgot password?
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-krishoky w-full flex items-center justify-center gap-2 group"
          >
            {isSubmitting ? "Logging in..." : "Login Now"}
            {!isSubmitting && (
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Don`t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
