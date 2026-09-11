import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { dummyTransactions } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";

export default function AdminTransactionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="admin" />
      <div className="flex-1">
        <h1 className="font-display text-2xl font-bold mb-6">Daftar Transaksi</h1>
        <div className="overflow-x-auto glass-card rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-txt-muted text-xs uppercase tracking-wider text-left border-b border-border">
                <th className="py-3 pl-5 pr-4">ID</th>
                <th className="py-3 pr-4">Buyer</th>
                <th className="py-3 pr-4">Listing</th>
                <th className="py-3 pr-4">Harga</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-5">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {dummyTransactions.map((t) => (
                <tr key={t.id} className="border-b border-border/50 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-3 pl-5 pr-4">
                    <Link href={`/admin/transactions/${t.id}`} className="text-accent-primary font-medium">
                      #{t.id.slice(-4)}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">{t.buyer.username}</td>
                  <td className="py-3 pr-4 max-w-[200px] truncate">{t.listing.title}</td>
                  <td className="py-3 pr-4">{formatRupiah(t.price)}</td>
                  <td className="py-3 pr-4"><StatusBadge status={t.status} /></td>
                  <td className="py-3 pr-5 text-txt-muted">{new Date(t.createdAt).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
