"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  CheckCircle2,
  Wallet,
  Star,
  PlusCircle,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Eye,
  Store,
  ShieldCheck,
  AlertCircle,
  DollarSign,
  Share2,
  ExternalLink,
  Building,
  Check,
  X,
  PauseCircle,
  PlayCircle,
  MessageCircle,
  MessageSquare,
  Send,
  History,
  FileText,
} from "lucide-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/Button";
import { dummyListings, dummyTransactions } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";
import { useStore } from "@/store/useStore";

interface WithdrawalRecord {
  id: string;
  date: string;
  amount: number;
  bank: string;
  accountNumber: string;
  status: "SUCCESS" | "PROCESSING";
}

const initialWithdrawals: WithdrawalRecord[] = [
  {
    id: "WD-9941",
    date: "12 Sep 2026, 14:20 WIB",
    amount: 1500000,
    bank: "BCA",
    accountNumber: "8920192819",
    status: "SUCCESS",
  },
  {
    id: "WD-9812",
    date: "28 Agu 2026, 19:45 WIB",
    amount: 950000,
    bank: "GoPay",
    accountNumber: "081234567890",
    status: "SUCCESS",
  },
];

interface Inquiry {
  id: string;
  listingId: string;
  transactionId?: string;
  listingTitle: string;
  buyerName: string;
  question: string;
  time: string;
  replied?: boolean;
}

const initialInquiries: Inquiry[] = [
  {
    id: "inq_1",
    listingId: "1",
    transactionId: "tx_1",
    listingTitle: "Akun Diamond League 89 OVR Full Squad Legend",
    buyerName: "Dimas Anggara",
    question: "Halo gan, Konami ID nya apakah bisa langsung diganti ke email baru saya saat transaksi rekber?",
    time: "15 mnt lalu",
    replied: false,
  },
  {
    id: "inq_2",
    listingId: "2",
    transactionId: "tx_2",
    listingTitle: "Akun eFootball Divisi 1",
    buyerName: "Rizky_Gamer",
    question: "Ada Big Time Haaland atau Messi 2022 gan di akun ini?",
    time: "1 jam lalu",
    replied: true,
  },
];

export default function SellerDashboardPage() {
  const [listingFilter, setListingFilter] = useState<"ALL" | "AVAILABLE" | "SOLD">("ALL");
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [selectedBank, setSelectedBank] = useState("BCA");
  const [withdrawAmountInput, setWithdrawAmountInput] = useState("2.450.000");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic listings state for live Pause/Resume toggling
  const initialMine = dummyListings.filter((l) => l.seller.username === "efootball_seller1");
  const [myListings, setMyListings] = useState(
    initialMine.map((l) => ({ ...l, isPaused: false }))
  );

  // Withdrawals history state
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>(initialWithdrawals);
  const [showWithdrawHistory, setShowWithdrawHistory] = useState(false);

  // Inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [replyInput, setReplyInput] = useState<{ [id: string]: string }>({});

  const activeListings = myListings.filter((l) => l.status === "AVAILABLE" && !l.isPaused);
  const soldListings = myListings.filter((l) => l.status === "SOLD");

  // Active escrow orders where seller is involved
  const activeOrders = dummyTransactions.filter(
    (t) => !["COMPLETED", "CANCELLED"].includes(t.status)
  );

  const filteredListings = myListings.filter((l) => {
    if (listingFilter === "ALL") return true;
    return l.status === listingFilter;
  });

  const handleCopy = (id: string) => {
    navigator.clipboard?.writeText(window.location.origin + `/listings/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTogglePause = (id: string) => {
    setMyListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPaused: !item.isPaused } : item))
    );
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: WithdrawalRecord = {
      id: `WD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB",
      amount: 2450000,
      bank: selectedBank,
      accountNumber: "8920192819",
      status: "PROCESSING",
    };

    setWithdrawals([newRecord, ...withdrawals]);
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setIsWithdrawModalOpen(false);
    }, 2000);
  };

  const { addChatMessage } = useStore();

  const handleSendReply = (inqId: string) => {
    const text = replyInput[inqId]?.trim();
    if (!text) return;

    const targetInq = inquiries.find((i) => i.id === inqId);
    if (targetInq?.transactionId) {
      addChatMessage(
        targetInq.transactionId,
        "SELLER",
        "Rian Pratama",
        `[Dari Diskusi Listing]: ${text}`,
        undefined,
        undefined,
        true
      );
    }

    setInquiries((prev) =>
      prev.map((inq) => (inq.id === inqId ? { ...inq, replied: true } : inq))
    );
    setReplyInput((prev) => ({ ...prev, [inqId]: "" }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="seller" />

      <div className="flex-1 space-y-6">
        {/* Seller Banner & Revenue Center */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-6 sm:p-8 text-white shadow-lg">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold backdrop-blur-md mb-3">
                <Store size={13} className="text-emerald-200" />
                <span>Star Seller Terverifikasi • 4.8★ (42 Transaksi)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Dashboard Toko: Rian Pratama
              </h1>
              <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
                Kelola penjualan akun game, pantau pelepasan dana rekber, dan tarik saldo langsung ke rekening bankmu.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs shadow-md border-0"
              >
                <ArrowUpRight size={15} className="mr-1.5" />
                Tarik Saldo
              </Button>
              <Link href="/seller/listings/new">
                <Button className="bg-emerald-900/80 hover:bg-emerald-950 text-white font-bold text-xs border border-emerald-400/40">
                  <PlusCircle size={15} className="mr-1.5" />
                  + Pasang Iklan Baru
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Financial & Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Saldo Siap Tarik</p>
              <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">Rp 2.450.000</p>
              <button
                onClick={() => setShowWithdrawHistory(!showWithdrawHistory)}
                className="text-[11px] text-emerald-700 font-bold mt-1 inline-flex items-center gap-1 hover:underline"
              >
                <History size={12} /> {showWithdrawHistory ? "Tutup Log" : "Lihat Log Penarikan"}
              </button>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Dana di Escrow</p>
              <p className="text-xl sm:text-2xl font-black text-amber-600 mt-0.5">Rp 850.000</p>
              <span className="text-[11px] text-amber-600 font-medium mt-1 inline-block">Menunggu Konfirmasi</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Listing Aktif</p>
              <p className="text-2xl font-black text-slate-800 mt-0.5">{activeListings.length}</p>
              <span className="text-[11px] text-blue-600 font-medium mt-1 inline-block">Tayang di Marketplace</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pertanyaan Masuk</p>
              <p className="text-2xl font-black text-slate-800 mt-0.5">{inquiries.filter(i => !i.replied).length}</p>
              <span className="text-[11px] text-purple-600 font-medium mt-1 inline-block">Butuh Dibalas</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageCircle size={22} />
            </div>
          </div>
        </div>

        {/* Withdrawal History Log (Riwayat Penarikan Dana) */}
        {showWithdrawHistory && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History size={16} className="text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">Riwayat Penarikan Saldo Toko</h3>
              </div>
              <button
                onClick={() => setShowWithdrawHistory(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Tutup
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-left bg-slate-50">
                    <th className="py-2.5 px-3">ID Penarikan</th>
                    <th className="py-2.5 px-3">Waktu</th>
                    <th className="py-2.5 px-3">Tujuan Transfer</th>
                    <th className="py-2.5 px-3">Nominal</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {withdrawals.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-3 font-mono font-bold text-slate-800">{w.id}</td>
                      <td className="py-3 px-3 text-slate-500">{w.date}</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-800">{w.bank}</span>{" "}
                        <span className="text-slate-400">({w.accountNumber})</span>
                      </td>
                      <td className="py-3 px-3 font-black text-slate-900">{formatRupiah(w.amount)}</td>
                      <td className="py-3 px-3 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            w.status === "SUCCESS"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {w.status === "SUCCESS" ? "Berhasil" : "Sedang Diproses"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Inquiries Box (Kotak Masuk Pertanyaan Calon Pembeli) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-purple-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Pertanyaan Calon Pembeli (Diskusi Akun)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Tanggapi cepat untuk menaikkan reputasi toko
            </span>
          </div>

          <div className="space-y-3">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-900">{inq.buyerName}</span>
                    <span className="text-slate-400">• {inq.time}</span>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded">
                    {inq.listingTitle}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{inq.question}</p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/listings/${inq.listingId}`}
                      className="text-[11px] text-slate-500 hover:text-blue-600 inline-flex items-center gap-1 font-semibold transition-colors"
                    >
                      <Eye size={12} /> Lihat Postingan
                    </Link>
                    <span className="text-slate-300">•</span>
                    <Link
                      href={`/seller/transactions/${inq.transactionId || "tx_1"}`}
                      className="text-[11px] bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg inline-flex items-center gap-1 transition-colors"
                    >
                      <MessageSquare size={12} /> Lanjut di Room Chat Rekber →
                    </Link>
                  </div>
                </div>

                {inq.replied ? (
                  <div className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 size={13} /> Telah dijawab ke pembeli
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Ketik balasan cepat untuk calon pembeli..."
                      value={replyInput[inq.id] || ""}
                      onChange={(e) =>
                        setReplyInput({ ...replyInput, [inq.id]: e.target.value })
                      }
                      className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-emerald-600"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSendReply(inq.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 h-auto font-bold"
                    >
                      <Send size={12} className="mr-1" /> Balas
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Incoming Escrow Orders Alert */}
        {activeOrders.length > 0 && (
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Pesanan & Serah Terima yang Sedang Berjalan
                </h3>
              </div>
              <Link href="/seller/transactions">
                <span className="text-xs text-emerald-600 hover:text-emerald-700 font-bold">
                  Lihat Semua Pesanan →
                </span>
              </Link>
            </div>

            <div className="space-y-3">
              {activeOrders.slice(0, 2).map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {order.listing.game}
                      </span>
                      <p className="font-bold text-slate-800 text-sm">{order.listing.title}</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Pembeli: <strong>{order.buyer.username}</strong> • Escrow Admin:{" "}
                      <strong>{order.admin.user.username}</strong> • Nilai:{" "}
                      <strong>{formatRupiah(order.price)}</strong>
                    </p>
                  </div>
                  <Link href={`/seller/transactions/${order.id}`}>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                      Buka Room Serah Terima
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Listing Management Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Kelola Katalog Iklan Saya</h2>
              <p className="text-xs text-slate-400">
                Gunakan tombol Jeda/Aktifkan untuk menyembunyikan iklan sementara tanpa menghapusnya.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl">
              <button
                onClick={() => setListingFilter("ALL")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  listingFilter === "ALL"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Semua ({myListings.length})
              </button>
              <button
                onClick={() => setListingFilter("AVAILABLE")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  listingFilter === "AVAILABLE"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Dijual ({activeListings.length})
              </button>
              <button
                onClick={() => setListingFilter("SOLD")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  listingFilter === "SOLD"
                    ? "bg-white text-slate-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Terjual ({soldListings.length})
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-3">
            {filteredListings.map((l) => (
              <div
                key={l.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                  l.isPaused
                    ? "bg-slate-50 border-dashed border-slate-300 opacity-75"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-xs bg-white"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/50">
                      {l.game}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        l.isPaused
                          ? "bg-amber-100 text-amber-800"
                          : l.status === "AVAILABLE"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {l.isPaused ? "Dijeda Sementara" : l.status === "AVAILABLE" ? "Aktif (Dijual)" : "Terjual (Sold)"}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base">{l.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="font-black text-slate-900 text-sm">{formatRupiah(l.price)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye size={13} /> {l.viewCount} Dilihat
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
                  {/* Quick Toggle Pause/Resume */}
                  {l.status === "AVAILABLE" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePause(l.id)}
                      className="text-xs"
                    >
                      {l.isPaused ? (
                        <>
                          <PlayCircle size={13} className="mr-1 text-emerald-600" /> Aktifkan
                        </>
                      ) : (
                        <>
                          <PauseCircle size={13} className="mr-1 text-amber-600" /> Jeda Iklan
                        </>
                      )}
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(l.id)}
                    className="text-xs text-slate-600 hover:text-blue-600"
                  >
                    {copiedId === l.id ? (
                      <>
                        <Check size={13} className="mr-1 text-emerald-600" /> Tersalin
                      </>
                    ) : (
                      <>
                        <Share2 size={13} className="mr-1" /> Bagikan Link
                      </>
                    )}
                  </Button>
                  <Link href={`/listings/${l.id}`}>
                    <Button variant="secondary" size="sm" className="text-xs">
                      Lihat Iklan
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            {filteredListings.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                Tidak ada iklan pada kategori ini.
              </div>
            )}
          </div>
        </div>

        {/* Seller Security & Rules */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-2">
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>SOP & Aturan Penjualan Aman di Rekberin</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-600 mt-3">
            <div className="p-3 bg-white rounded-xl border border-slate-200/80">
              <strong className="text-slate-800 block mb-1">1. Wajib Lewat Admin Rekber</strong>
              Jangan pernah memberikan email atau password di luar chat rekber resmi agar terhindar dari modus transfer palsu.
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80">
              <strong className="text-slate-800 block mb-1">2. Siapkan Data Nominus</strong>
              Pastikan akun game tidak terkait dengan nomor telepon aktif pembeli lama dan email siap diganti secara bersih.
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80">
              <strong className="text-slate-800 block mb-1">3. Pencairan Dana Cepat</strong>
              Begitu buyer konfirmasi akun aman dan 2FA diganti, dana escrow otomatis diteruskan ke saldo seller tanpa hold berhari-hari.
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tarik Saldo (Simulasi Interaktif) */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsWithdrawModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Wallet size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Tarik Saldo Penjualan</h3>
                <p className="text-xs text-slate-400">Saldo tersedia: Rp 2.450.000</p>
              </div>
            </div>

            {withdrawSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check size={28} />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Permintaan Penarikan Berhasil!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Dana Rp 2.450.000 sedang diproses transfer ke rekening {selectedBank} milikmu (Estimasi 5-15 menit). Catatan telah masuk ke Riwayat Penarikan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Pilih Rekening Tujuan:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["BCA", "Mandiri", "GoPay", "DANA"].map((bank) => (
                      <button
                        type="button"
                        key={bank}
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                          selectedBank === bank
                            ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{bank}</span>
                        {selectedBank === bank && <Check size={14} className="text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nomor Rekening / E-Wallet:
                  </label>
                  <input
                    type="text"
                    defaultValue="8920192819"
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                    required
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Atas Nama: Rian Pratama</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Jumlah Penarikan (Rp):
                  </label>
                  <input
                    type="text"
                    value={withdrawAmountInput}
                    onChange={(e) => setWithdrawAmountInput(e.target.value)}
                    className="w-full text-xs font-black px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                    required
                  />
                  <span className="text-[11px] text-emerald-600 mt-1 block">Bebas biaya admin transfer</span>
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5">
                    Konfirmasi Penarikan Saldo
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
