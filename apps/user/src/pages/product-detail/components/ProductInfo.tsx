import { ShieldCheck, Sparkles, Truck } from "lucide-react";
import type { CatalogProduct } from "@/features/catalog/catalog.types";
import { formatCurrencyVnd } from "@/utils/format";
import VariantSelector from "./VariantSelector";

export default function ProductInfo({
  product,
  selectedColor,
  onSelectColor,
  selectedCapacity,
  onSelectCapacity,
}: {
  product: CatalogProduct;
  selectedColor: string;
  onSelectColor: (value: string) => void;
  selectedCapacity: string;
  onSelectCapacity: (value: string) => void;
}) {
  const infoTiles = [
    { label: "Display", value: product.screenDiagonal || "Studio panel" },
    { label: "Screen type", value: product.screenType || "OLED" },
      { label: "Battery", value: product.batteryCapacity || "All-day" },
      { label: "Protection", value: product.protectionClass || "Premium build" },
      { label: "Storage", value: product.builtInMemory || "Flagship" },
      { label: "Line", value: product.category?.name || "Apple hardware" },
    ];

  return (
    <div>
      <p className="cy-kicker">{product.category?.name || "Apple hardware"}</p>
      <h1 className="mt-3 text-[2.5rem] font-semibold tracking-[-0.05em] text-white sm:text-[3.2rem]">
        {product.name}
      </h1>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <span className="font-mono text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.35rem]">
          {formatCurrencyVnd(product.price)}
        </span>
        {product.compareAtPrice ? (
          <span className="pb-1 font-mono text-lg text-white/30 line-through">
            {formatCurrencyVnd(product.compareAtPrice)}
          </span>
        ) : null}
      </div>

      <p className="mt-5 max-w-[42rem] text-[15px] leading-7 text-white/62">
        {product.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="cy-chip">{product.category?.name || "Electronics"}</span>
        <span className="cy-chip">{product.displayStatus || "Featured"}</span>
        <span className="cy-chip">{selectedCapacity}</span>
      </div>

      <div className="mt-8">
        <VariantSelector
          colors={["#10141A", "#334155", "#9AA5B1", "#5B6070", "#DCE4ED"]}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
          capacities={["128GB", "256GB", "512GB", "1TB"]}
          selectedCapacity={selectedCapacity}
          onSelectCapacity={onSelectCapacity}
        />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {infoTiles.map((item) => (
          <div
            key={item.label}
            className="rounded-[24px] border border-white/8 bg-white/[0.03] px-4 py-4"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/34">
              {item.label}
            </p>
            <p className="mt-2 text-sm font-medium text-white/82">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-white/62">
          <Truck className="h-5 w-5 text-[var(--accent)]" />
          <div>
            <p>Fast delivery</p>
            <p className="font-medium text-white">1-2 business days</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-white/62">
          <ShieldCheck className="h-5 w-5 text-[var(--accent)]" />
          <div>
            <p>Warranty</p>
            <p className="font-medium text-white">Official 12 months</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-white/62">
          <Sparkles className="h-5 w-5 text-[var(--accent)]" />
          <div>
            <p>Condition</p>
            <p className="font-medium text-white">Premium finish</p>
          </div>
        </div>
      </div>
    </div>
  );
}
