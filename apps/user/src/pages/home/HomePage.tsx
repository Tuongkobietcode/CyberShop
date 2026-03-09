import HeroSection from "./components/HeroSection";
import FeaturedCategorySection from "./components/FeaturedCategorySection";
import BrowseCategorySection from "./components/BrowseCategorySection";
import ProductShowcaseSection from "./components/ProductShowcaseSection";

export default function HomePage() {
  return (
    <div className="bg-[#f6f6f6] text-slate-900">
      <HeroSection />
      <FeaturedCategorySection />
      <BrowseCategorySection />
      <ProductShowcaseSection />
    </div>
  );
}
