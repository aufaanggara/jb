"use client";

import { useState } from "react";
import { X, AlertTriangle, ShieldAlert, RotateCcw, CheckCircle2, MessageSquare } from "lucide-react";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string;
  isAdmin?: boolean;
}

export function DisputeModal({
  isOpen,
  onClose,
  transactionId,
  isAdmin = false,
}: DisputeModalProps) {
  const { raiseDispute, refundTransaction, completeTransaction } = useStore();
  const [reasonCategory, setReasonCategory] = useState("Spesifikasi akun tidak sesuai deskripsi listing");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleBuyerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullReason = details.trim() ? `${reasonCategory}: ${details.trim()}` : reasonCategory;
    raiseDispute(transactionId, fullReason);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.error("Komplain resmi berhasil diajukan. Dana escrow telah dibekukan.");
      onClose();
    }, 500);
  };

  const handleAdminRefund = () => {
    if (confirm("Apakah Anda yakin ingin me-refund 100% dana ke pembeli dan membatalkan transaksi ini?")) {
      refundTransaction(transactionId);
      toast.success("Dana 100% berhasil di-refund ke pembeli!");
      onClose();
    }
  };

  const handleAdminRelease = () => {
    if (confirm("Lanjutkan pencairan dana ke penjual dan tandai transaksi selesai?")) {
      completeTransaction(transactionId);
      toast.success("Sengketa diselesaikan. Dana dicairkan ke penjual.");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="bg-rose-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-rose-900">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-600/30 text-rose-400 rounded-xl border border-rose-500/40">
              <AlertTriangle size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                Pusat Resolusi Masalah
              </span>
              <h3 className="font-bold text-base">
                {isAdmin ? "Keputusan Mediasi Admin" : "Ajukan Komplain Transaksi"}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {!isAdmin ? (
            /* Sisi Pembeli: Form Komplain */
            <form onSubmit={handleBuyerSubmit} className="space-y-3.5">
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldAlert size={14} className="text-rose-600" /> Perlindungan Garansi Rekberin
                </p>
                <p className="text-[11px] text-rose-800">
                  Dana Anda di rekening admin akan <strong>dibekukan otomatis</strong> begitu komplain diajukan. Penjual tidak dapat mencairkan dana sampai masalah ini diselesaikan bersama Admin.
                </p>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Pilih Kategori Kendala:
                </label>
                <select
                  value={reasonCategory}
                  onChange={(e) => setReasonCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-rose-500 text-xs"
                >
                  <option value="Spesifikasi akun tidak sesuai deskripsi listing">
                    Pemain / OVR / Koin akun tidak sesuai listing
                  </option>
                  <option value="Password atau email salah, tidak bisa login">
                    Password / email salah, gagal login
                  </option>
                  <option value="Akun minus (terkait nomor HP / 2FA penjual masih aktif)">
                    Akun minus (tertambat HP/email penjual lain)
                  </option>
                  <option value="Akun terindikasi terkena sanksi/banned">
                    Akun terindikasi sanksi / suspend
                  </option>
                  <option value="Penjual tidak kooperatif">
                    Penjual tidak merespons di room chat
                  </option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Jelaskan Detail Masalah:
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Ceritakan kendala yang Anda alami secara rinci..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-rose-500 text-xs resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <AlertTriangle size={14} />
                  {isSubmitting ? "Mengajukan..." : "Bekukan Dana & Ajukan"}
                </button>
              </div>
            </form>
          ) : (
            /* Sisi Admin: Panel Keputusan Mediasi */
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                <strong>Otoritas Admin Escrow:</strong> Tinjau bukti percakapan dan screenshot di Room Chat sebelum mengambil keputusan.
              </div>

              <div className="space-y-2.5">
                {/* Opsi 1: Refund 100% */}
                <button
                  type="button"
                  onClick={handleAdminRefund}
                  className="w-full p-3.5 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-left transition-all cursor-pointer flex items-start gap-3"
                >
                  <div className="p-2 bg-rose-600 text-white rounded-lg shrink-0">
                    <RotateCcw size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-rose-950 text-xs">Refund 100% ke Pembeli</h4>
                    <p className="text-[11px] text-rose-800 mt-0.5">
                      Batalkan transaksi dan kembalikan seluruh dana ke pembeli (jika akun terbukti tidak sesuai).
                    </p>
                  </div>
                </button>

                {/* Opsi 2: Loloskan ke Penjual */}
                <button
                  type="button"
                  onClick={handleAdminRelease}
                  className="w-full p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-left transition-all cursor-pointer flex items-start gap-3"
                >
                  <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-xs">Cairkan Dana ke Penjual</h4>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      Selesaikan sengketa dan teruskan dana ke penjual jika kendala pembeli sudah terselesaikan.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
