"use client";
import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Apakah dana saya aman selama transaksi?",
    a: "Sangat aman. Dana yang kamu transfer ditahan di rekening resmi admin rekber terverifikasi (escrow) — bukan langsung ke seller. Dana baru dicairkan setelah kamu memastikan akun aman dan dapat diakses penuh.",
    category: "Keamanan",
  },
  {
    q: "Bagaimana alur serah terima akun eFootball / game lainnya?",
    a: "Admin akan mengkoordinasikan transaksi. Seller memberikan data login (Konami ID/Moonton/Email) untuk diverifikasi. Buyer mengecek squad, koin, dan segera mengganti password serta mengaktifkan 2FA. Setelah buyer konfirmasi 'Semua Aman', admin mencairkan dana ke seller.",
    category: "Alur Transaksi",
  },
  {
    q: "Berapa biaya fee rekber dan siapa yang menanggung?",
    a: "Fee sangat terjangkau: mulai Rp 5.000 untuk transaksi standar hingga Rp 15.000 untuk akun di atas Rp 2 juta. Tanggungan fee bisa disepakati antara pembeli dan penjual (bisa 50:50 atau ditanggung salah satu pihak).",
    category: "Biaya / Fee",
  },
  {
    q: "Bagaimana jika penjual memberikan akun yang tidak sesuai deskripsi?",
    a: "Admin akan membatalkan transaksi dan merefund 100% uangmu. Penjual yang berniat menipu atau memberikan data palsu akan langsung ditandai dalam daftar ripper/penipu RekberGG.",
    category: "Garansi & Refund",
  },
  {
    q: "Bagaimana cara menjadi Admin Rekber di RekberGG?",
    a: "Kamu dapat mengajukan diri melalui menu 'Gabung Admin'. Persyaratannya mencakup verifikasi KTP resmi (KYC), reputasi minimal 6 bulan di komunitas gaming, dan penempatan deposit jaminan keamanan.",
    category: "Pendaftaran Admin",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Pusat Informasi
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-3">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
          Semua hal yang perlu kamu ketahui seputar keamanan dan transaksi di RekberGG.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div
            key={f.q}
            className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
              open === i ? "border-blue-500 shadow-sm" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-medium gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                  {f.category}
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900">
                  {f.q}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                  open === i ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {f.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
