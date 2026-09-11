import { dummyAdmins } from "@/data/dummy";
import { AdminCard } from "@/components/marketplace/AdminCard";
import { ShieldCheck, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function generateMetadata() {
  return {
    title: "Direktori Admin Rekber Terpercaya — RekberGG",
    description: "Daftar admin rekber game resmi ber-TrustScore tinggi, cepat dan terverifikasi identitas resmi (KYC).",
  };
}

export default function RekberDirectoryPage() {
  const sorted = [...dummyAdmins].sort((a, b) => b.trustScore - a.trustScore);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumbs & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
            <Link href="/" className="hover:underline">Beranda</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700">Direktori Admin Rekber</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Direktori Admin Rekber Terverifikasi
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            Pilih admin escrow dengan rekam jejak ribuan transaksi sukses, identitas KTP terverifikasi (KYC), dan respons cepat untuk menjamin transaksi akunmu aman.
          </p>
        </div>

        {/* Info & Safety Banner */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 mb-8">
          <ShieldCheck size={20} className="text-blue-600 mt-0.5 shrink-0" />
          <div className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-bold">Protokol Keamanan RekberGG:</strong> Seluruh admin di bawah ini adalah pihak ketiga yang telah melewati verifikasi KYC dan menaruh deposit jaminan. Dana transaksi ditransfer langsung ke rekening resmi admin yang tertera dan terlindungi bukti digital.
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mr-1">
              <Filter size={13} /> Urutkan:
            </span>
            {["Skor Tertinggi", "Transaksi Terbanyak", "Respon Cepat (<5m)", "Fee Termurah"].map((s, i) => (
              <button
                key={s}
                className={`text-xs rounded-lg px-3 py-1.5 font-semibold transition-all cursor-pointer ${
                  i === 0
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-500">
            {sorted.length} Admin Aktif & Siap Transaksi
          </span>
        </div>

        {/* Admin Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sorted.map((a, i) => (
            <AdminCard key={a.id} admin={a} rank={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
