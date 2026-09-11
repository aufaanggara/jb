import { Crown } from "lucide-react";

// Badge "Top Rekber" — hanya untuk rank 1-3 di direktori/landing.
export function CrownBadge({ rank }: { rank: number }) {
  return (
    <div className="absolute -top-3 -left-3 flex items-center gap-1 rounded-full bg-gradient-to-br from-accent-gold to-amber-600 text-black px-2.5 py-1 text-xs font-bold shadow-[0_0_20px_rgba(251,191,36,0.4)]">
      <Crown size={12} /> #{rank}
    </div>
  );
}
