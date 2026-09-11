"use client";
import { useState } from "react";
import { Calculator, ShieldCheck, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const presets = [150000, 350000, 850000, 1500000, 2500000];

export function FeeCalculator() {
  const [price, setPrice] = useState<number>(850000);

  // Fee calculation logic
  const adminFee = price > 2000000 ? 15000 : price > 1000000 ? 10000 : 5000;
  const platformFee = 2000;
  const totalBuyer = price + adminFee + platformFee;
  const totalSeller = price;

  return (
    <section id="kalkulator-fee" className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Transparansi Biaya
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-3">
          Kalkulator Simulasi Fee Rekber
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Hitung rincian biaya sebelum bertransaksi. Biaya flat, murah, dan transparan tanpa pungutan tersembunyi.
        </p>
      </div>

      <div className="bg-white border border-slate-200 max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Input Controls */}
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Nominal Transaksi Akun:
              </label>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <span className="text-xs text-slate-400 font-bold">IDR</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {formatRupiah(price)}
                </span>
              </div>
            </div>

            {/* Range Slider */}
            <div>
              <input
                type="range"
                min={50000}
                max={5000000}
                step={50000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-500 font-medium mt-2">
                <span>Rp 50rb</span>
                <span>Rp 2.5jt</span>
                <span>Rp 5jt</span>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div>
              <span className="text-xs text-slate-500 font-semibold block mb-2">Pilihan Cepat:</span>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrice(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      price === p
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    {formatRupiah(p)}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust highlights */}
            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Dana 100% ditahan aman hingga serah terima akun selesai</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-blue-600 shrink-0" />
                <span>Garansi refund penuh jika penjual membatalkan sepihak</span>
              </div>
            </div>
          </div>

          {/* Right: Breakdown Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                  Rincian Pembayaran
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  <Lock size={11} /> Terlindungi Escrow
                </span>
              </div>

              <div className="space-y-3.5 py-4 text-sm">
                <div className="flex justify-between items-center text-slate-600">
                  <span className="text-xs font-medium">Harga Akun (ke Seller)</span>
                  <span className="text-slate-900 font-semibold text-sm">{formatRupiah(totalSeller)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="text-xs font-medium">Jasa Admin Rekber</span>
                  <span className="text-amber-700 font-semibold text-sm">{formatRupiah(adminFee)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="text-xs font-medium">Pemeliharaan Sistem</span>
                  <span className="text-blue-600 font-semibold text-sm">{formatRupiah(platformFee)}</span>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-[11px] text-slate-500 block font-semibold uppercase tracking-wider">
                      Total Buyer Transfer
                    </span>
                    <span className="text-2xl font-black text-slate-900">
                      {formatRupiah(totalBuyer)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block font-medium">Seller Bersih</span>
                    <span className="text-xs text-emerald-600 font-bold">
                      {formatRupiah(totalSeller)} Net
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 mt-2">
              <Link href="/rekber" className="block">
                <Button variant="primary" size="lg" className="w-full gap-2 shadow-sm font-bold bg-blue-600 hover:bg-blue-700 text-white">
                  Pilih Admin Rekber Sekarang <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
