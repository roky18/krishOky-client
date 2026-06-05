// "use client";
// import React from "react";
// import Link from "next/link";
// import { useLanguage } from "@/context/LanguageContext";
// import { ArrowRight, Sprout, Users, ShoppingCart } from "lucide-react";

// export default function Home() {
//   const { t } = useLanguage();

//   return (
//     <main className="min-h-screen">
//       {/* Hero Section */}
//       <section className="py-20 px-6 text-center bg-gradient-to-b from-primary/5 to-transparent">
//         <div className="max-w-4xl mx-auto">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20">
//             <Sprout size={16} />{" "}
//             {t("কৃষকভাইদের ডিজিটাল সঙ্গী", "Digital Partner for Farmers")}
//           </div>
//           <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
//             {t(
//               "আধুনিক কৃষির পূর্ণাঙ্গ সমাধান",
//               "Complete Solution for Modern Agriculture",
//             )}
//           </h1>
//           <p className="text-foreground/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
//             {t(
//               "সরাসরি কৃষকের মাঠ থেকে তাজা ফসল কিনুন অথবা আপনার ফসলের আপডেট শেয়ার করুন আমাদের বিশাল কমিউনিটিতে।",
//               "Buy fresh crops directly from farms or share your crop updates in our massive community.",
//             )}
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/shop"
//               className="btn-krishoky !py-4 !px-8 flex items-center justify-center gap-2 text-lg"
//             >
//               {t("বাজার দেখুন", "Visit Market")} <ShoppingCart size={20} />
//             </Link>
//             <Link
//               href="/community"
//               className="px-8 py-4 rounded-xl border-2 border-border font-black text-foreground hover:bg-secondary/5 transition-all flex items-center justify-center gap-2 text-lg"
//             >
//               {t("কমিউনিটিতে যোগ দিন", "Join Community")} <Users size={20} />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Quick Stats or Features (Optional) */}
//       <section className="py-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="ko-card p-8 text-center h-auto!">
//           <h3 className="text-3xl font-black text-primary mb-2">500+</h3>
//           <p className="font-bold text-foreground/60">
//             {t("সফল কৃষক", "Successful Farmers")}
//           </p>
//         </div>
//         <div className="ko-card p-8 text-center h-auto!">
//           <h3 className="text-3xl font-black text-primary mb-2">1200+</h3>
//           <p className="font-bold text-foreground/60">
//             {t("প্রতিদিনের ডেলিভারি", "Daily Deliveries")}
//           </p>
//         </div>
//         <div className="ko-card p-8 text-center h-auto!">
//           <h3 className="text-3xl font-black text-primary mb-2">24/7</h3>
//           <p className="font-bold text-foreground/60">
//             {t("কৃষি সহায়তা", "Agri Support")}
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sprout, Users, ShoppingCart } from "lucide-react";

const carouselImages = [
  "/images/agri1.png",
  "/images/agri2.png",
  "/images/agri3.png",
];

export default function Home() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  // অটো ক্যারোসেল লজিক (৬ সেকেন্ডের বদলে ১০ সেকেন্ড যা আপনি চেয়েছিলেন)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        {/* Background Image Carousel (Full Brightness) */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={carouselImages[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, filter: "brightness(1.1)" }} // brightness 1.1 দিলে ছবি আরও উজ্জ্বল দেখাবে
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          {/* হালকা ওভারলে যাতে টেক্সট পড়া যায় */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-sm mb-6 border border-white/30">
            <Sprout size={16} />{" "}
            {t("কৃষকভাইদের ডিজিটাল সঙ্গী", "Digital Partner for Farmers")}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-md">
            {t(
              "আধুনিক কৃষির পূর্ণাঙ্গ সমাধান",
              "Complete Solution for Modern Agriculture",
            )}
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium drop-shadow-sm">
            {t(
              "সরাসরি কৃষকের মাঠ থেকে তাজা ফসল কিনুন অথবা আপনার ফসলের আপডেট শেয়ার করুন আমাদের বিশাল কমিউনিটিতে।",
              "Buy fresh crops directly from farms or share your crop updates in our massive community.",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-8 py-4 rounded-xl bg-white text-primary font-black hover:bg-gray-100 transition-all flex items-center justify-center gap-2 text-lg shadow-xl"
            >
              {t("বাজার দেখুন", "Visit Market")} <ShoppingCart size={20} />
            </Link>
            <Link
              href="/community"
              className="px-8 py-4 rounded-xl border-2 border-white text-white font-black hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm"
            >
              {t("কমিউনিটিতে যোগ দিন", "Join Community")} <Users size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="ko-card p-8 text-center h-auto!">
          <h3 className="text-3xl font-black text-primary mb-2">500+</h3>
          <p className="font-bold text-foreground/60">
            {t("সফল কৃষক", "Successful Farmers")}
          </p>
        </div>
        <div className="ko-card p-8 text-center h-auto!">
          <h3 className="text-3xl font-black text-primary mb-2">1200+</h3>
          <p className="font-bold text-foreground/60">
            {t("প্রতিদিনের ডেলিভারি", "Daily Deliveries")}
          </p>
        </div>
        <div className="ko-card p-8 text-center h-auto!">
          <h3 className="text-3xl font-black text-primary mb-2">24/7</h3>
          <p className="font-bold text-foreground/60">
            {t("কৃষি সহায়তা", "Agri Support")}
          </p>
        </div>
      </section>
    </main>
  );
}
