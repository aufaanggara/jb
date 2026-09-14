"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  CheckCircle2,
  Wallet,
  ShieldCheck,
  Search,
  ArrowRight,
  Clock,
  AlertCircle,
  Gamepad2,
  ExternalLink,
  MessageSquare,
  KeyRound,
  Sparkles,
  Heart,
  Printer,
  Eye,
  EyeOff,
  Copy,
  Check,
  X,
  Lock,
  Flame,
} from "lucide-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/Button";
import { InvoiceModal } from "@/components/dashboard/InvoiceModal";
import { dummyTransactions, dummyListings } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";
import type { Transaction } from "@/types";

type FilterTab = "ALL" | "ACTION_NEEDED" | "IN_PROGRESS" | "COMPLETED" | "WISHLIST";

export default function BuyerDashboardPage() {
  const [filter, setFilter] = useState<FilterTab>("ALL");
  const [selectedInvoiceTx, setSelectedInvoiceTx] = useState<Transaction | null>(null);
  const [claimModalTx, setClaimModalTx] = useState<Transaction | null>(null);
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Vault credentials state
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(["lst_1", "lst_2"]);

  const active = dummyTransactions.filter((t) => !["COMPLETED", "CANCELLED"].includes(t.status));
  const completed = dummyTransactions.filter((t) => t.status === "COMPLETED");
  const totalSpent = dummyTransactions.reduce((sum, t) => sum + t.price, 0);

  // Filter logic
  const filteredTransactions = dummyTransactions.filter((t) => {
    if (filter === "ALL") return true;
    if (filter === "ACTION_NEEDED")
      return t.status === "PENDING_PAYMENT" || t.status === "PENDING_BUYER_CONFIRM";
    if (filter === "IN_PROGRESS")
      return !["COMPLETED", "CANCELLED", "PENDING_PAYMENT"].includes(t.status);
    if (filter === "COMPLETED") return t.status === "COMPLETED";
    return true;
  });

  const actionRequiredCount = dummyTransactions.filter(
    (t) => t.status === "PENDING_PAYMENT" || t.status === "PENDING_BUYER_CONFIRM"
  ).length;

  const wishlistListings = dummyListings.filter((l) => wishlistIds.includes(l.id));

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClaimSuccess(true);
    setTimeout(() => {
      setClaimSuccess(false);
      setClaimModalTx(null);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="buyer" />

      <div className="flex-1 space-y-6">
        {/* Welcome & Wallet Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-6 sm:p-8 text-white shadow-lg">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-md mb-3">
                <Sparkles size={13} className="text-yellow-300" />
                <span>Portal Pembeli Terverifikasi</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Selamat Datang, Dimas! 👋
              </h1>
              <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl">
                Setiap transaksi akun game kamu 100% diproteksi sistem Escrow RekberGG dan diawasi Admin berlisensi resmi.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/listings">
                <Button className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md border-0">
                  <Gamepad2 size={15} className="mr-1.5" />
                  Eksplor Akun Game
                </Button>
              </Link>
              <Link href="/tentang-kami">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/15 font-semibold text-xs">
                  <ShieldCheck size={15} className="mr-1.5 text-blue-200" />
                  Panduan Garansi
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Transaksi Aktif</p>
              <p className="text-2xl font-black text-slate-800 mt-0.5">{active.length}</p>
              <span className="text-[11px] text-blue-600 font-medium mt-1 inline-block">Sedang Berjalan</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingCart size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Perlu Tindakan</p>
              <p className="text-2xl font-black text-amber-600 mt-0.5">{actionRequiredCount}</p>
              <span className="text-[11px] text-amber-600 font-medium mt-1 inline-block">Bayar / Konfirmasi</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Transaksi Selesai</p>
              <p className="text-2xl font-black text-emerald-600 mt-0.5">{completed.length}</p>
              <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">Garansi 48 Jam</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Akun Disimpan</p>
              <p className="text-2xl font-black text-rose-600 mt-0.5">{wishlistIds.length}</p>
              <span className="text-[11px] text-rose-500 font-medium mt-1 inline-block">Wishlist Incaran</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart size={22} />
            </div>
          </div>
        </div>

        {/* Quick Credentials Vault Widget (Brankas Akun Siap Pakai) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-5 border border-slate-700 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                <KeyRound size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">Brankas Data Akun Game (Akses Cepat)</h3>
                <p className="text-xs text-slate-400">Akun eFootball Divisi 1 (Diamond) • Pesanan #tx_3</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck size={11} /> 100% Nominus Bersih
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 pt-4 text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Metode Login / ID</span>
                <span className="font-bold text-white">Konami ID: rian_pro@game.id</span>
              </div>
              <button
                onClick={() => handleCopy("rian_pro@game.id", "id")}
                className="text-slate-400 hover:text-white p-1"
                title="Salin ID"
              >
                {copiedField === "id" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Password Game</span>
                <span className="font-mono font-bold text-white">
                  {showPassword ? "EfootBall#2026Secure!" : "••••••••••••••••"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-white p-1"
                  title="Lihat Password"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button
                  onClick={() => handleCopy("EfootBall#2026Secure!", "pwd")}
                  className="text-slate-400 hover:text-white p-1"
                  title="Salin Password"
                >
                  {copiedField === "pwd" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Status 2FA Cadangan</span>
                <span className="font-bold text-emerald-400">Siap Bind ke Email Buyer</span>
              </div>
              <Link href="/buyer/transactions/tx_3">
                <Button size="sm" variant="ghost" className="text-[11px] text-blue-300 hover:text-white p-1 h-auto">
                  Detail →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Tabs & Navigation */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {filter === "WISHLIST" ? "Daftar Akun Game Disimpan (Wishlist)" : "Daftar Transaksi Pembelian"}
              </h2>
              <p className="text-xs text-slate-400">
                {filter === "WISHLIST"
                  ? "Bandingkan akun game incaran dan lakukan checkout langsung lewat rekber resmi."
                  : "Kelola status pesanan, klaim garansi, dan cetak struk pembayaran resmi."}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl self-start sm:self-auto overflow-x-auto">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filter === "ALL" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Semua ({dummyTransactions.length})
              </button>
              <button
                onClick={() => setFilter("ACTION_NEEDED")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filter === "ACTION_NEEDED" ? "bg-white text-amber-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Perlu Tindakan ({actionRequiredCount})
              </button>
              <button
                onClick={() => setFilter("IN_PROGRESS")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filter === "IN_PROGRESS" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Diproses
              </button>
              <button
                onClick={() => setFilter("COMPLETED")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filter === "COMPLETED" ? "bg-white text-emerald-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Selesai ({completed.length})
              </button>
              <button
                onClick={() => setFilter("WISHLIST")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                  filter === "WISHLIST" ? "bg-white text-rose-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Heart size={12} /> Wishlist ({wishlistIds.length})
              </button>
            </div>
          </div>

          {/* Wishlist View Mode */}
          {filter === "WISHLIST" ? (
            <div className="p-4 sm:p-6 space-y-3">
              {wishlistListings.map((l) => (
                <div
                  key={l.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-white"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {l.game}
                      </span>
                      <span className="text-xs text-slate-400">Penjual: {l.seller.username} • 4.8★</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">{l.title}</h4>
                    <p className="font-black text-slate-900 text-sm">{formatRupiah(l.price)}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => setWishlistIds(wishlistIds.filter((id) => id !== l.id))}
                      className="text-xs text-rose-500 hover:text-rose-700 font-semibold px-2 py-1"
                    >
                      Hapus
                    </button>
                    <Link href={`/listings/${l.id}`}>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">
                        Beli Lewat Rekber
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}

              {wishlistListings.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-xs">
                  Belum ada akun game yang disimpan di wishlist.
                </div>
              )}
            </div>
          ) : (
            /* Transactions List */
            <div className="p-4 sm:p-6 space-y-4">
              {filteredTransactions.map((t) => {
                const doneSteps = t.timeline.filter((s) => s.done).length;
                const progressPct = Math.round((doneSteps / t.timeline.length) * 100);
                const isActionRequired =
                  t.status === "PENDING_PAYMENT" || t.status === "PENDING_BUYER_CONFIRM";
                const isCompleted = t.status === "COMPLETED";

                return (
                  <div
                    key={t.id}
                    className={`rounded-2xl border p-4 sm:p-5 transition-all hover:shadow-md ${
                      isActionRequired
                        ? "border-amber-300/80 bg-amber-50/20"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          <Gamepad2 size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">
                              {t.listing.game}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">#{t.id.slice(-6)}</span>

                            {/* Live Warranty Countdown on Completed Transactions */}
                            {isCompleted && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1 animate-pulse">
                                <ShieldCheck size={11} /> Sisa Garansi: 46 Jam 20 Mnt
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                            {t.listing.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                            <span>
                              Penjual: <strong className="text-slate-700">{t.listing.seller.username}</strong>
                            </span>
                            <span>•</span>
                            <span>
                              Admin Rekber: <strong className="text-blue-600">{t.admin.user.username}</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-2">
                        <div className="text-base sm:text-lg font-black text-slate-900">
                          {formatRupiah(t.price)}
                        </div>
                        <StatusBadge status={t.status} />
                      </div>
                    </div>

                    {/* Progress Tracker Bar */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-slate-600">
                          Status Alur Escrow:{" "}
                          <span className="text-blue-600 font-bold">
                            Step {doneSteps} dari {t.timeline.length} ({progressPct}%)
                          </span>
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          {new Date(t.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isCompleted
                              ? "bg-emerald-500"
                              : isActionRequired
                              ? "bg-amber-500"
                              : "bg-blue-600"
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons & Invoice Trigger */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span>Garansi dana aman di escrow sampai data login aman 100%.</span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Printable Official Invoice Modal Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInvoiceTx(t)}
                          className="text-xs font-semibold text-slate-700 hover:text-blue-600"
                        >
                          <Printer size={13} className="mr-1.5" />
                          Struk Resmi
                        </Button>

                        {/* Claim Warranty Button for Completed Transactions */}
                        {isCompleted && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setClaimModalTx(t)}
                            className="text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200"
                          >
                            <AlertCircle size={13} className="mr-1.5 text-amber-600" />
                            Klaim Garansi
                          </Button>
                        )}

                        <Link href={`/buyer/transactions/${t.id}`}>
                          <Button
                            size="sm"
                            className={`text-xs font-bold ${
                              t.status === "PENDING_PAYMENT"
                                ? "bg-amber-600 hover:bg-amber-700 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                          >
                            <MessageSquare size={13} className="mr-1.5" />
                            {t.status === "PENDING_PAYMENT"
                              ? "Bayar & Buka Chat"
                              : t.status === "PENDING_BUYER_CONFIRM"
                              ? "Cek Akun & Konfirmasi"
                              : "Buka Room Transaksi"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoiceTx && (
        <InvoiceModal
          transaction={selectedInvoiceTx}
          onClose={() => setSelectedInvoiceTx(null)}
        />
      )}

      {/* Modal Klaim Garansi Akun */}
      {claimModalTx && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setClaimModalTx(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Klaim Garansi Anti-Hackback</h3>
                <p className="text-xs text-slate-400">Transaksi #{claimModalTx.id.slice(-6)}</p>
              </div>
            </div>

            {claimSuccess ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Klaim Garansi Diajukan!</h4>
                <p className="text-xs text-slate-500">
                  Admin Rekber {claimModalTx.admin.user.username} akan segera menghubungi Anda di room transaksi untuk investigasi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilih Kendala Akun</label>
                  <select className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
                    <option>Akun di-hackback / password berubah tiba-tiba</option>
                    <option>Email pertama tidak bisa diganti (masih terkait no HP seller)</option>
                    <option>Spesifikasi pemain / koin tidak sesuai deskripsi iklan</option>
                    <option>Akun terkena sanksi suspend / banned</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Deskripsi Detail Masalah</label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan secara rinci kronologi kendala yang kamu alami..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2">
                    Kirim Laporan Garansi ke Admin
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
