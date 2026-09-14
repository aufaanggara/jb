import { HeroSearch } from "@/components/landing/HeroSearch";
import { FeaturedGrid } from "@/components/landing/FeaturedGrid";

export default function HomePage() {
  return (
    <>
      {/* Hero search bar — Glints style */}
      <HeroSearch />

      {/* Featured listings with game tabs + "Lihat Semua Katalog" button */}
      <FeaturedGrid />
    </>
  );
}
