import Link from "next/link";
import { Package, CheckCircle2, Wallet, Star } from "lucide-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { dummyListings } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";

export default function SellerDashboardPage() {
  const mine = dummyListings.filter((l) => l.seller.username === "efootball_seller1");
  const active = mine.filter((l) => l.status === "AVAILABLE");
  const sold = mine.filter((l) => l.status === "SOLD");
  const revenue = sold.reduce((sum, l) => sum + l.price, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="seller" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold">Dashboard Seller</h1>
          <Link href="/seller/listings/new"><Button>Buat Listing Baru</Button></Link>
        </div>

        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <StatsCard label="Listing Aktif" value={active.length} icon={Package} />
          <StatsCard label="Listing Terjual" value={sold.length} icon={CheckCircle2} accent="success" />
          <StatsCard label="Total Pendapatan" value={formatRupiah(revenue)} icon={Wallet} accent="gold" />
          <StatsCard label="Rating Rata-rata" value="4.8★" icon={Star} accent="warning" />
        </div>

        <h2 className="font-semibold mb-4">Listing Saya</h2>
        <div className="space-y-3">
          {mine.map((l) => (
            <Card key={l.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{l.title}</p>
                <p className="text-xs text-txt-muted">{formatRupiah(l.price)} · {l.viewCount} views</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${l.status === "AVAILABLE" ? "text-accent-success" : "text-accent-danger"}`}>
                  {l.status === "AVAILABLE" ? "Aktif" : "Terjual"}
                </span>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
