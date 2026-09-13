"use client";

import { useState, useEffect } from "react";
import { X, QrCode, Building2, Wallet, Copy, Check, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string;
  amount: number;
  listingTitle: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  transactionId,
  amount,
  listingTitle,
}: PaymentModalProps) {
  const [method, setMethod] = useState<"QRIS" | "VA_BCA" | "VA_MANDIRI" | "GOPAY">("QRIS");
  const [copied, setCopied] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(86390); // 24 hours in seconds
  const [isProcessing, setIsProcessing] = useState(false);

  const { payTransaction } = useStore();

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;
  const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} berhasil disalin!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      payTransaction(transactionId, method.replace("_", " "));
      setIsProcessing(false);
      toast.success("Pembayaran Berhasil Diverifikasi oleh Escrow RekberGG!");
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              Pembayaran Rekber Escrow
            </span>
            <h3 className="font-bold text-base sm:text-lg">Selesaikan Pembayaran</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Countdown & Order Summary */}
        <div className="p-4 sm:p-6 bg-slate-50/70 border-b border-slate-200">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-slate-500 font-medium">Batas Waktu Bayar:</span>
            <span className="font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md flex items-center gap-1 font-mono">
              <Clock size={12} /> {timeString}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Item</span>
              <span className="font-semibold text-slate-900 truncate max-w-[200px]">{listingTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">No. Transaksi</span>
              <span className="font-mono font-semibold text-slate-700">#{transactionId}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 text-sm font-bold text-blue-600">
              <span>Total Tagihan</span>
              <span>{formatRupiah(amount)}</span>
            </div>
          </div>
        </div>

        {/* Method Selector Tabs */}
        <div className="p-4 sm:p-6 space-y-4">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Pilih Metode Pembayaran:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setMethod("QRIS")}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                method === "QRIS"
                  ? "border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 text-blue-900 font-bold"
                  : "border-slate-200 hover:border-slate-300 text-slate-600"
              }`}
            >
              <QrCode size={18} className={method === "QRIS" ? "text-blue-600" : "text-slate-500"} />
              <span className="text-xs">QRIS</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod("VA_BCA")}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                method === "VA_BCA"
                  ? "border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 text-blue-900 font-bold"
                  : "border-slate-200 hover:border-slate-300 text-slate-600"
              }`}
            >
              <Building2 size={18} className={method === "VA_BCA" ? "text-blue-600" : "text-slate-500"} />
              <span className="text-xs">BCA VA</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod("VA_MANDIRI")}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                method === "VA_MANDIRI"
                  ? "border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 text-blue-900 font-bold"
                  : "border-slate-200 hover:border-slate-300 text-slate-600"
              }`}
            >
              <Building2 size={18} className={method === "VA_MANDIRI" ? "text-blue-600" : "text-slate-500"} />
              <span className="text-xs">Mandiri</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod("GOPAY")}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                method === "GOPAY"
                  ? "border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 text-blue-900 font-bold"
                  : "border-slate-200 hover:border-slate-300 text-slate-600"
              }`}
            >
              <Wallet size={18} className={method === "GOPAY" ? "text-blue-600" : "text-slate-500"} />
              <span className="text-xs">GoPay/OVO</span>
            </button>
          </div>

          {/* Method Content */}
          {method === "QRIS" && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-3">
              <div className="inline-block p-3 bg-white rounded-xl shadow-xs border border-slate-200">
                {/* Visual QR Code Representation */}
                <div className="w-40 h-40 bg-slate-900 mx-auto rounded-lg flex flex-col items-center justify-center text-white relative overflow-hidden p-2">
                  <div className="grid grid-cols-5 gap-1 w-full h-full opacity-85">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-xs ${
                          (i % 2 === 0 || i === 0 || i === 4 || i === 20 || i === 24)
                            ? "bg-white"
                            : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute bg-blue-600 text-[10px] font-black px-2 py-0.5 rounded text-white shadow-md">
                    QRIS
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Scan QRIS di atas melalui <strong>BCA, GoPay, OVO, Dana, ShopeePay</strong> atau mobile banking kamu.
              </p>
            </div>
          )}

          {(method === "VA_BCA" || method === "VA_MANDIRI" || method === "GOPAY") && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block mb-1">
                  Nomor {method === "GOPAY" ? "E-Wallet Rekber" : "Virtual Account"}:
                </span>
                <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-sm text-slate-900">
                    {method === "VA_BCA"
                      ? "8801 2910 8821 902"
                      : method === "VA_MANDIRI"
                      ? "8910 3381 0021 445"
                      : "0812 3456 7890 (RekberGG Escrow)"}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        method === "VA_BCA"
                          ? "880129108821902"
                          : method === "VA_MANDIRI"
                          ? "891033810021445"
                          : "081234567890",
                        "Nomor Rekening/VA"
                      )
                    }
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copied === "Nomor Rekening/VA" ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>Salin</span>
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">Total Nominal Pas:</span>
                <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="font-bold text-sm text-blue-600">{formatRupiah(amount)}</span>
                  <button
                    onClick={() => copyToClipboard(String(amount), "Nominal")}
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copied === "Nominal" ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>Salin</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Guarantee disclaimer */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-[11px] text-emerald-800 flex items-start gap-2">
            <ShieldCheck size={15} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Dana yang Anda bayarkan akan <strong>disimpan di rekening penampung resmi (escrow)</strong> RekberGG sampai akun berhasil diserahterimakan dan diamankan.
            </span>
          </div>

          {/* Simulation Action Button */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleSimulatePayment}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <CheckCircle2 size={16} />
            {isProcessing ? "Memproses Verifikasi Dana..." : "Konfirmasi / Simulasi Bayar Lunas (Instant)"}
          </button>
        </div>
      </div>
    </div>
  );
}
