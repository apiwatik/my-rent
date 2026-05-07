"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinkClass = (href: string) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `text-[14px] font-medium h-full flex items-center px-4 transition-colors relative ${
      active
        ? "text-[#1a73e8]"
        : "text-[#5f6368] hover:text-[#202124] hover:bg-[#f8f9fa]"
    }`;
  };

  const navIndicator = (href: string) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    if (!active) return null;
    return <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1a73e8] rounded-t-md" />;
  };

  return (
    <header className="bg-white border-b border-[#e0e0e0] w-full top-0 sticky z-50">
      <div className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <span className="material-symbols-outlined text-[24px] text-[#1a73e8]">home_work</span>
          <h1 className="text-[20px] font-semibold text-[#202124] tracking-tight">
            My Rent
          </h1>
        </Link>

        <nav className="hidden md:flex items-center h-full">
          <Link href="/" className={navLinkClass("/")}>
            Listings
            {navIndicator("/")}
          </Link>
          <Link href="/wishlist" className={navLinkClass("/wishlist")}>
            Wishlist
            {navIndicator("/wishlist")}
          </Link>
          <Link href="/add" className={navLinkClass("/add")}>
            Add Property
            {navIndicator("/add")}
          </Link>
        </nav>

        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#f1f3f4] flex items-center justify-center text-[#5f6368]">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
