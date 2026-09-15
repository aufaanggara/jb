import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/Button";
import { dummyTransactions } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";
import { Gamepad2, MessageSquare, ShieldCheck } from "lucide-react";

export default function BuyerTransactionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="buyer" />
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Riwayat Transaksi Pembelian</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Daftar lengkap akun game yang pernah atau sedang kamu beli melalui sistem Escrow Rekberin.
          </p>
        </div>

        <div className="space-y-3">
          {dummyTransactions.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                      {t.listing.game}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">#{t.id.slice(-6)}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t.listing.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(t.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    • Penjual: <span className="font-semibold text-slate-700">{t.listing.seller.username}</span> • Admin:{" "}
                    <span className="font-semibold text-blue-600">{t.admin.user.username}</span>
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                <div className="text-base sm:text-lg font-black text-slate-900">
                  {formatRupiah(t.price)}
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={t.status} />
                  <Link href={`/buyer/transactions/${t.id}`}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">
                      <MessageSquare size={13} className="mr-1.5" />
                      Detail & Chat
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
