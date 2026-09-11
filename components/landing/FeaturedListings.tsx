import Link from "next/link";
import { dummyListings } from "@/data/dummy";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { Sparkles, ArrowRight } from "lucide-react";

export function FeaturedListings() {
  const featured = dummyListings.filter((l) => l.isFeatured).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1.5">
            <Sparkles size={14} /> Pilihan Editor
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Akun Game Populer Minggu Ini
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Akun dengan squad pilihan, login aman (Konami ID/Moonton ready), dan rating penjual tinggi.
          </p>
        </div>

        <Link
          href="/listings"
          className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors group self-start sm:self-auto"
        >
          <span>Lihat Semua Akun</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featured.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </section>
  );
}
