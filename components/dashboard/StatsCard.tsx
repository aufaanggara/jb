import { Card } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

export function StatsCard({
  label,
  value,
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  accent?: "primary" | "success" | "warning" | "gold";
}) {
  const colors = {
    primary: "text-accent-primary",
    success: "text-accent-success",
    warning: "text-accent-warning",
    gold: "text-accent-gold",
  };
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-wider text-txt-muted mb-1">{label}</p>
        <p className="font-display text-2xl font-bold">{value}</p>
      </div>
      {Icon && <Icon className={colors[accent]} size={28} />}
    </Card>
  );
}
