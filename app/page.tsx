import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturedListings } from "@/components/landing/FeaturedListings";
import { FeeCalculator } from "@/components/landing/FeeCalculator";
import { TopAdmins } from "@/components/landing/TopAdmins";
import { TrustSafety } from "@/components/landing/TrustStats";
import { FAQ } from "@/components/landing/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedListings />
      <FeeCalculator />
      <TopAdmins />
      <TrustSafety />
      <FAQ />
    </>
  );
}
