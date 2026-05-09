"use client";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* PNG Logo Image */}
      <div className="relative w-10 h-10 overflow-hidden">
        <Image
          src="/KrishOky Logo.png"
          alt="KrishOky Logo"
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-300"
          priority // লোগো যাতে সবার আগে লোড হয়
        />
      </div>
    </Link>
  );
};

export default Logo;
