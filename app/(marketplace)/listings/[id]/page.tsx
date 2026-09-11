import { notFound } from "next/navigation";
import { Star, ShieldCheck, Sparkles, Trophy, Coins, Wallet, CheckCircle2, Lock, ArrowLeft, MessageCircle, Info } from "lucide-react";
import Link from "next/link";
import { dummyListings, dummyReviews } from "@/data/dummy";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { formatRupiah, waLink } from "@/lib/utils";
import { BuyPanel } from "./BuyPanel";

import { DetailBackButton } from "@/components/marketplace/DetailBackButton";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = dummyListings.find((l) => l.id === params.id);
  if (!listing) return notFound();

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-6">
          <DetailBackButton />
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 truncate max-w-xs">{listing.title}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Main Account Details Column */}
          <div className="space-y-6">
            {/* Header Showcase Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    eFootball Mobile / PC
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {listing.details.league} Division
                  </span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  {listing.status === "AVAILABLE" ? "Akun Ready (Tersedia)" : "Terjual"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
                {listing.title}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {listing.description}
              </p>

              {/* 4 Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-left">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Rating OVR
                  </span>
                  <span className="text-2xl font-black text-slate-900 mt-0.5 block">
                    {listing.details.overall}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-left">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Divisi Liga
                  </span>
                  <span className="text-lg font-bold text-slate-900 mt-1 block truncate">
                    {listing.details.league}
                  </span>
                </div>

                <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 text-left">
                  <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
                    Koin Aktif
                  </span>
                  <span className="text-lg font-bold text-amber-800 mt-1 block">
                    {listing.details.coins.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-3.5 text-left">
                  <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                    Total GP
                  </span>
                  <span className="text-lg font-bold text-blue-800 mt-1 block">
                    {listing.details.gp.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Players & Assets */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-blue-600" /> Daftar Pemain Kunci & Aset
              </h2>

              <div className="flex flex-wrap gap-2 mb-6">
                {listing.details.players.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-800 text-xs font-semibold"
                  >
                    ⭐ {p}
                  </span>
                ))}
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  <Info size={14} className="text-blue-600" /> Catatan Keamanan dari Penjual:
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {listing.details.notes || "Email aman, belum pernah terkena suspend, siap bantu ganti email hingga tuntas bersama admin rekber."}
                </p>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Star size={18} className="text-amber-500 fill-amber-500" /> Ulasan Pembeli Sebelumnya
              </h2>

              <div className="space-y-4">
                {dummyReviews.map((r) => (
                  <div key={r.id} className="pb-4 border-b border-slate-100 last:border-none last:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Avatar name={r.giverName} size={28} />
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {r.giverName}
                        </span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 pl-9">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Buy Panel */}
          <div className="space-y-5 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Harga Akun
              </span>
              <div className="text-3xl font-black text-blue-600 mb-4">
                {formatRupiah(listing.price)}
              </div>

              {/* Action Button: Beli Sekarang */}
              <div className="mb-4">
                <BuyPanel listingId={listing.id} />
              </div>

              {/* Chat Seller */}
              <a
                href={waLink(listing.seller.whatsapp ?? "")}
                target="_blank"
                rel="noreferrer"
                className="w-full block"
              >
                <button className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  <MessageCircle size={15} className="text-emerald-600" />
                  Tanya Penjual (WhatsApp)
                </button>
              </a>

              {/* Seller Profile Summary */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <Avatar name={listing.seller.username} size={40} />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm text-slate-900">{listing.seller.username}</span>
                      <ShieldCheck size={14} className="text-emerald-600" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                        <Star size={12} fill="currentColor" /> {listing.seller.rating ?? "4.9"}
                      </span>
                      <span>•</span>
                      <span>{listing.seller.totalTransactions ?? 12} Terjual</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Escrow Guarantee Box */}
              <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Lock size={13} className="text-emerald-600" />
                  Jaminan Transaksi RekberGG:
                </div>
                <ul className="space-y-1.5 pl-5 list-disc text-[11px] text-slate-500">
                  <li>Dana aman di escrow admin sampai akun diterima</li>
                  <li>Panduan ganti email & 2FA aman</li>
                  <li>Refund 100% jika data akun tidak sesuai</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
