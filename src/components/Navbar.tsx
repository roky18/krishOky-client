// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useTheme } from "next-themes";
// import { useLanguage } from "@/context/LanguageContext";
// import { Languages, Menu, Moon, Sun, X } from "lucide-react";
// import Logo from "./Logo";

// type StoredUser = {
//   email?: string;
//   photoURL?: string;
//   photoUrl?: string;
//   image?: string;
//   avatar?: string;
// };

// const getStoredUser = (): StoredUser | null => {
//   if (typeof window === "undefined") return null;

//   const userKeys = ["krishoky-user", "currentUser", "user"];

//   for (const key of userKeys) {
//     const storedValue = window.localStorage.getItem(key);
//     if (!storedValue) continue;

//     try {
//       const parsedUser = JSON.parse(storedValue) as StoredUser;
//       if (parsedUser?.email) return parsedUser;
//     } catch {
//       if (storedValue.includes("@")) return { email: storedValue };
//     }
//   }

//   const email = window.localStorage.getItem("email");
//   return email ? { email } : null;
// };

// const getAvatarUrl = (user: StoredUser) => {
//   const photoUrl = user.photoURL || user.photoUrl || user.image || user.avatar;
//   if (photoUrl) return photoUrl;

//   return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
//     user.email || "KrishOky User",
//   )}`;
// };

// const UserAvatar = ({ user }: { user: StoredUser }) => (
//   <span
//     className="block h-full w-full bg-cover bg-center"
//     role="img"
//     aria-label={user.email}
//     style={{ backgroundImage: `url(${getAvatarUrl(user)})` }}
//   />
// );

// const Navbar = () => {
//   const { theme, setTheme } = useTheme();
//   const { language, setLanguage, t } = useLanguage();
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [user, setUser] = useState<StoredUser | null>(null);

//   useEffect(() => {
//     const frame = window.requestAnimationFrame(() => {
//       setUser(getStoredUser());
//       setMounted(true);
//     });

//     return () => window.cancelAnimationFrame(frame);
//   }, []);

//   useEffect(() => {
//     const frame = window.requestAnimationFrame(() => setUser(getStoredUser()));
//     return () => window.cancelAnimationFrame(frame);
//   }, [pathname]);

//   const publicLinks = [
//     { name: t("হোম", "Home"), path: "/" },
//     { name: t("কমিউনিটি", "Community"), path: "/community" },
//     { name: t("শপ", "Shop"), path: "/shop" },
//     { name: t("আমাদের সম্পর্কে", "About"), path: "/about" },
//   ];
//   const isLoggedIn = Boolean(user?.email);

//   const isActiveLink = (path: string) =>
//     path === "/" ? pathname === path : pathname.startsWith(path);

//   const getNavLinkClass = (path: string) =>
//     [
//       "border-b-2 pb-1 text-sm font-bold transition-colors",
//       isActiveLink(path)
//         ? "border-primary text-primary"
//         : "border-transparent text-foreground hover:text-primary",
//     ].join(" ");

//   if (!mounted) return <div className="h-16 border-b bg-background" />;

//   return (
//     <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
//         <Logo />

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {publicLinks.map((link) => (
//             <Link
//               key={link.path}
//               href={link.path}
//               className={getNavLinkClass(link.path)}
//             >
//               {link.name}
//             </Link>
//           ))}

//           <div className="flex items-center gap-4 border-l pl-4 border-border">
//             {/* Language Toggle: বাংলা / EN */}
//             <button
//               onClick={() => setLanguage(language === "EN" ? "BN" : "EN")}
//               className="flex items-center gap-1 bg-secondary/10 dark:bg-white/10 px-3 py-1.5 rounded-full text-xs font-black cursor-pointer text-foreground"
//             >
//               <Languages size={14} /> {language === "EN" ? "EN" : "বাংলা"}
//             </button>

//             {/* Theme Toggle */}
//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="p-2 rounded-full bg-secondary/10 dark:bg-white/10 text-yellow-500 cursor-pointer"
//             >
//               {theme === "dark" ? (
//                 <Sun size={18} />
//               ) : (
//                 <Moon size={18} className="text-slate-700" />
//               )}
//             </button>

//             {isLoggedIn && user ? (
//               <Link
//                 href="/profile"
//                 className="size-10 rounded-full border-2 border-primary overflow-hidden bg-primary/10"
//                 aria-label={user.email}
//                 title={user.email}
//               >
//                 <UserAvatar user={user} />
//               </Link>
//             ) : (
//               <Link
//                 href="/login"
//                 className="btn-krishoky !py-2 !px-4 text-xs font-black uppercase"
//               >
//                 {t("শুরু করুন", "Get Started")}
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* Mobile View Toggle */}
//         <div className="flex md:hidden items-center gap-2">
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2 text-yellow-500"
//           >
//             {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-foreground"
//           >
//             {isOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Content */}
//       {isOpen && (
//         <div className="md:hidden bg-background border-b border-border p-5 space-y-4">
//           {publicLinks.map((link) => (
//             <Link
//               key={link.path}
//               href={link.path}
//               onClick={() => setIsOpen(false)}
//               className={`block font-bold text-lg ${
//                 isActiveLink(link.path) ? "text-primary" : "text-foreground"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//           <div className="pt-4 border-t border-border flex flex-col gap-4">
//             <button
//               onClick={() => {
//                 setLanguage(language === "EN" ? "BN" : "EN");
//                 setIsOpen(false);
//               }}
//               className="flex items-center gap-3 w-full font-bold text-foreground"
//             >
//               <Languages size={20} className="text-primary" />
//               {language === "BN" ? "English" : "বাংলা"}
//             </button>
//             {isLoggedIn && user ? (
//               <Link
//                 href="/profile"
//                 onClick={() => setIsOpen(false)}
//                 className="flex items-center gap-3 font-bold text-foreground"
//               >
//                 <span className="size-10 rounded-full border-2 border-primary overflow-hidden bg-primary/10">
//                   <UserAvatar user={user} />
//                 </span>
//                 {user.email}
//               </Link>
//             ) : (
//               <Link href="/login" className="btn-krishoky text-center">
//                 {t("শুরু করুন", "Get Started")}
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { useSession, signOut } from "next-auth/react";
import { Languages, Menu, Moon, Sun, X, User, LogOut } from "lucide-react";
import Logo from "./Logo";

type StoredUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

// ডিফল্ট অবতার: জিমেইলের ইমেজ কোনো কারণে লোড না হলে বা না থাকলে এই সুন্দর অবতারটি দেখাবে
const getAvatarUrl = (user: StoredUser) => {
  if (user.image) return user.image; // 🧠 জিমেইলের অফিশিয়াল প্রোফাইল পিকচার

  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    user.name || user.email || "KrishOky User",
  )}`;
};

const UserAvatar = ({ user }: { user: StoredUser }) => (
  <span
    className="block h-full w-full bg-cover bg-center"
    role="img"
    aria-label={user.name || "User Avatar"}
    style={{ backgroundImage: `url(${getAvatarUrl(user)})` }}
  />
);

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // NextAuth থেকে সেশন ও ইউজার ডাটা নেওয়া হচ্ছে
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const user = session?.user as StoredUser | undefined;

  // লিন্টার এরর ফিক্সড মাউন্ট মেকানিজম
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // ড্রপডাউনের বাইরে ক্লিক করলে অটোমেটিক বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const publicLinks = [
    { name: t("হোম", "Home"), path: "/" },
    { name: t("কমিউনিটি", "Community"), path: "/community" },
    { name: t("শপ", "Shop"), path: "/shop" },
    { name: t("আমাদের সম্পর্কে", "About"), path: "/about" },
  ];

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
              onClick={() => setIsDropdownOpen(false)} // 🧠 পেজ চেঞ্জ এরর ফিক্সড
              className={getNavLinkClass(link.path)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-4 border-l pl-4 border-border">
            {/* Language Toggle */}
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
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} className="text-slate-700" />}
            </button>

            {/* 🛠️ ডেস্কটপ প্রোফাইল ড্রপডাউন (ইউজারের অরিজিনাল ডাটা সহ) */}
            {isLoggedIn && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="size-10 rounded-full border-2 border-primary overflow-hidden bg-primary/10 cursor-pointer focus:outline-none block"
                  aria-label="Toggle user menu"
                >
                  <UserAvatar user={user} />
                </button>

                {/* 🔽 ড্রপডাউন বক্স */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-border mb-1">
                      {/* 👤 এখানে ইউজারের আসল নাম এবং জিমেইল শো করবে */}
                      <p className="text-sm font-black text-foreground truncate">{user.name || "KrishOky User"}</p>
                      <p className="text-xs text-foreground/60 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground hover:bg-secondary/20 transition-colors"
                    >
                      <User size={16} className="text-primary" />
                      {t("প্রোফাইল", "Profile")}
                    </Link>

                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut size={16} />
                      {t("লগআউট", "Log Out")}
                    </button>
                  </div>
                )}
              </div>
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
              onClick={() => {
                setIsOpen(false);
                setIsDropdownOpen(false);
              }}
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
            
            {/* 🛠️ মোবাইল প্রোফাইল ডাটা */}
            {isLoggedIn && user ? (
              <div className="space-y-3">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 font-bold text-foreground"
                >
                  <span className="size-10 rounded-full border-2 border-primary overflow-hidden bg-primary/10 block">
                    <UserAvatar user={user} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-black">{user.name || "User"}</span>
                    <span className="text-xs text-foreground/60">{user.email}</span>
                  </div>
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut size={16} /> {t("লগআউট করুন", "Log Out")}
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="btn-krishoky text-center">
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