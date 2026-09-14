import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/Button";
import { dummyTransactions } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";
import { MessageSquare, ShieldCheck } from "lucide-react";

export default function AdminTransactionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="admin" />
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Antrean Semua Transaksi Rekber</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau dan lakukan audit pada seluruh transaksi jual-beli akun game di RekberGG.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider text-left">
                  <th className="py-3 px-4">ID Transaksi</th>
                  <th className="py-3 px-4">Pembeli (Buyer)</th>
                  <th className="py-3 px-4">Akun Listing</th>
                  <th className="py-3 px-4">Harga</th>
                  <th className="py-3 px-4">Fee Admin</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dummyTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                      #{t.id.slice(-6)}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {t.buyer.username}
                    </td>
                    <td className="py-3.5 px-4 max-w-[220px] truncate text-slate-700 font-medium">
                      {t.listing.title}
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {formatRupiah(t.price)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">
                      {formatRupiah(t.adminFee)}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href={`/admin/transactions/${t.id}`}>
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold py-1 px-3"
                        >
                          <MessageSquare size={12} className="mr-1" />
                          Buka Mediasi
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
