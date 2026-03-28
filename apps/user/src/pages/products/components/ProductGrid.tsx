import type { CatalogProduct } from "@/features/catalog/catalog.types";
import { ProductCard } from "@/components/cards/ProductCard";

export default function ProductGrid({ products }: { products: CatalogProduct[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
