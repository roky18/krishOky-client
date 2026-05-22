import type { Metadata } from "next";
import { Noto_Sans_Bengali, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/providers/ThemeProvider";
import TanstackProvider from "@/providers/TanstackProvider"; // ১. এটি ইম্পোর্ট করুন
import Footer from "@/components/shared/Footer";
import AIChatbot from "@/components/shared/AIChatbot";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const notoBengali = Noto_Sans_Bengali({
  weight: ["400", "700"],
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "KrishOky",
  description: "Agriculture Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoBengali.variable} font-bengali antialiased`}
      >
        {/* ২. সব প্রোভাইডারের একদম উপরে TanstackProvider দিয়ে মুড়িয়ে দিন */}

        <TanstackProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <LanguageProvider>
                <CartProvider>
                  <Navbar />
                  <main>
                    {children} <AIChatbot />
                  </main>
                  <Footer />
                </CartProvider>
              </LanguageProvider>
            </AuthProvider>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
