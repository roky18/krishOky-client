"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { Languages, Menu, Moon, Sun, X } from "lucide-react";
import Logo from "./Logo";

type StoredUser = {
  email?: string;
  photoURL?: string;
  photoUrl?: string;
  image?: string;
  avatar?: string;
};

const getStoredUser = (): StoredUser | null => {
  if (typeof window === "undefined") return null;

  const userKeys = ["krishoky-user", "currentUser", "user"];

  for (const key of userKeys) {
    const storedValue = window.localStorage.getItem(key);
    if (!storedValue) continue;

    try {
      const parsedUser = JSON.parse(storedValue) as StoredUser;
      if (parsedUser?.email) return parsedUser;
    } catch {
      if (storedValue.includes("@")) return { email: storedValue };
    }
  }

  const email = window.localStorage.getItem("email");
  return email ? { email } : null;
};

const getAvatarUrl = (user: StoredUser) => {
  const photoUrl = user.photoURL || user.photoUrl || user.image || user.avatar;
  if (photoUrl) return photoUrl;

  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    user.email || "KrishOky User",
  )}`;
};

const UserAvatar = ({ user }: { user: StoredUser }) => (
  <span
    className="block h-full w-full bg-cover bg-center"
    role="img"
    aria-label={user.email}
    style={{ backgroundImage: `url(${getAvatarUrl(user)})` }}
  />
);

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setUser(getStoredUser());
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setUser(getStoredUser()));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const publicLinks = [
    { name: t("হোম", "Home"), path: "/" },
    { name: t("কমিউনিটি", "Community"), path: "/community" },
    { name: t("শপ", "Shop"), path: "/shop" },
    { name: t("আমাদের সম্পর্কে", "About"), path: "/about" },
  ];
  const isLoggedIn = Boolean(user?.email);

  const isActiveLink = (path: string) =>
    path === "/" ? pathname === path : pathname.startsWith(path);

  const getNavLinkClass = (path: string) =>
    [
      "border-b-2 pb-1 text-sm font-bold transition-colors",
      isActiveLink(path)
        ? "border-primary text-primary"
        : "border-transparent text-foreground hover:text-primary",
    ].join(" ");

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
              className={getNavLinkClass(link.path)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-4 border-l pl-4 border-border">
            {/* Language Toggle: বাংলা / EN */}
            <button
              onClick={() => setLanguage(language === "EN" ? "BN" : "EN")}
              className="flex items-center gap-1 bg-secondary/10 dark:bg-white/10 px-3 py-1.5 rounded-full text-xs font-black cursor-pointer text-foreground"
            >
              <Languages size={14} /> {language === "EN" ? "EN" : "বাংলা"}
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

            {isLoggedIn && user ? (
              <Link
                href="/profile"
                className="size-10 rounded-full border-2 border-primary overflow-hidden bg-primary/10"
                aria-label={user.email}
                title={user.email}
              >
                <UserAvatar user={user} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="btn-krishoky !py-2 !px-4 text-xs font-black uppercase"
              >
                {t("শুরু করুন", "Get Started")}
              </Link>
            )}
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
              className={`block font-bold text-lg ${
                isActiveLink(link.path) ? "text-primary" : "text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border flex flex-col gap-4">
            <button
              onClick={() => {
                setLanguage(language === "EN" ? "BN" : "EN");
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full font-bold text-foreground"
            >
              <Languages size={20} className="text-primary" />
              {language === "BN" ? "English" : "বাংলা"}
            </button>
            {isLoggedIn && user ? (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 font-bold text-foreground"
              >
                <span className="size-10 rounded-full border-2 border-primary overflow-hidden bg-primary/10">
                  <UserAvatar user={user} />
                </span>
                {user.email}
              </Link>
            ) : (
              <Link href="/login" className="btn-krishoky text-center">
                {t("শুরু করুন", "Get Started")}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
