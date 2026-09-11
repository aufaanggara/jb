"use client";
import { useEffect, useRef } from "react";

// Custom cursor: dot 6px mengikuti mouse persis, ring 28px mengikuti
// dengan sedikit delay (lerp) sehingga terasa "premium". mix-blend-mode:
// difference bikin warnanya otomatis invert di atas background apapun.
//
// PERF NOTE: ukuran ring disimpan di variabel biasa (ringSize), BUKAN
// dibaca dari DOM (offsetWidth) di dalam loop animasi. Membaca ukuran
// elemen di setiap frame animasi memaksa browser menghitung ulang layout
// tiap frame ("layout thrashing") — ini penyebab utama layar terasa
// "getar" terutama saat ada elemen lain (mis. navbar blur) yang juga
// sedang animasi bersamaan.
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0,
      ringSize = 28;
    let raf: number;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
      }
    }

    function onHoverIn() {
      ringSize = 56;
      ringRef.current?.style.setProperty("width", "56px");
      ringRef.current?.style.setProperty("height", "56px");
    }
    function onHoverOut() {
      ringSize = 28;
      ringRef.current?.style.setProperty("width", "28px");
      ringRef.current?.style.setProperty("height", "28px");
    }

    function animate() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - ringSize / 2}px, ${ringY - ringSize / 2}px)`;
      }
      raf = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="custom-cursor hidden md:block">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
