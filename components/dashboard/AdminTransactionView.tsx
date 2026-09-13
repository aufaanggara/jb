"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { TransactionTimeline } from "@/components/dashboard/TransactionTimeline";
import { TransactionChat } from "@/components/dashboard/TransactionChat";
import { AccountVaultPanel } from "@/components/dashboard/AccountVaultPanel";
import { DisputeModal } from "@/components/dashboard/DisputeModal";
import { Avatar } from "@/components/ui/Avatar";
import { useStore } from "@/store/useStore";
import { formatRupiah } from "@/lib/utils";
import { ActionPanel } from "@/app/(dashboard)/admin/transactions/[id]/ActionPanel";
import { AlertTriangle, RotateCcw, CheckCircle2 } from "lucide-react";
import type { Transaction } from "@/types";

export function AdminTransactionView({ initialTransaction }: { initialTransaction: Transaction }) {
  const { getTransaction, refundTransaction, completeTransaction } = useStore();
  const tx = getTransaction(initialTransaction.id) || initialTransaction;

  const [disputeModalOpen, setDisputeModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="admin" />
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Transaksi #{tx.id.slice(-4)}</h1>
            <p className="text-txt-muted text-sm">{new Date(tx.createdAt).toLocaleString("id-ID")}</p>
          </div>
          <StatusBadge status={tx.status} />
        </div>

        {/* Dispute Resolution Alert Banner if status is DISPUTED */}
        {tx.status === "DISPUTED" && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-600 text-white rounded-xl">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-rose-950 text-sm">Sengketa / Komplain Memerlukan Keputusan</h4>
                <p className="text-xs text-rose-800 mt-0.5">
                  Pembeli mengajukan komplain pada akun ini. Tinjau bukti di room chat sebelum memutuskan tindakan.
                </p>
              </div>
            </div>
            <button
              onClick={() => setDisputeModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Buka Panel Resolusi Mediasi
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel kiri: info transaksi */}
          <Card>
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Info Transaksi</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-txt-muted text-xs mb-1">Listing</p>
                <p className="font-medium text-slate-900">{tx.listing.title}</p>
                <p className="text-txt-secondary text-xs">{formatRupiah(tx.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Avatar name={tx.buyer.fullName} size={36} />
                <div>
                  <p className="text-txt-muted text-xs">Buyer</p>
                  <p className="font-medium">{tx.buyer.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar name={tx.listing.seller.fullName} size={36} />
                <div>
                  <p className="text-txt-muted text-xs">Seller (tujuan pencairan)</p>
                  <p className="font-medium">{tx.listing.seller.username}</p>
                </div>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-xs">
                <span className="text-txt-muted">Fee Platform</span>
                <span>{formatRupiah(tx.platformFee)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-txt-muted">Fee Admin</span>
                <span>{formatRupiah(tx.adminFee)}</span>
              </div>
            </div>
          </Card>

          {/* Panel tengah: timeline & checklist */}
          <Card>
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Timeline</h3>
            <TransactionTimeline steps={tx.timeline} />

            <h3 className="font-semibold mt-6 mb-3 text-xs uppercase tracking-wider text-slate-500">
              Checklist Serah Terima
            </h3>
            <div className="space-y-2">
              {tx.checklist.map((c, i) => (
                <label key={i} className="flex items-center gap-2 text-xs text-txt-secondary">
                  <input type="checkbox" defaultChecked={c.checked} className="accent-blue-600 rounded" />
                  {c.label}
                </label>
              ))}
            </div>
          </Card>

          {/* Panel kanan: aksi admin */}
          <Card>
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Aksi Admin Escrow</h3>
            <div className="space-y-3">
              <ActionPanel status={tx.status} />

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => setDisputeModalOpen(true)}
                  className="w-full py-2 px-3 rounded-xl border border-rose-200 text-rose-700 bg-rose-50/50 hover:bg-rose-100 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <AlertTriangle size={13} /> Kelola Sengketa & Refund
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Section Brankas Data Akun (Vault) */}
        <div>
          <AccountVaultPanel
            transactionId={tx.id}
            role="ADMIN"
          />
        </div>

        {/* Section Room Chat 3 Arah */}
        <div>
          <TransactionChat
            transactionId={tx.id}
            defaultRole="ADMIN"
            defaultUserName={tx.admin.user.username}
            buyerName={tx.buyer.username}
            sellerName={tx.listing.seller.username}
            adminName={tx.admin.user.username}
          />
        </div>
      </div>

      {/* Admin Dispute & Refund Modal */}
      <DisputeModal
        isOpen={disputeModalOpen}
        onClose={() => setDisputeModalOpen(false)}
        transactionId={tx.id}
        isAdmin={true}
      />
    </div>
  );
}
