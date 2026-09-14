import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/Button";
import { dummyTransactions } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";
import { Gamepad2, MessageSquare, ShieldCheck, User } from "lucide-react";

export default function SellerTransactionsPage() {
  const sellerTransactions = dummyTransactions;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="seller" />
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Transaksi Penjualan Toko</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola proses serah terima akun game dengan pembeli dan pantau pelepasan dana oleh admin rekber.
          </p>
        </div>

        <div className="space-y-3">
          {sellerTransactions.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {t.listing.game}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">#{t.id.slice(-6)}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t.listing.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Pembeli: <span className="font-semibold text-slate-800">{t.buyer.username}</span> • Admin Escrow:{" "}
                    <span className="font-semibold text-emerald-700">{t.admin.user.username}</span>
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                <div className="text-base sm:text-lg font-black text-slate-900">
                  {formatRupiah(t.price)}
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={t.status} />
                  <Link href={`/seller/transactions/${t.id}`}>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">
                      <MessageSquare size={13} className="mr-1.5" />
                      Detail & Chat Room
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
