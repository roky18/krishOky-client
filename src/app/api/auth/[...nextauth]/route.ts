import NextAuth, { NextAuthOptions, User, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// 🚀 ১. টাইপস্ক্রিপ্টের এরর অনুযায়ী হুবহু ইন্টারসেকশন (&) স্ট্রাকচার মেইনটেইন করে অগমেন্টেশন করা হলো
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }

  interface Account {
    backendUser?: {
      _id?: string;
      id?: string;
      name: string;
      email: string;
      image?: string | null;
      role: string;
    };
    accessToken?: string;
  }
}

// 🚀 ২. JWT টাইপ ডিক্লারেশন
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    image?: string | null;
    name?: string | null;
    email?: string | null;
  }
}

interface CustomUser extends User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  token?: string;
}

interface GoogleProfile extends Profile {
  picture?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    // 🛠️ CredentialsProvider (মাখনের মতো কাজ করছে)
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

          if (res.ok && responseData && responseData.data) {
            const loginData = responseData.data;
            const backendUser = loginData.user;

            return {
              id: backendUser?._id || backendUser?.id || credentials.email,
              name:
                backendUser?.name ||
                credentials.email.split("@")[0].toUpperCase(),
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

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // 🎯 signIn Callback
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          const googleProfile = profile as GoogleProfile;

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: googleProfile?.name || "",
                email: googleProfile?.email || "",
                image: googleProfile?.image || googleProfile?.picture || "",
              }),
            },
          );

          const responseData = await res.json();

          if (res.ok && responseData && responseData.data && account) {
            account.backendUser = responseData.data.user;
            account.accessToken = responseData.data.accessToken;
            return true;
          }
          return false; // 🔒 ব্যাকএন্ডে কোনো ঝামেলা হলে সিকিউরলি আটকে দিবে
          
        } catch (error) {
          console.error("Google auth backend connection failed:", error);
          return false;
        }
      }
      return true;
    },

    // 🎯 JWT Callback
    async jwt({ token, user, account }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.name = customUser.name;
        token.email = customUser.email;
        token.image = customUser.image || null;
        token.accessToken = customUser.token || "";
      }
      if (account?.provider === "google" && account.backendUser) {
        const bUser = account.backendUser;
        token.id = bUser._id || bUser.id || "";
        token.name = bUser.name;
        token.email = bUser.email;
        token.image = bUser.image || null;
        token.accessToken = account.accessToken || "";
      }
      return token;
    },

    // 🎯 Session Callback
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id || "";
        session.user.name = token.name || "";
        session.user.email = token.email || "";
        session.user.image = token.image || null;
        session.accessToken = token.accessToken || "";
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
