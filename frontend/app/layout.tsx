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
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="max-w-7xl mx-auto w-full px-[24px] py-[48px] flex-1">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
