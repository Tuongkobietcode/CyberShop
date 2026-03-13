import { Link } from "react-router-dom";
import type { CatalogCategory } from "@/features/catalog/catalog.types";
import { resolveAssetUrl } from "@/utils/assets";

export function CategoryCard({ category }: { category: CatalogCategory }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group flex items-center gap-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <img
        src={resolveAssetUrl(category.image || "/assets/images/iphone-fallback.png")}
        alt={category.name}
        className="h-16 w-16 rounded-2xl object-cover"
      />
      <div>
        <h3 className="font-semibold text-slate-900">{category.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{category.description || "Browse this collection"}</p>
      </div>
    </Link>
  );
}


