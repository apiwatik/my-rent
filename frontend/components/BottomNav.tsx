"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `flex flex-col items-center justify-center pt-2 pb-4 flex-1 transition-colors ${
      active ? "text-black border-t-2 border-black" : "text-on-surface-variant hover:bg-surface-container-low"
    }`;
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center bg-[#f9f9f9] border-t border-[0.5px] border-[#cfc4c5] z-50">
        <Link href="/" className={linkClass("/")}>
          <span className="material-symbols-outlined">search</span>
          <span className="text-[12px] font-semibold tracking-widest uppercase leading-none mt-1">
            Listings
          </span>
        </Link>
        <Link href="/wishlist" className={linkClass("/wishlist")}>
          <span className="material-symbols-outlined">favorite</span>
          <span className="text-[12px] font-semibold tracking-widest uppercase leading-none mt-1">
            Wishlist
          </span>
        </Link>
        <Link href="/add" className={linkClass("/add")}>
          <span className="material-symbols-outlined">add_box</span>
          <span className="text-[12px] font-semibold tracking-widest uppercase leading-none mt-1">
            Add
          </span>
        </Link>
      </nav>
      <div className="md:hidden h-20" />
    </>
  );
}
