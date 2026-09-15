"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Clock, ShieldCheck } from "lucide-react";
import type { TransactionStatus } from "@/types";

// Sesuai FR-04.5 & Section 17.5:
// Admin TIDAK bisa trigger COMPLETED. Hanya konfirmasi pembeli yang memicu status COMPLETED.
// Admin hanya bisa:
// - Konfirmasi dana masuk (PENDING_PAYMENT → PAYMENT_CONFIRMED)
// - Tandai handover dimulai (PAYMENT_CONFIRMED → IN_HANDOVER)
// - Tandai handover selesai — menunggu konfirmasi pembeli (IN_HANDOVER → PENDING_BUYER_CONFIRM)
// - Batalkan transaksi (kapan saja, FR-04.7)

const nextActionByStatus: Record<
  TransactionStatus,
  { label: string; sublabel?: string; variant: "primary" | "success" | "outline" } | null
> = {
  PENDING_PAYMENT: {
    label: "Konfirmasi Dana Masuk",
    sublabel: "Verifikasi mutasi rekening sebelum menekan tombol ini",
    variant: "primary",
  },
  PAYMENT_CONFIRMED: {
    label: "Tandai Handover Dimulai",
    sublabel: "Persilakan penjual menyerahkan data akun ke Vault",
    variant: "primary",
  },
  IN_HANDOVER: {
    label: "Tandai Handover Selesai",
    sublabel: "Dana tetap ditahan — menunggu konfirmasi penerimaan dari pembeli",
    variant: "primary",
  },
  // PENDING_BUYER_CONFIRM: Admin tidak punya aksi — hanya menunggu pembeli konfirmasi
  PENDING_BUYER_CONFIRM: null,
  COMPLETED: null,
  DISPUTED: null,
  CANCELLED: null,
};

export function ActionPanel({ status }: { status: TransactionStatus }) {
  const [confirming, setConfirming] = useState<string | null>(null);
  const action = nextActionByStatus[status];

  function runAction(label: string) {
    // NOTE: di produksi — PATCH /api/transactions/[id] dengan aksi terkait,
    // lalu tambahkan entry ke `logs` transaksi dengan timestamp.
    toast.success(`${label} — dicatat (demo)`);
    setConfirming(null);
  }

  return (
    <div className="space-y-3">
      {action && (
        <div className="space-y-1.5">
          <Button
            className="w-full"
            variant={action.variant}
            onClick={() => setConfirming(action.label)}
          >
            {action.label}
          </Button>
          {action.sublabel && (
            <p className="text-[11px] text-slate-500 text-center leading-relaxed px-1">
              {action.sublabel}
            </p>
          )}
        </div>
      )}

      {/* Info state: Admin menunggu konfirmasi pembeli — tidak ada tombol aksi */}
      {status === "PENDING_BUYER_CONFIRM" && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50 border border-blue-200">
          <Clock size={15} className="text-blue-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-blue-800">
              Menunggu Konfirmasi Pembeli
            </p>
            <p className="text-[11px] text-blue-600 mt-0.5 leading-relaxed">
              Handover selesai. Dana escrow baru dicairkan ke penjual setelah
              pembeli mengkonfirmasi akun aman diterima.
            </p>
          </div>
        </div>
      )}

      {status === "COMPLETED" && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <ShieldCheck size={15} className="text-emerald-600 mt-0.5 shrink-0" />
          <p className="text-xs font-bold text-emerald-800">
            Transaksi selesai. Dana telah dicairkan ke penjual.
          </p>
        </div>
      )}

      <Button className="w-full" variant="secondary">
        Buka Sengketa
      </Button>
      <Button className="w-full" variant="outline">
        Batalkan Transaksi
      </Button>

      {confirming && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setConfirming(null)}
        >
          <div
            className="glass-card rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold mb-2">Konfirmasi Aksi</h3>
            <p className="text-sm text-txt-secondary mb-5">
              Anda akan melakukan:{" "}
              <span className="text-txt-primary font-medium">{confirming}</span>
              . Aksi ini akan tercatat di log transaksi.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setConfirming(null)}
              >
                Batal
              </Button>
              <Button className="flex-1" onClick={() => runAction(confirming)}>
                Ya, Lanjutkan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
