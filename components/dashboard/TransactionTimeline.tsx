import { CheckCircle2, Circle } from "lucide-react";
import type { TimelineStep } from "@/types";

export function TransactionTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            {step.done ? (
              <CheckCircle2 className="text-accent-success" size={20} />
            ) : (
              <Circle className="text-txt-muted" size={20} />
            )}
            {i < steps.length - 1 && (
              <div className={`w-px flex-1 mt-1 ${step.done ? "bg-accent-success/40" : "bg-border"}`} style={{ minHeight: 24 }} />
            )}
          </div>
          <div className="pb-2">
            <p className={`text-sm font-medium ${step.done ? "text-txt-primary" : "text-txt-muted"}`}>{step.label}</p>
            {step.timestamp && <p className="text-xs text-txt-muted mt-0.5">{step.timestamp}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
