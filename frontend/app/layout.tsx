import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "My Rent — Property Wishlist",
  description: "Track and manage your rental property search",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header userEmail={user?.email} />
        <main className="max-w-7xl mx-auto w-full px-[24px] py-[48px] flex-1">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
