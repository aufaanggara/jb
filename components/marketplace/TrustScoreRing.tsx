"use client";

export function TrustScoreRing({ score, size = 96 }: { score: number; size?: number }) {
  const strokeWidth = size * 0.085;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.min(Math.max(score, 0), 100);
  const offset = circumference - (safeScore / 100) * circumference;

  const gradientId = `score-grad-${Math.round(score)}-${size}`;
  const isElite = score >= 90;
  const isHigh = score >= 75;

  const gradStart = isElite ? "#10b981" : isHigh ? "#2563eb" : "#f59e0b";
  const gradEnd = isElite ? "#059669" : isHigh ? "#1d4ed8" : "#d97706";

  return (
    <div className="relative flex flex-col items-center justify-center shrink-0">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />

        {/* Animated Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>

      {/* Center Score Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-bold text-lg sm:text-xl text-slate-900 leading-none">
          {Math.round(score)}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">
          {isElite ? "SKOR" : "SKOR"}
        </span>
      </div>
    </div>
  );
}
