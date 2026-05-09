"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Logo from "@/components/Logo";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";

// ১. ভ্যালিডেশন স্কিমা তৈরি (Zod)
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  // পাসওয়ার্ড দেখানো বা লুকানোর স্টেট
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Registration Data:", data);
    // এখানে পরে আমরা axiosInstance দিয়ে এপিআই কল করবো
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-slate-50/50 dark:bg-transparent">
      <div className="ko-card p-8 max-w-md w-full h-auto! shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-8">
          <Logo />
          <h2 className="text-2xl font-bold text-secondary dark:text-white mt-4">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">Join KrishOky and start your journey</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Full Name Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <User size={16} className="text-primary" /> Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className={`input input-bordered w-full focus:outline-primary ${errors.name ? "border-red-500" : ""}`}
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <Mail size={16} className="text-primary" /> Email Address
              </span>
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className={`input input-bordered w-full focus:outline-primary ${errors.email ? "border-red-500" : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
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
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`input input-bordered w-full focus:outline-primary pr-10 ${errors.password ? "border-red-500" : ""}`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-krishoky w-full flex items-center justify-center gap-2 group mt-2"
          >
            {isSubmitting ? "Creating account..." : "Register Now"}
            {!isSubmitting && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}