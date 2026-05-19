import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ১. ব্যাকএন্ড থেকে আসা ইউজারের ডাটার টাইপ ডিফাইন করা
interface CustomUser extends User {
  id: string;
  email: string;
  name: string;
  token?: string; // যদি আপনার ব্যাকএন্ড থেকে JWT টোকেন আসে
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          const user = await res.json();

          // যদি ব্যাকএন্ড সাকসেস রেসপন্স দেয়
          if (res.ok && user) {
            return user as CustomUser;
          }

          // 👇 যদি পাসওয়ার্ড বা ইমেইল ভুল হয়, সরাসরি null দিন। কোনো এরর থ্রো করার দরকার নেই!
          return null;
        } catch (error) {
          // ব্যাকএন্ড সার্ভার যদি পুরোপুরি বন্ধ থাকে বা নেটওয়ার্ক এরর হয়
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // ২. jwt এবং session কলব্যাকে any-এর বদলে সঠিক টাইপ ব্যবহার করা
    async jwt({ token, user }) {
      if (user) {
        token.user = user as CustomUser;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        // এখানে any-এর বদলে explicit টাইপ অ্যাসাইন করা হয়েছে
        session.user = token.user as CustomUser;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
