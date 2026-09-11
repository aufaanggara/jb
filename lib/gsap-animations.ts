// Kumpulan animasi scroll global. Dipanggil sekali per halaman dari
// SmoothScrollProvider setelah DOM siap. Elemen target ditandai lewat
// className: .reveal, .stagger-children, .count-up
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initScrollAnimations(scope: HTMLElement | Document = document) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray<Element>(scope.querySelectorAll(".reveal")).forEach((el) => {
    gsap.fromTo(
      el,
      { y: 50, opacity: 0, filter: "blur(4px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
      }
    );
  });

  gsap.utils.toArray<Element>(scope.querySelectorAll(".stagger-children")).forEach((container) => {
    const children = container.querySelectorAll(":scope > *");
    gsap.fromTo(
      children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: container, start: "top 85%" },
      }
    );
  });

  gsap.utils.toArray<Element>(scope.querySelectorAll(".count-up")).forEach((el) => {
    const target = parseInt(el.getAttribute("data-target") || "0", 10);
    gsap.fromTo(
      el,
      { innerHTML: 0 },
      {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        scrollTrigger: { trigger: el, start: "top 80%" },
        onUpdate: function () {
          el.innerHTML = Math.floor(Number(el.innerHTML)).toLocaleString("id-ID");
        },
      }
    );
  });
}

export function cleanupScrollAnimations() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
