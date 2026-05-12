"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Send, Leaf, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FaFacebook } from "react-icons/fa";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { CiInstagram } from "react-icons/ci";
import { LiaLinkedinIn } from "react-icons/lia";

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: <FaFacebook size={20} />, href: "https://facebook.com/rokymax626" },
    { icon: <BsTwitterX size={20} />, href: "https://twitter.com/rokymax626" },
    {
      icon: <CiInstagram size={20} />,
      href: "https://www.instagram.com/rokymax626/",
    },
    {
      icon: <LiaLinkedinIn size={20} />,
      href: "https://linkedin.com/in/roky18",
    },
    { icon: <BsGithub size={20} />, href: "https://github.com/roky18" },
  ];

  return (
    <footer className="relative mt-20 border-t border-border/40 bg-card/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* ব্র্যান্ড এবং ডেসক্রিপশন */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform">
                <Leaf className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground">
                Krish<span className="text-primary">Oky</span>
              </span>
            </div>
            <p className="text-foreground/60 text-sm leading-relaxed">
              {t(
                "কৃষকদের জন্য একটি আধুনিক এআই চালিত ডিজিটাল প্ল্যাটফর্ম। আপনার ফসল, আমাদের প্রযুক্তি।",
                "A modern AI-powered digital platform for farmers. Your crops, our technology.",
              )}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-white transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* কুইক লিঙ্কস */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">
              {t("দ্রুত লিঙ্ক", "Quick Links")}
            </h4>
            <ul className="space-y-4">
              {["Shop", "About", "Services", "Farmers Guide"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block"
                  >
                    {t(item, item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* কন্টাক্ট ইনফো */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">
              {t("যোগাযোগ", "Contact Info")}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-foreground/60">
                <Phone size={16} className="text-primary" />{" "}
                <span>+880 1727 020930</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/60">
                <Mail size={16} className="text-primary" />{" "}
                <span>roky18bd@gmail.com</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-foreground/60">
                <MapPin size={16} className="text-primary mt-1" />{" "}
                <span>{t("পাবনা, বাংলাদেশ", "Pabna, Bangladesh")}</span>
              </div>
            </div>
          </div>

          {/* নিউজলেটার */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">
              {t("নিউজলেটার", "Newsletter")}
            </h4>
            <p className="text-sm text-foreground/60">
              {t(
                "সবার আগে আপডেট পেতে সাবস্ক্রাইব করুন।",
                "Subscribe for latest updates.",
              )}
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder={t("আপনার ইমেইল", "Your email")}
                className="w-full bg-primary/5 border border-border/50 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-all text-sm"
              />
              <button className="absolute right-2 top-2 bg-primary text-white p-2 rounded-xl hover:shadow-lg shadow-primary/20 transition-all">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* কপিরাইট */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/40 font-medium">
            © 2026 KrishOky. All rights reserved. Developed by{" "}
            <span className="text-primary font-bold">ROKY18</span>
          </p>
          <div className="flex gap-8 text-xs text-foreground/40 font-medium">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
