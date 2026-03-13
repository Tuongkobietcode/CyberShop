import { Cpu, HardDrive, PackageCheck, Smartphone, Star, Truck } from "lucide-react";
import type { CatalogProduct } from "@/features/catalog/catalog.types";
import VariantSelector from "./VariantSelector";

function formatMoney(value: number) {
  return `$${Math.round(value / 16000).toLocaleString("en-US")}`;
}

const infoTiles = [
  { label: "Screen size", value: '6.7"', icon: Smartphone },
  { label: "CPU", value: "Apple A16 Bionic", icon: Cpu },
  { label: "Number of Cores", value: "6", icon: Cpu },
  { label: "Main camera", value: "48-12-12 MP", icon: Star },
  { label: "Front camera", value: "12 MP", icon: Star },
  { label: "Battery capacity", value: "4323 mAh", icon: HardDrive },
];

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
  return (
    <div>
      <h1 className="text-[2.5rem] font-semibold tracking-[-0.05em] text-black">{product.name}</h1>
      <div className="mt-4 flex items-end gap-3">
        <span className="text-[2rem] font-semibold tracking-[-0.04em] text-black">{formatMoney(product.price)}</span>
        {product.compareAtPrice ? (
          <span className="pb-1 text-xl text-black/30 line-through">{formatMoney(product.compareAtPrice)}</span>
        ) : null}
      </div>

      <VariantSelector
        colors={["#1f2020", "#7441e1", "#d60f0f", "#f3bd00", "#e5e5e5"]}
        selectedColor={selectedColor}
        onSelectColor={onSelectColor}
        capacities={["128GB", "256GB", "512GB", "1TB"]}
        selectedCapacity={selectedCapacity}
        onSelectCapacity={onSelectCapacity}
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {infoTiles.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl bg-[#f4f4f4] px-4 py-3 text-sm text-black/55">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
              <p className="mt-2 font-medium text-black">{item.value}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-[15px] leading-7 text-black/58">
        Enhanced capabilities thanks to an enlarged display of {selectedCapacity}, wide brightness and crisp contrast. Crisp and immersive experience tuned to a clean premium hardware story.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl bg-[#f4f4f4] p-4 text-sm text-black/65">
          <Truck className="h-5 w-5" />
          <div>
            <p>Free Delivery</p>
            <p className="font-medium text-black">1-2 day</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-[#f4f4f4] p-4 text-sm text-black/65">
          <PackageCheck className="h-5 w-5" />
          <div>
            <p>In Stock</p>
            <p className="font-medium text-black">Today</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-[#f4f4f4] p-4 text-sm text-black/65">
          <Star className="h-5 w-5" />
          <div>
            <p>Guaranteed</p>
            <p className="font-medium text-black">1 year</p>
          </div>
        </div>
      </div>
    </div>
  );
}
