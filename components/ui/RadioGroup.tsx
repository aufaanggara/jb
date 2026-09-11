"use client";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export const RadioGroup = RadioGroupPrimitive.Root;

export function RadioItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "h-4 w-4 shrink-0 rounded-full border border-slate-300 bg-white data-[state=checked]:border-blue-600 flex items-center justify-center transition-colors cursor-pointer",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="h-2 w-2 rounded-full bg-blue-600" />
    </RadioGroupPrimitive.Item>
  );
}
