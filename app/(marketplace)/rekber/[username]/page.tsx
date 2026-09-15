import { notFound } from "next/navigation";
import { ShieldCheck, MessageCircle, Star, ArrowLeft, CheckCircle2, Clock, CreditCard } from "lucide-react";
import Link from "next/link";
import { dummyAdmins, dummyReviews } from "@/data/dummy";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { TrustScoreRing } from "@/components/marketplace/TrustScoreRing";
import { waLink } from "@/lib/utils";

export default function AdminProfilePage({ params }: { params: { username: string } }) {
  const admin = dummyAdmins.find((a) => a.user.username === params.username);
  if (!admin) return notFound();

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Breadcrumb / Back button */}
        <Link
          href="/rekber"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline mb-5"
        >
          <ArrowLeft size={14} /> Kembali ke Direktori Admin
        </Link>

        {/* Cover Banner */}
        <div className="h-36 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-500/30 mb-[-2.5rem] shadow-sm" />

        {/* Header Profile Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <Avatar
                name={admin.user.fullName}
                size={84}
                className="ring-4 ring-white shadow-md bg-white -mt-10 sm:-mt-12"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-black text-slate-900">
                    {admin.user.fullName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    VERIFIED KYC
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  @{admin.user.username} • Bergabung sejak {new Date(admin.joinedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long" })}
                </p>
              </div>
            </div>

            <a href={waLink(admin.user.whatsapp ?? "")} target="_blank" rel="noreferrer">
              <Button variant="success" size="md" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs">
                <MessageCircle size={16} /> Hubungi via WhatsApp
              </Button>
            </a>
          </div>

          {/* 4 Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 flex flex-col items-center justify-center text-center">
              <TrustScoreRing score={admin.trustScore} size={64} />
              <span className="text-[11px] font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Trust Score
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 flex flex-col justify-center text-center">
              <p className="text-xl sm:text-2xl font-black text-slate-900">
                {admin.totalSuccess.toLocaleString("id-ID")}+
              </p>
              <span className="text-[11px] font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Transaksi Sukses
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 flex flex-col justify-center text-center">
              <p className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-1">
                <Star size={18} className="text-amber-500 fill-amber-500" /> 4.9
              </p>
              <span className="text-[11px] font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Rating Kepuasan
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 flex flex-col justify-center text-center">
              <p className="text-xl sm:text-2xl font-black text-blue-600">
                &lt; {admin.responseTime}m
              </p>
              <span className="text-[11px] font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Kecepatan Respon
              </span>
            </div>
          </div>
        </div>

        {/* About Admin & Bank Support */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
          <h2 className="text-base font-bold text-slate-900 mb-3">Tentang Admin Rekber</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {admin.bio}
          </p>

          <h2 className="text-sm font-bold text-slate-900 mb-3">Rekening Pembayaran Resmi</h2>
          <div className="flex flex-wrap gap-2">
            {admin.bankAccounts.map((b) => (
              <span
                key={b.bank}
                className="text-xs font-semibold rounded-lg bg-slate-100 border border-slate-200 px-3 py-1.5 text-slate-700"
              >
                {b.bank}
              </span>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
            <Star size={18} className="text-amber-500 fill-amber-500" /> Ulasan Pengguna Terbaru
          </h2>

          <div className="space-y-4">
            {dummyReviews.map((r) => (
              <div key={r.id} className="flex gap-3 pb-4 border-b border-slate-100 last:border-none last:pb-0">
                <Avatar name={r.giverName} size={36} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900">{r.giverName}</p>
                    <span className="flex items-center gap-0.5 text-amber-500 text-xs font-semibold">
                      <Star size={12} fill="currentColor" /> {r.rating}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{r.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link href="/listings" className="block">
          <Button variant="primary" size="lg" className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm mb-3">
            Cari Akun & Transaksi dengan Admin Ini
          </Button>
        </Link>
        <p className="text-xs text-slate-500 text-center">
          Selalu pastikan Anda bertransaksi melalui room rekber resmi dan nomor rekening yang diverifikasi oleh sistem Rekberin.
        </p>
      </div>
    </div>
  );
}
