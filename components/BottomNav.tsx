"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `flex flex-col items-center justify-center pt-2 pb-4 flex-1 transition-colors relative ${
      active 
        ? "text-[#1a73e8]" 
        : "text-[#5f6368] hover:text-[#202124] hover:bg-[#f8f9fa]"
    }`;
  };

  const activeIndicator = (href: string) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    if (!active) return null;
    return <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[#1a73e8] rounded-b-md" />;
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center bg-white border-t border-[#e0e0e0] z-50">
        <Link href="/" className={linkClass("/")}>
          {activeIndicator("/")}
          <span className="material-symbols-outlined text-[24px] mb-1">search</span>
          <span className="text-[11px] font-medium leading-none">
            Listings
          </span>
        </Link>
        <Link href="/wishlist" className={linkClass("/wishlist")}>
          {activeIndicator("/wishlist")}
          <span className="material-symbols-outlined text-[24px] mb-1">favorite</span>
          <span className="text-[11px] font-medium leading-none">
            Wishlist
          </span>
        </Link>
        <Link href="/add" className={linkClass("/add")}>
          {activeIndicator("/add")}
          <span className="material-symbols-outlined text-[24px] mb-1">add_box</span>
          <span className="text-[11px] font-medium leading-none">
            Add
          </span>
        </Link>
      </nav>
      <div className="md:hidden h-20" />
    </>
  );
}
