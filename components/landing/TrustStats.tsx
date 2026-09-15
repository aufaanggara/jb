import { ShieldCheck, FileClock, Star, Flag, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Admin Rekber KYC",
    desc: "Admin diseleksi ketat dengan verifikasi identitas resmi dan rekam jejak komunitas gaming terpercaya.",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-100",
  },
  {
    icon: FileClock,
    title: "Riwayat Transaksi Transparan",
    desc: "Bukti transfer, serah-terima akun, dan perubahan data login tercatat otomatis dalam log transaksi.",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-100",
  },
  {
    icon: Star,
    title: "Ulasan Pembeli Nyata",
    desc: "Hanya pembeli dan penjual yang telah menyelesaikan transaksi resmi yang dapat memberikan rating.",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-100",
  },
  {
    icon: Flag,
    title: "Mediasi & Proteksi Dana",
    desc: "Terjadi kendala saat login? Dana ditahan aman oleh admin rekber sebagai mediator netral hingga selesai.",
    color: "text-indigo-600",
    bg: "bg-indigo-50 border-indigo-100",
  },
];

export function TrustSafety() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Standar Keamanan Rekberin
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-3">
          Mengapa Transaksi di Rekberin Lebih Aman?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Setiap transaksi dilindungi oleh sistem escrow terdesentralisasi bersama admin rekber berlisensi.
        </p>
      </div>

      {/* 4 Feature Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {points.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${p.bg}`}
              >
                <Icon className={p.color} size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Comparison table — Direct vs Rekberin */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900 text-center mb-6">
          Perbandingan: Transaksi Langsung vs Rekberin
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Tanpa Rekber */}
          <div className="rounded-xl bg-red-50/60 border border-red-200 p-5">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm mb-4">
              <AlertTriangle size={18} />
              <span>Transaksi Langsung (Rawan Ripper)</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <span>Buyer bayar duluan, seller kabur dan memblokir kontak</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <span>Akun di-hackback setelah beberapa hari karena email tidak diganti bersih</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <span>Tidak ada pihak penengah atau jaminan uang kembali</span>
              </li>
            </ul>
          </div>

          {/* Lewat Rekberin */}
          <div className="rounded-xl bg-emerald-50/60 border border-emerald-200 p-5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-4">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>Lewat Rekberin (100% Aman & Terjamin)</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Dana ditahan aman oleh admin terverifikasi sebelum akun diserahkan</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Admin mendampingi panduan ganti email dan 2FA akun sampai selesai</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Garansi refund 100% jika spesifikasi akun tidak cocok</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export const TrustStats = TrustSafety;
