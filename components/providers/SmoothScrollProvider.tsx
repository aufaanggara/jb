"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initLenis, destroyLenis } from "@/lib/lenis";
import { initScrollAnimations, cleanupScrollAnimations } from "@/lib/gsap-animations";

// Bungkus seluruh app. Menyalakan Lenis smooth-scroll + men-scan DOM
// untuk elemen .reveal / .stagger-children / .count-up setiap kali route
// berubah, lalu re-init GSAP ScrollTrigger untuk halaman baru.
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    // beri waktu 1 frame supaya DOM halaman baru sudah ter-render sebelum di-scan
    const id = requestAnimationFrame(() => {
      cleanupScrollAnimations();
      initScrollAnimations();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
