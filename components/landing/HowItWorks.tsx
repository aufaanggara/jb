import { ListChecks, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "1",
    icon: ListChecks,
    badge: "Langkah 1",
    title: "Pilih Akun & Tentukan Admin",
    desc: "Pilih akun game yang ingin dibeli, sepakati harga dengan seller, dan pilih Admin Rekber berlisensi dari direktori.",
    points: ["Spesifikasi akun transparan", "Pilih admin dengan rating tertinggi", "Biaya fee jelas di awal"],
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-100",
  },
  {
    step: "2",
    icon: ShieldCheck,
    badge: "Langkah 2",
    title: "Transfer Dana ke Rekber",
    desc: "Buyer mentransfer dana ke rekening resmi Admin Rekber. Dana ditahan aman oleh admin sebelum akun diserahkan.",
    points: ["Dana 100% aman di pihak ketiga", "Admin konfirmasi dana masuk", "Seller mengirimkan data login"],
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-100",
  },
  {
    step: "3",
    icon: CheckCircle2,
    badge: "Langkah 3",
    title: "Amankan Akun & Dana Cair",
    desc: "Buyer memeriksa data akun, mengganti password & email (2FA). Setelah konfirmasi aman, admin meneruskan dana ke seller.",
    points: ["Waktu pengecekan garansi", "Ganti data login hingga 100% tuntas", "Pencairan kilat ke rekening seller"],
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-100",
  },
];

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Proses Transaksi Sederhana
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-3">
          Cara Kerja Transaksi di Rekberin
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Alur perlindungan escrow 3 langkah yang menjamin pembeli menerima akun sesuai deskripsi dan penjual menerima uang tanpa risiko.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${s.bg}`}>
                  <Icon className={s.color} size={24} />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {s.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {s.desc}
              </p>

              <div className="mt-auto space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                {s.points.map((pt) => (
                  <div key={pt} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
