import { cn } from "@/lib/utils";

const variants = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  primary: "bg-blue-50 text-blue-700 border-blue-200",
  gold: "bg-amber-50 text-amber-700 border-amber-200",
  neutral: "bg-slate-100 text-slate-700 border-slate-200",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium tracking-normal",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
