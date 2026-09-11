import { Clock, CheckCircle, RefreshCw, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TransactionStatus } from "@/types";

const statusConfig: Record<
  TransactionStatus,
  { label: string; icon: typeof Clock; classes: string }
> = {
  PENDING_PAYMENT:       { label: "Menunggu Transfer", icon: Clock,        classes: "bg-warning/15 text-warning border-warning/30" },
  PAYMENT_CONFIRMED:     { label: "Dana Masuk",        icon: CheckCircle,  classes: "bg-accent-primary/15 text-accent-primary border-accent-primary/30" },
  IN_HANDOVER:           { label: "Serah Terima",      icon: RefreshCw,    classes: "bg-accent-purple/15 text-accent-purple border-accent-purple/30" },
  PENDING_BUYER_CONFIRM: { label: "Konfirmasi Buyer",  icon: Clock,        classes: "bg-warning/15 text-warning border-warning/30" },
  COMPLETED:             { label: "Selesai",           icon: CheckCircle2, classes: "bg-success/15 text-success border-success/30" },
  DISPUTED:              { label: "Sengketa",          icon: AlertTriangle, classes: "bg-danger/15 text-danger border-danger/30" },
  CANCELLED:              { label: "Dibatalkan",       icon: XCircle,      classes: "bg-white/5 text-txt-secondary border-border" },
};

export function StatusBadge({ status }: { status: TransactionStatus }) {
  const { label, icon: Icon, classes } = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-all", classes)}>
      <Icon size={12} /> {label}
    </span>
  );
}
