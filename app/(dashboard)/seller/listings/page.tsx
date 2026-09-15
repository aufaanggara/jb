import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/Button";
import { dummyListings } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";
import { PlusCircle, Eye, ExternalLink } from "lucide-react";

export default function SellerListingsPage() {
  const mine = dummyListings.filter((l) => l.seller.username === "efootball_seller1");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="seller" />
      <div className="flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Kelola Listing Game</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Daftar seluruh iklan akun game yang kamu tawarkan di marketplace Rekberin.
            </p>
          </div>
          <Link href="/seller/listings/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
              <PlusCircle size={15} className="mr-1.5" />
              Buat Listing Baru
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider text-left">
                  <th className="py-3 px-4">Game</th>
                  <th className="py-3 px-4">Judul Listing</th>
                  <th className="py-3 px-4">Harga</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mine.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-blue-600">
                      {l.game}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800 max-w-[240px] truncate">
                      {l.title}
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {formatRupiah(l.price)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded ${
                          l.status === "AVAILABLE"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {l.status === "AVAILABLE" ? "Aktif (Dijual)" : "Terjual (Sold)"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Eye size={13} className="text-slate-400" /> {l.viewCount}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <Link href={`/listings/${l.id}`}>
                        <Button variant="outline" size="sm" className="text-[11px] font-semibold">
                          Lihat
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
