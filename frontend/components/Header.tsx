"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

interface HeaderProps {
  userEmail?: string | null;
}

export default function Header({ userEmail }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const navLinkClass = (href: string) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `text-[12px] font-semibold tracking-widest uppercase leading-none h-full flex items-center px-4 transition-colors ${
      active
        ? "text-black border-b-2 border-black"
        : "text-on-surface-variant hover:text-black"
    }`;
  };

  return (
    <header className="bg-[#f9f9f9] border-b border-[0.5px] border-[#cfc4c5] w-full top-0 sticky z-50">
      <div className="flex justify-between items-center px-[24px] h-16 w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-[8px] cursor-pointer active:opacity-70">
          <span className="material-symbols-outlined text-black">home_work</span>
          <h1 className="text-[24px] font-bold leading-[1.2] tracking-[-0.01em] text-black">
            My Rent
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-[24px] h-full">
          <Link href="/" className={navLinkClass("/")}>
            Listings
          </Link>
          <Link href="/wishlist" className={navLinkClass("/wishlist")}>
            Wishlist
          </Link>
          <Link href="/add" className={navLinkClass("/add")}>
            Add
          </Link>
        </nav>

        <div className="flex items-center gap-[16px]">
          {userEmail ? (
            <div className="flex items-center gap-[16px]">
              <span className="hidden md:block text-[12px] text-on-surface-variant">
                {userEmail}
              </span>
              <button
                onClick={handleSignOut}
                className="material-symbols-outlined cursor-pointer text-on-surface-variant hover:text-black transition-colors"
                title="Sign out"
              >
                logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <span className="material-symbols-outlined cursor-pointer text-on-surface-variant hover:text-black transition-colors">
                account_circle
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
