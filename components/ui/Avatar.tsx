import { cn } from "@/lib/utils";

const gradients = [
  "from-blue-600 to-indigo-500 text-white border-blue-400",
  "from-indigo-600 to-purple-500 text-white border-indigo-400",
  "from-emerald-600 to-teal-500 text-white border-emerald-400",
  "from-amber-600 to-orange-500 text-white border-amber-400",
  "from-slate-700 to-slate-900 text-white border-slate-600",
];

function getGradientByName(name: string) {
  const safeName = name || "User";
  let hash = 0;
  for (let i = 0; i < safeName.length; i++) {
    hash = safeName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export function Avatar({
  name = "User",
  size = 48,
  className,
}: {
  name?: string;
  size?: number;
  className?: string;
}) {
  const safeName = name || "User";
  const initials =
    safeName
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const fontSize =
    size <= 32
      ? "text-[11px] font-semibold"
      : size <= 44
      ? "text-xs font-bold"
      : size <= 60
      ? "text-sm font-bold"
      : "text-lg font-bold";

  const gradientClass = getGradientByName(safeName);

  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br border shadow-sm font-semibold tracking-tight select-none",
        gradientClass,
        fontSize,
        className
      )}
    >
      {initials}
    </div>
  );
}
