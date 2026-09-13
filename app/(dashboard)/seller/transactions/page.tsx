import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { dummyTransactions } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";

export default function SellerTransactionsPage() {
  // Filter transactions where seller is seller1 or seller2
  const sellerTransactions = dummyTransactions;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="seller" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold">Transaksi Penjualan</h1>
            <p className="text-txt-muted text-sm">Kelola proses serah terima akun dengan pembeli & admin rekber</p>
          </div>
        </div>

        <div className="space-y-3">
          {sellerTransactions.map((t) => (
            <Card key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-medium">{t.listing.title}</p>
                <p className="text-xs text-txt-muted">
                  Pembeli: <span className="font-semibold text-slate-800">{t.buyer.username}</span> · {formatRupiah(t.price)} · Admin Escrow: {t.admin.user.username}
                </p>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <StatusBadge status={t.status} />
                <Link
                  href={`/seller/transactions/${t.id}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  Detail & Chat Room
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
