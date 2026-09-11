"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function DetailBackButton() {
  const router = useRouter();
  const [backText, setBackText] = useState("Kembali");
  const [fallbackHref, setFallbackHref] = useState<string>("/");

  useEffect(() => {
    try {
      const origin = sessionStorage.getItem("last_listing_origin");
      if (origin === "/" || origin === "") {
        setBackText("Kembali ke Beranda");
        setFallbackHref("/");
      } else if (origin && origin.startsWith("/listings")) {
        setBackText("Kembali ke Katalog");
        setFallbackHref(origin);
      } else if (origin) {
        setBackText("Kembali");
        setFallbackHref(origin);
      } else {
        setBackText("Kembali");
        setFallbackHref("/listings");
      }
    } catch (e) {}
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Notify scroll provider that this is a back navigation
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("app:back"));
      if (window.history.length > 1) {
        window.history.back();
      } else {
        router.push(fallbackHref);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer bg-transparent border-0 p-0"
    >
      <ArrowLeft size={14} />
      <span>{backText}</span>
    </button>
  );
}
