import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "RekberGG — Marketplace & Rekber Akun Game Terpercaya",
  description:
    "Cari akun game impianmu dan transaksi aman dengan admin rekber terverifikasi di RekberGG. Seperti Glints tapi khusus gamer!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-sans bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased selection:bg-blue-100 selection:text-blue-700">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <Toaster theme="light" position="top-center" richColors />
      </body>
    </html>
  );
}
