"use client";

import { useState } from "react";
import { Lock, KeyRound, Copy, Check, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { useStore } from "@/store/useStore";
import type { ChatSenderRole } from "@/types";
import { toast } from "sonner";

interface AccountVaultPanelProps {
  transactionId: string;
  role: ChatSenderRole;
  onOpenDispute?: () => void;
}

export function AccountVaultPanel({
  transactionId,
  role,
  onOpenDispute,
}: AccountVaultPanelProps) {
  const { vaultCredentials, submitCredentials, getTransaction, completeTransaction } = useStore();
  const tx = getTransaction(transactionId);
  const creds = vaultCredentials[transactionId];

  // Seller Form State
  const [loginMethod, setLoginMethod] = useState("Konami ID");
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [backupCodes, setBackupCodes] = useState("");
  const [notes, setNotes] = useState("");

  // Buyer View State
  const [showPassword, setShowPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    toast.success(`${label} berhasil disalin!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountEmail || !accountPassword) {
      toast.error("Email dan password akun wajib diisi!");
      return;
    }

    submitCredentials(transactionId, {
      loginMethod,
      accountEmail,
      accountPassword,
      backupCodes,
      notes,
    });
    toast.success("Data akun berhasil diserahkan ke Escrow Vault!");
  };

  const handleBuyerComplete = () => {
    if (confirm("Pastikan Anda sudah mengamankan akun dan mengganti password/2FA sebelum menyelesaikan transaksi. Lanjutkan?")) {
      completeTransaction(transactionId);
      toast.success("Transaksi Selesai! Dana berhasil dicairkan ke penjual.");
    }
  };

  const isPendingPayment = tx?.status === "PENDING_PAYMENT";
  const isCompleted = tx?.status === "COMPLETED";
  const isDisputed = tx?.status === "DISPUTED";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Lock size={18} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              Brankas Data Akun (Escrow Vault)
            </h3>
            <p className="text-[11px] text-slate-500">
              Pertukaran data login aman & terproteksi sistem rekber
            </p>
          </div>
        </div>

        {creds ? (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <ShieldCheck size={12} /> Data Terenkripsi
          </span>
        ) : (
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            Menunggu Penyerahan
          </span>
        )}
      </div>

      {/* SISI PEMBELI: Jika belum bayar */}
      {role === "BUYER" && isPendingPayment && (
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 space-y-1.5">
          <p className="font-bold flex items-center gap-1.5">
            <Lock size={13} /> Data Akun Terkunci
          </p>
          <p className="text-amber-800 text-[11px]">
            Selesaikan pembayaran terlebih dahulu agar admin rekber dapat memverifikasi dana dan meminta penjual menyerahkan data login akun ke brankas ini.
          </p>
        </div>
      )}

      {/* SISI PEMBELI: Sudah bayar tapi penjual belum kirim */}
      {role === "BUYER" && !isPendingPayment && !creds && (
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 text-xs text-blue-900 space-y-1.5">
          <p className="font-bold flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-blue-600" /> Dana Aman di Escrow
          </p>
          <p className="text-blue-800 text-[11px]">
            Pembayaran Anda sudah terkonfirmasi. Penjual sedang menyiapkan data akun untuk dimasukkan ke dalam brankas ini. Anda akan menerima notifikasi di room chat saat data siap.
          </p>
        </div>
      )}

      {/* SISI PENJUAL: Form Serahkan Data Akun (jika belum submit) */}
      {role === "SELLER" && !creds && (
        <form onSubmit={handleSellerSubmit} className="space-y-3.5 text-xs">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800">
            <p className="font-bold">Instruksi Penjual:</p>
            <p className="text-[11px] text-emerald-700 mt-0.5">
              Masukkan informasi login akun dengan benar. Data hanya bisa diakses oleh pembeli dan admin yang bertugas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Metode Login Game</label>
              <select
                value={loginMethod}
                onChange={(e) => setLoginMethod(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-blue-500"
              >
                <option value="Konami ID">Konami ID (eFootball)</option>
                <option value="Moonton">Moonton ID (Mobile Legends)</option>
                <option value="EA Account">EA Account (FC Mobile)</option>
                <option value="Google Play">Google Play Account</option>
                <option value="Email Polos">Email Polosan</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email / ID Akun Game</label>
              <input
                type="text"
                required
                value={accountEmail}
                onChange={(e) => setAccountEmail(e.target.value)}
                placeholder="contoh: akun_game@gmail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Password Akun Game</label>
              <input
                type="text"
                required
                value={accountPassword}
                onChange={(e) => setAccountPassword(e.target.value)}
                placeholder="Masukkan kata sandi akun"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Kode 2FA / Cadangan (Opsional)</label>
              <input
                type="text"
                value={backupCodes}
                onChange={(e) => setBackupCodes(e.target.value)}
                placeholder="contoh: 882190-221190"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-blue-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Catatan Tambahan untuk Pembeli</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="contoh: Nominus, email belum dikaitkan nomor HP, siap bantu ganti email."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Send size={14} /> Kirim Data Akun ke Escrow Vault
          </button>
        </form>
      )}

      {/* JIKA CREDENTIALS SUDAH DISERAHKAN (Bisa dilihat oleh Buyer & Admin, atau Seller view-only) */}
      {creds && (
        <div className="space-y-4 text-xs">
          <div className="grid sm:grid-cols-2 gap-3">
            {/* Field: Login Method */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">
                Tipe Akun Login
              </span>
              <span className="font-semibold text-slate-900 text-sm">{creds.loginMethod}</span>
            </div>

            {/* Field: Email */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">
                  Email / Username
                </span>
                <span className="font-mono font-bold text-slate-900 text-sm select-all">
                  {creds.accountEmail}
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(creds.accountEmail, "Email Akun")}
                className="text-blue-600 hover:text-blue-700 p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                title="Salin Email"
              >
                {copiedKey === "Email Akun" ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {/* Field: Password */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">
                  Kata Sandi (Password)
                </span>
                <span className="font-mono font-bold text-slate-900 text-sm select-all tracking-wider">
                  {showPassword ? creds.accountPassword : "••••••••••••"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                  title={showPassword ? "Sembunyikan" : "Tampilkan"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(creds.accountPassword, "Password Akun")}
                  className="text-blue-600 hover:text-blue-700 p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                  title="Salin Password"
                >
                  {copiedKey === "Password Akun" ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                </button>
              </div>
            </div>

            {/* Field: 2FA Backup */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">
                  Kode 2FA Cadangan
                </span>
                <span className="font-mono font-bold text-slate-900 text-xs select-all">
                  {creds.backupCodes || "Tidak ada 2FA"}
                </span>
              </div>
              {creds.backupCodes && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(creds.backupCodes || "", "Kode 2FA")}
                  className="text-blue-600 hover:text-blue-700 p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                  title="Salin 2FA"
                >
                  {copiedKey === "Kode 2FA" ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                </button>
              )}
            </div>
          </div>

          {creds.notes && (
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-[11px] text-blue-900">
              <span className="font-bold block mb-0.5">Catatan Khusus dari Penjual:</span>
              <span>{creds.notes}</span>
            </div>
          )}

          {/* AKSI UNTUK PEMBELI SETELAH MENERIMA DATA */}
          {role === "BUYER" && !isCompleted && !isDisputed && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={onOpenDispute}
                className="text-rose-600 hover:text-rose-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer py-2 px-3 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <AlertTriangle size={14} /> Ajukan Masalah / Komplain
              </button>

              <button
                type="button"
                onClick={handleBuyerComplete}
                className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ml-auto"
              >
                <CheckCircle2 size={15} /> Akun Sudah Sesuai & Selesaikan Transaksi
              </button>
            </div>
          )}

          {isCompleted && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-xs text-emerald-800 font-bold flex items-center justify-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-600" />
              Transaksi telah selesai. Dana telah dicairkan ke penjual.
            </div>
          )}

          {isDisputed && (
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center text-xs text-rose-800 font-bold flex items-center justify-center gap-1.5">
              <AlertTriangle size={16} className="text-rose-600" />
              Transaksi sedang dalam mediasi komplain. Dana dibekukan sementara.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
