// src/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * session.user এর টাইপ এক্সটেন্ড করা হচ্ছে
   */
  interface Session {
    user: {
      id: string;
      role?: string; // আপনার ডাটাবেজে "USER" বা "ADMIN" রোল থাকলে তাও টাইপ-সেফ থাকবে
    } & DefaultSession["user"];
  }

  /**
   * authorize() থেকে যে ইউজার রিটার্ন আসে তার টাইপ
   */
  interface User {
    id: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * jwt ক্যালব্যাকের ভেতরের token অবজেক্টের টাইপ এক্সটেন্ড করা হচ্ছে
   */
  interface JWT {
    id: string;
    role?: string;
  }
}
