import { ShoppingCart, CheckCircle2, Wallet } from "lucide-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { dummyTransactions } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";

const actionByStatus: Record<string, string> = {
  PENDING_PAYMENT: "Upload Bukti Transfer",
  PENDING_BUYER_CONFIRM: "Konfirmasi Akun Diterima",
};

export default function BuyerDashboardPage() {
  const active = dummyTransactions.filter((t) => !["COMPLETED", "CANCELLED"].includes(t.status));
  const completed = dummyTransactions.filter((t) => t.status === "COMPLETED");
  const totalSpent = dummyTransactions.reduce((sum, t) => sum + t.price, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="buyer" />
      <div className="flex-1">
        <h1 className="font-display text-2xl font-bold mb-6">Dashboard Buyer</h1>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <StatsCard label="Transaksi Aktif" value={active.length} icon={ShoppingCart} />
          <StatsCard label="Transaksi Selesai" value={completed.length} icon={CheckCircle2} accent="success" />
          <StatsCard label="Total Pembelian" value={formatRupiah(totalSpent)} icon={Wallet} accent="gold" />
        </div>

        <h2 className="font-semibold mb-4">Transaksi Aktif</h2>
        <div className="space-y-4">
          {active.map((t) => {
            const doneSteps = t.timeline.filter((s) => s.done).length;
            return (
              <Card key={t.id}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium">{t.listing.title}</p>
                    <p className="text-xs text-txt-muted">via {t.admin.user.username} · {formatRupiah(t.price)}</p>
                  </div>
                  <StatusBadge status={t.status} />
                </div>
                <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden mb-3">
                  <div
                    className="h-full bg-accent-primary transition-all"
                    style={{ width: `${(doneSteps / t.timeline.length) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-txt-muted">Step {doneSteps}/{t.timeline.length}</span>
                  {actionByStatus[t.status] && <Button size="sm">{actionByStatus[t.status]}</Button>}
                </div>
              </Card>
            );
          })}
          {active.length === 0 && <p className="text-txt-secondary text-sm">Tidak ada transaksi aktif.</p>}
        </div>
      </div>
    </div>
  );
}
