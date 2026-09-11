import Link from "next/link";
import { dummyAdmins } from "@/data/dummy";
import { AdminCard } from "@/components/marketplace/AdminCard";
import { Trophy, ArrowRight } from "lucide-react";

export function TopAdmins() {
  const top = [...dummyAdmins].sort((a, b) => b.trustScore - a.trustScore).slice(0, 3);

  return (
    <section className="bg-slate-50 border-y border-slate-200 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1.5">
              <Trophy size={14} className="text-amber-500" /> Admin Terverifikasi
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Admin Rekber Paling Terpercaya
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Admin escrow dengan skor kepercayaan tertinggi, fast respon, dan ribuan transaksi sukses.
            </p>
          </div>

          <Link
            href="/rekber"
            className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors group self-start sm:self-auto"
          >
            <span>Lihat Semua Admin ({dummyAdmins.length})</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {top.map((a, i) => (
            <AdminCard key={a.id} admin={a} rank={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
