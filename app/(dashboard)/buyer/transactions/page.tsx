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
            <Card key={t.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t.listing.title}</p>
                <p className="text-xs text-txt-muted">{new Date(t.createdAt).toLocaleDateString("id-ID")} · {formatRupiah(t.price)}</p>
              </div>
              <StatusBadge status={t.status} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
