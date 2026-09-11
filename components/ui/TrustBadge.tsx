import { ShieldCheck } from "lucide-react";

export function TrustBadge({ size = "md" }: { size?: "sm" | "md" }) {
  const iconSize = size === "sm" ? 12 : 14;
  return (
    <span className={`inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-1.5 py-0.5 ${size === "sm" ? "text-[11px]" : "text-xs"}`}>
      <ShieldCheck size={iconSize} className="text-emerald-600 shrink-0" />
      <span>Terverifikasi</span>
    </span>
  );
}
