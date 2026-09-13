import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { dummyTransactions } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";

export default function BuyerTransactionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="buyer" />
      <div className="flex-1">
        <h1 className="font-display text-2xl font-bold mb-6">Riwayat Transaksi</h1>
        <div className="space-y-3">
          {dummyTransactions.map((t) => (
            <Card key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-medium">{t.listing.title}</p>
                <p className="text-xs text-txt-muted">
                  {new Date(t.createdAt).toLocaleDateString("id-ID")} · {formatRupiah(t.price)} · Admin: {t.admin.user.username}
                </p>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <StatusBadge status={t.status} />
                <a
                  href={`/buyer/transactions/${t.id}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Detail & Chat
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
