// Ghép các section của trang home lại với nhau thôi k có logic nhé
import HeroSection from "./components/HeroSection";
import FeaturedCategorySection from "./components/FeaturedCategorySection"; 
import ProductShowcaseSection from "./components/ProductShowcaseSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedCategorySection />
      <ProductShowcaseSection />
    </div>
  );
}
