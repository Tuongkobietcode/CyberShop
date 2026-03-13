import { X } from "lucide-react";
import type { CartItem as CartItemType } from "@/features/cart/cart.types";
import { resolveAssetUrl } from "@/utils/assets";

function formatMoney(value: number) {
  return `$${Math.round(value / 16000).toLocaleString("en-US")}`;
}

export default function CartItem({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}: {
  item: CartItemType;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
}) {
  return (
    <article className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-6">
        <div className="flex h-[120px] w-[120px] items-center justify-center rounded-3xl bg-white p-4">
          <img src={resolveAssetUrl(item.image)} alt={item.name} className="max-h-full object-contain" />
        </div>
        <div>
          <h3 className="max-w-[280px] text-[1.1rem] font-medium leading-8 text-black">{item.name}</h3>
          <p className="mt-3 text-[1.15rem] text-black/65">#{item.sku}</p>
        </div>
      </div>

      <div className="flex items-center gap-6 self-end sm:self-auto">
        <div className="flex items-center gap-3 text-2xl text-black">
          <button type="button" onClick={onDecrease} className="h-10 w-10">-</button>
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-black/10 text-base">{item.quantity}</div>
          <button type="button" onClick={onIncrease} className="h-10 w-10">+</button>
        </div>
        <p className="min-w-[88px] text-right text-[2rem] font-medium tracking-[-0.04em] text-black">
          {formatMoney(item.price * item.quantity)}
        </p>
        <button type="button" onClick={onRemove} className="text-black/70">
          <X className="h-7 w-7" />
        </button>
      </div>
    </article>
  );
}
