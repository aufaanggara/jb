import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "success" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm hover:shadow transition-all border border-transparent",
  secondary:
    "bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-300 shadow-sm hover:border-slate-400 transition-all",
  outline:
    "border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold bg-transparent transition-all",
  success:
    "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm hover:shadow transition-all",
  danger:
    "bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm hover:shadow transition-all",
  ghost:
    "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium transition-all",
};

const sizes = {
  sm: "text-xs px-3 py-1.5 rounded-lg",
  md: "text-sm px-4 py-2 rounded-lg",
  lg: "text-base px-6 py-2.5 rounded-lg",
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
