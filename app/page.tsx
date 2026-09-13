import { HeroSearch } from "@/components/landing/HeroSearch";
import { FeaturedGrid } from "@/components/landing/FeaturedGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrustSafety } from "@/components/landing/TrustStats";

export default function HomePage() {
  return (
    <>
      {/* Hero search bar — Glints style */}
      <HeroSearch />

      {/* Featured listings with game tabs + "Lihat Semua Katalog" button */}
      <FeaturedGrid />

      {/* Cara Kerja Rekber 3 Langkah */}
      <HowItWorks />

      {/* Standar Keamanan & Proteksi Rekber */}
      <TrustSafety />
    </>
  );
}
