import HeroSection from "./components/HeroSection";
import FeaturedCategorySection from "./components/FeaturedCategorySection";
import BrowseCategorySection from "./components/BrowseCategorySection";
import ProductShowcaseSection from "./components/ProductShowcaseSection";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#040608_0%,#020304_20%,#010203_52%,#020305_78%,#010203_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_8%,rgba(255,255,255,0.03),transparent_18%),radial-gradient(circle_at_78%_8%,rgba(152,178,222,0.02),transparent_14%),radial-gradient(circle_at_64%_30%,rgba(66,90,130,0.08),transparent_22%),radial-gradient(circle_at_18%_58%,rgba(69,94,136,0.05),transparent_18%),radial-gradient(circle_at_82%_72%,rgba(188,216,255,0.012),transparent_16%)]" />
      <div className="pointer-events-none absolute left-[-12%] top-[4%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(65,92,138,0.08),rgba(65,92,138,0)_72%)] blur-[150px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[2%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(188,214,255,0.02),rgba(188,214,255,0)_72%)] blur-[150px]" />

      <HeroSection />
      <FeaturedCategorySection />
      <BrowseCategorySection />
      <ProductShowcaseSection />
    </div>
  );
}
