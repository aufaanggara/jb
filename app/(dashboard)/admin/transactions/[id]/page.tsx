import { notFound } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { TransactionTimeline } from "@/components/dashboard/TransactionTimeline";
import { Avatar } from "@/components/ui/Avatar";
import { dummyTransactions } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";
import { ActionPanel } from "./ActionPanel";

export default function AdminTransactionDetailPage({ params }: { params: { id: string } }) {
  const t = dummyTransactions.find((tx) => tx.id === params.id);
  if (!t) return notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="admin" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold">Transaksi #{t.id.slice(-4)}</h1>
            <p className="text-txt-muted text-sm">{new Date(t.createdAt).toLocaleString("id-ID")}</p>
          </div>
          <StatusBadge status={t.status} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel kiri: info transaksi */}
          <Card>
            <h3 className="font-semibold mb-4">Info Transaksi</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-txt-muted text-xs mb-1">Listing</p>
                <p className="font-medium">{t.listing.title}</p>
                <p className="text-txt-secondary">{formatRupiah(t.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Avatar name={t.buyer.fullName} size={36} />
                <div>
                  <p className="text-txt-muted text-xs">Buyer</p>
                  <p className="font-medium">{t.buyer.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar name={t.listing.seller.fullName} size={36} />
                <div>
                  <p className="text-txt-muted text-xs">Seller (tujuan pencairan)</p>
                  <p className="font-medium">{t.listing.seller.username}</p>
                </div>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-txt-muted">Fee Platform</span>
                <span>{formatRupiah(t.platformFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-txt-muted">Fee Admin</span>
                <span>{formatRupiah(t.adminFee)}</span>
              </div>
            </div>
          </Card>

          {/* Panel tengah: timeline & checklist */}
          <Card>
            <h3 className="font-semibold mb-4">Timeline</h3>
            <TransactionTimeline steps={t.timeline} />

            <h3 className="font-semibold mt-6 mb-3">Checklist Serah Terima</h3>
            <div className="space-y-2">
              {t.checklist.map((c, i) => (
                <label key={i} className="flex items-center gap-2 text-sm text-txt-secondary">
                  <input type="checkbox" defaultChecked={c.checked} className="accent-accent-primary" />
                  {c.label}
                </label>
              ))}
            </div>

            <div className="mt-5">
              <p className="text-xs text-txt-muted uppercase tracking-wider mb-2">Catatan Komunikasi</p>
              <textarea
                rows={3}
                placeholder="Catat komunikasi penting dengan buyer/seller di sini..."
                className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary"
              />
            </div>
          </Card>

          {/* Panel kanan: aksi admin */}
          <Card>
            <h3 className="font-semibold mb-4">Aksi</h3>
            <ActionPanel status={t.status} />
          </Card>
        </div>
      </div>
    </div>
  );
}
