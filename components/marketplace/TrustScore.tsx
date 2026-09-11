import { trustLabel } from "@/lib/utils";

export function TrustScore({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const { label, color } = trustLabel(score);
  const sizes = { sm: "text-2xl", md: "text-3xl", lg: "text-5xl" };
  return (
    <div className="flex flex-col items-center">
      <span className={`font-display font-bold ${sizes[size]} ${color}`}>{score.toFixed(1)}</span>
      <span className="text-xs uppercase tracking-wider text-txt-muted mt-1">Trust Score</span>
      <span className={`text-xs font-semibold mt-0.5 ${color}`}>{label}</span>
    </div>
  );
}
