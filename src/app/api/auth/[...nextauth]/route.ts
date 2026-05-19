import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ১. ব্যাকএন্ড থেকে আসা ইউজারের ডাটার টাইপ ডিফাইন করা
interface CustomUser extends User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  token?: string;
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

          const responseData = await res.json();

          // ✅ ২. ব্যাকএন্ডের পাঠানো ডাটা চেক করা হচ্ছে
          if (res.ok && responseData && responseData.data) {
            const loginData = responseData.data; // এর ভেতর accessToken এবং user আছে
            const backendUser = loginData.user; // ব্যাকএন্ডের পাঠানো আসল ইউজার অবজেক্ট

            // 🎯 ৩. এখানে ম্যাপ করা হলো যাতে ডাটাবেজের আসল নামটাই সেশনে যায়
            return {
              id: backendUser?._id || backendUser?.id || credentials.email,
              name:
                backendUser?.name ||
                credentials.email.split("@")[0].toUpperCase(), // 🧠 ব্যাকএন্ডে নাম থাকলে সেটাই নিবে, মিস করলে ফলব্যাক
              email: backendUser?.email || credentials.email,
              image: backendUser?.image || null,
              token: loginData.accessToken,
            } as CustomUser;
          }

          return null;
        } catch (error) {
          console.error("NextAuth Auth Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = (token.image as string) || null;
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
