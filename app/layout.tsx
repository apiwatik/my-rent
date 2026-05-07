import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "My Rent - Property Wishlist",
  description: "Track and manage your rental property search",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#f8f9fa] text-[#202124]">
        <Header />
        <main className="max-w-7xl mx-auto w-full px-6 py-8 md:py-12 flex-1">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
