"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initLenis, destroyLenis, getLenis, scrollToPosition } from "@/lib/lenis";
import { initScrollAnimations, cleanupScrollAnimations } from "@/lib/gsap-animations";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPopStateRef = useRef(false);
  const restoreTimerRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    initLenis();

    // 2. Disable browser auto scroll restoration so we have full deterministic control
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 3. Mark popstate (browser back/forward button or history.back())
    const handlePopState = () => {
      isPopStateRef.current = true;
    };

    // 4. Also listen for custom back navigation event
    const handleAppBack = () => {
      isPopStateRef.current = true;
    };

    // 5. Continuous throttled scroll position recording
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        try {
          const key = window.location.pathname + window.location.search;
          sessionStorage.setItem("scroll_pos_" + key, String(window.scrollY));
        } catch (e) {}
      }, 100);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("app:back", handleAppBack);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("app:back", handleAppBack);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    // Clear any pending restore timers from previous navigation
    restoreTimerRef.current.forEach(clearTimeout);
    restoreTimerRef.current = [];

    const currentKey = window.location.pathname + window.location.search;
    const isBack = isPopStateRef.current;

    if (isBack) {
      // User navigated back/forward -> Restore previous scroll position
      try {
        const saved = sessionStorage.getItem("scroll_pos_" + currentKey);
        const targetY = saved ? parseInt(saved, 10) : 0;

        if (!isNaN(targetY) && targetY > 0) {
          // Attempt restoration across multiple frames as React mounts components
          const tryRestore = () => {
            scrollToPosition(targetY, true);
          };

          // Immediate attempt
          tryRestore();

          // Follow-up attempts at increasing intervals to ensure content height has settled
          const delays = [30, 80, 150, 300, 500];
          delays.forEach((delay) => {
            const timer = setTimeout(tryRestore, delay);
            restoreTimerRef.current.push(timer);
          });
        }
      } catch (e) {}

      // Reset popstate flag after handing restoration
      const resetTimer = setTimeout(() => {
        isPopStateRef.current = false;
      }, 600);
      restoreTimerRef.current.push(resetTimer);
    } else {
      // Forward navigation -> Scroll to top
      scrollToPosition(0, true);
    }

    // Refresh scroll animations
    const id = requestAnimationFrame(() => {
      cleanupScrollAnimations();
      initScrollAnimations();
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, [pathname]);

  return <>{children}</>;
}
