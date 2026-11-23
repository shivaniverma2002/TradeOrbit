import type { Metadata } from "next";
import CategorySection from "@/components/marketplace/CategorySection";
import FeaturedProducts from "@/components/marketplace/FeaturedProducts";
import HeroSection from "@/components/marketplace/HeroSection";
import PromotionalBanner from "@/components/marketplace/PromotionalBanner";
import TrendingDeals from "@/components/marketplace/TrendingDeals";
import VendorSpotlight from "@/components/marketplace/VendorSpotlight";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "TradeOrbit | Demo Marketplace",
  description: "A responsive demonstration marketplace homepage for TradeOrbit."
};

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-surface-50">
      <SiteHeader />
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <div className="bg-white">
          <TrendingDeals />
        </div>
        <VendorSpotlight />
        <PromotionalBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
