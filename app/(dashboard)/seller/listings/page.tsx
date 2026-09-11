import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { dummyListings } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";

export default function SellerListingsPage() {
  const mine = dummyListings.filter((l) => l.seller.username === "efootball_seller1");
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="seller" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold">Kelola Listing</h1>
          <Link href="/seller/listings/new"><Button>Buat Listing Baru</Button></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-txt-muted text-xs uppercase tracking-wider text-left border-b border-border">
                <th className="py-3 pr-4">Judul</th>
                <th className="py-3 pr-4">Harga</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Views</th>
                <th className="py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mine.map((l) => (
                <tr key={l.id} className="border-b border-border/50">
                  <td className="py-3 pr-4">{l.title}</td>
                  <td className="py-3 pr-4">{formatRupiah(l.price)}</td>
                  <td className="py-3 pr-4">
                    <span className={l.status === "AVAILABLE" ? "text-accent-success" : "text-accent-danger"}>
                      {l.status === "AVAILABLE" ? "Aktif" : "Terjual"}
                    </span>
                  </td>
                  <td className="py-3 pr-4">{l.viewCount}</td>
                  <td className="py-3 flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Nonaktifkan</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
