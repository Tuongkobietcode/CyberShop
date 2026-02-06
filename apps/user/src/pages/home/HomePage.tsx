// Ghép các section của trang home lại với nhau thôi k có logic nhé
import HeroSection from "./components/HeroSection";
import FeaturedCategorySection from "./components/FeaturedCategorySection"; 

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedCategorySection />
    </div>
  );
}
