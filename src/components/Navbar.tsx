"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import {
  Menu,
  X,
  Sun,
  Moon,
  Languages,
  Home,
  Users,
  ShoppingBag,
  ClipboardList,
  Search,
  LayoutDashboard,
  User,
  Info,
} from "lucide-react";
import Logo from "./Logo";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const isLoggedIn = false;

  const publicLinks = [
    { name: t("হোম", "Home"), path: "/" },
    { name: t("কমিউনিটি", "Community"), path: "/community" },
    { name: t("শপ", "Shop"), path: "/shop" },
    { name: t("আমাদের সম্পর্কে", "About"), path: "/about" },
  ];

  if (!mounted) return <div className="h-16 border-b bg-background" />;

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {publicLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="text-sm font-bold text-foreground hover:text-primary"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-4 border-l pl-4 border-border">
            {/* Language Toggle: বাং / EN */}
            <button
              onClick={() => setLanguage(language === "BN" ? "EN" : "BN")}
              className="flex items-center gap-1 bg-secondary/10 dark:bg-white/10 px-3 py-1.5 rounded-full text-xs font-black cursor-pointer text-foreground"
            >
              <Languages size={14} /> {language === "BN" ? "বাং" : "EN"}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-secondary/10 dark:bg-white/10 text-yellow-500 cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} className="text-slate-700" />
              )}
            </button>

            <Link
              href="/login"
              className="btn-krishoky !py-2 !px-4 text-xs font-black uppercase"
            >
              {t("শুরু করুন", "Get Started")}
            </Link>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-yellow-500"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border p-5 space-y-4">
          {publicLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="block font-bold text-lg text-foreground"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border flex flex-col gap-4">
            <button
              onClick={() => {
                setLanguage(language === "BN" ? "EN" : "BN");
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full font-bold text-foreground"
            >
              <Languages size={20} className="text-primary" />
              {language === "BN" ? "English" : "বাংলা"}
            </button>
            <Link href="/login" className="btn-krishoky text-center">
              {t("শুরু করুন", "Get Started")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
