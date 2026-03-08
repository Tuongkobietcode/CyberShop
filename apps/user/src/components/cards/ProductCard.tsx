import { Link } from "react-router-dom";
import type { CatalogProduct } from "@/features/catalog/catalog.types";

function formatMoney(value: number) {
  return value.toLocaleString("vi-VN");
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[4/3] bg-[linear-gradient(180deg,_#f8fafc,_#e2e8f0)] p-6">
        <img
          src={product.image || "https://placehold.co/320x240?text=Product"}
          alt={product.name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {product.category?.name || "Catalog"}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{product.name}</h3>
        </div>
        <div className="flex items-end gap-3">
          <span className="text-xl font-semibold text-slate-900">{formatMoney(product.price)}</span>
          {product.compareAtPrice ? (
            <span className="text-sm text-slate-400 line-through">
              {formatMoney(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
