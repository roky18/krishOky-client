"use client";

import React from "react";
import Image from "next/image";
import { Code, Heart, Mail, Rocket, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";

const AboutPage = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 pb-20">
      {/* --- Full Wide Hero Banner (Text on Image) --- */}
      <section className="relative w-full h-[75vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop"
          alt="Agri-Tech Full Banner"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />

        {/* Dark Gradient Overlay (লেখার স্পষ্টতার জন্য) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>

        {/* Content on Top of Image */}
        <div className="relative z-10 text-center px-6 max-w-5xl animate-in fade-in zoom-in duration-1000">
          <h1 className="text-5xl md:text-9xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
            Krish<span className="text-green-500">Oky</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-green-400 mb-8 uppercase tracking-[0.2em]">
            {t("কৃষি প্রযুক্তির ভবিষ্যৎ", "The Future of Agri-Tech")}
          </h2>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium">
            {t(
              "এআই এবং মাটির মধ্যে এক অনন্য সেতুবন্ধন। আমরা প্রযুক্তির মাধ্যমে কৃষকদের জীবনযাত্রায় আধুনিক পরিবর্তন নিয়ে আসছি।",
              "Building a bridge between AI and the soil. Revolutionizing how farmers interact with technology through a seamless marketplace.",
            )}
          </p>
        </div>

        {/* AI Status Badge */}
        <div className="absolute bottom-10 left-10 hidden md:flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-3xl">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          <span className="text-white text-sm font-semibold tracking-wider">
            {t("এআই মনিটরিং সক্রিয়", "AI Monitoring System Active")}
          </span>
        </div>
      </section>

      {/* --- Mission & Vision (Overlap with Banner) --- */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 -mt-24 relative z-20">
        <div className="p-10 rounded-[40px] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl group hover:border-green-500/50 transition-all duration-500">
          <h2 className="text-3xl font-bold text-green-600 mb-6 flex items-center gap-3">
            <Rocket className="w-8 h-8 group-hover:animate-bounce" />{" "}
            {t("আমাদের লক্ষ্য", "Our Mission")}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            {t(
              "কৃষিওকি-এর উদ্দেশ্য হলো প্রতিটি কৃষকের কাছে সর্বশ্রেষ্ঠ কৃষি পণ্য (বীজ, সার, যন্ত্রপাতি) পৌঁছে দেয়া। গুগল জেমিনি এআই ব্যবহার করে আমরা দ্বি-ভাষিক সুবিধা দিচ্ছি।",
              "KrishOky aims to deliver premium agri-products (seeds, fertilizers, tools) to every farmer. Using Google Gemini AI, we provide seamless bilingual support.",
            )}
          </p>
        </div>
        <div className="p-10 rounded-[40px] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl group hover:border-emerald-500/50 transition-all duration-500">
          <h2 className="text-3xl font-bold text-emerald-500 mb-6 flex items-center gap-3">
            <Heart className="w-8 h-8 group-hover:scale-125 transition-transform" />{" "}
            {t("আমাদের ভিশন", "Our Vision")}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            {t(
              "আমরা এমন একটি ইকোসিস্টেম তৈরি করছি যেখানে কৃষক এবং বিক্রেতারা সরাসরি যুক্ত হতে পারবে। এআই রিভিউ সামারি এবং অটোমেটেড কন্টেন্ট জেনারেশন আমাদের বৈশিষ্ট্য।",
              "We are building an ecosystem where farmers and sellers can connect directly. AI review summaries and automated content generation are our key features.",
            )}
          </p>
        </div>
      </section>

      {/* --- Developer Profile Section (Roky) --- */}
      <section className="max-w-5xl mx-auto px-6 py-32">
        <div className="relative group p-1 bg-gradient-to-br from-green-500 via-emerald-400 to-blue-500 rounded-[60px] shadow-2xl shadow-green-500/20">
          <div className="bg-white dark:bg-[#0a0a0a] rounded-[58px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-14">
            {/* Profile Image (GitHub Profile) */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
              <div className="absolute inset-0 bg-green-500 rounded-[45px] rotate-6 opacity-10 group-hover:rotate-12 transition-transform duration-500"></div>
              <div className="relative w-full h-full rounded-[45px] overflow-hidden border-[6px] border-white dark:border-slate-800 shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dbua4ih4l/image/upload/v1778513101/Roky18_ts_bg-gray_b3vxye.png"
                  alt="Roky Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform group-hover:scale-110 duration-700"
                />
              </div>
            </div>

            {/* Info Side */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-5 py-2 rounded-full bg-green-500/10 text-green-600 text-xs font-black tracking-widest uppercase mb-6">
                {t("প্রধান ডেভেলপার", "Lead Full-Stack Developer")}
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-white mb-4 tracking-tighter">
                Roky <span className="text-slate-400 font-light">(ROKY18)</span>
              </h2>
              <h3 className="text-xl md:text-2xl text-emerald-500 font-bold mb-8">
                {t(
                  "সিনিয়র ফুল-স্ট্যাক ও এমইআরএন ডেভেলপার",
                  "Senior Full-stack & MERN Developer",
                )}
              </h3>

              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                {t(
                  "আসসালামু আলাইকুম! আমি রকি, পাবনা, বাংলাদেশ থেকে একজন এমইআরএন এবং নেক্সট-জেএস বিশেষজ্ঞ। আমি ডিজিটাল বাংলাদেশের কৃষি খাতকে উন্নত করার লক্ষ্যে এই প্রজেক্টটি বিল্ড করছি।",
                  "As-salamu Alaykum! I'm Roky, a MERN & Next.js specialist from Pabna, Bangladesh. I am building this project to elevate the agricultural sector of Digital Bangladesh.",
                )}
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href="https://github.com/ROKY18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-[25px] bg-slate-100 dark:bg-white/5 hover:bg-black hover:text-white transition-all shadow-lg active:scale-90"
                >
                  <FaGithub className="w-7 h-7" />
                </a>
                <a
                  href="https://linkedin.com/in/roky18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-[25px] bg-slate-100 dark:bg-white/5 hover:bg-black hover:text-white transition-all shadow-lg active:scale-90"
                >
                  <FaLinkedin className="w-7 h-7" />
                </a>
                <a
                  href="mailto:roky18bd@gmail.com"
                  className="p-5 rounded-[25px] bg-slate-100 dark:bg-white/5 hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-90"
                >
                  <Mail className="w-7 h-7" />
                </a>
                <a
                  href="https://roky18.github.io/Protfolieo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-5 rounded-[25px] bg-green-600 text-white font-black text-lg hover:shadow-[0_20px_40px_rgba(22,163,74,0.3)] transition-all active:scale-95"
                >
                  <Code className="w-6 h-6" /> {t("পোর্টফোলিও", "Portfolio")}{" "}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer Message --- */}
      <footer className="text-center opacity-30 mt-10">
        <p className="font-mono text-xs uppercase tracking-[0.5em]">
          Crafted with Precision by Roky
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
