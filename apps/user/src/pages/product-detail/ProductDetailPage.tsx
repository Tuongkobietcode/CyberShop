import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductDetail } from "@/features/product/product.service";
import type { ProductDetail } from "@/features/product/product.types";

function formatMoney(value: number) {
  return value.toLocaleString("vi-VN");
}

export default function ProductDetailPage() {
  const { slug = "" } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setProduct(await getProductDetail(slug));
    }

    loadProduct();
  }, [slug]);

  if (!product) {
    return <div className="min-h-screen bg-[#f8fafc] px-4 py-16 text-center text-sm text-slate-500">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
        <div className="rounded-[32px] bg-white p-8 shadow-sm">
          <img
            src={product.image || "https://placehold.co/640x480?text=Product"}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <Link to="/products" className="text-sm text-slate-500 hover:text-slate-900">
            Back to products
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-slate-400">
            {product.category?.name || "Product"}
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">{product.name}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{product.description}</p>

          <div className="mt-8 flex items-end gap-4">
            <span className="text-3xl font-semibold text-slate-900">{formatMoney(product.price)}</span>
            {product.compareAtPrice ? (
              <span className="text-lg text-slate-400 line-through">{formatMoney(product.compareAtPrice)}</span>
            ) : null}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Stock</p>
              <p className="mt-1 text-lg font-medium text-slate-900">{product.stock}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">SKU</p>
              <p className="mt-1 text-lg font-medium text-slate-900">{product.sku}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
