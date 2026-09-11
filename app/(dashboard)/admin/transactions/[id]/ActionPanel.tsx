"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import type { TransactionStatus } from "@/types";

const nextActionByStatus: Record<TransactionStatus, { label: string; variant: "primary" | "success" | "outline" } | null> = {
  PENDING_PAYMENT: { label: "Konfirmasi Dana Masuk", variant: "primary" },
  PAYMENT_CONFIRMED: { label: "Tandai Serah Terima Selesai", variant: "primary" },
  IN_HANDOVER: { label: "Tandai Serah Terima Selesai", variant: "primary" },
  PENDING_BUYER_CONFIRM: { label: "Cairkan Dana ke Seller", variant: "success" },
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
        <Button className="w-full" variant={action.variant} onClick={() => setConfirming(action.label)}>
          {action.label}
        </Button>
      )}
      <Button className="w-full" variant="secondary">Buka Sengketa</Button>
      <Button className="w-full" variant="outline">Batalkan Transaksi</Button>

      {confirming && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setConfirming(null)}>
          <div className="glass-card rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold mb-2">Konfirmasi Aksi</h3>
            <p className="text-sm text-txt-secondary mb-5">
              Anda akan melakukan: <span className="text-txt-primary font-medium">{confirming}</span>. Aksi ini akan tercatat di log transaksi.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setConfirming(null)}>Batal</Button>
              <Button className="flex-1" onClick={() => runAction(confirming)}>Ya, Lanjutkan</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
