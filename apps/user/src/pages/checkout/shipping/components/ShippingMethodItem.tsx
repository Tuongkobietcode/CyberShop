import type { ShippingMethod } from "@/features/cart/cart.types";

export default function ShippingMethodItem({
  method,
  checked,
  onSelect,
}: {
  method: ShippingMethod;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 rounded-2xl border border-black/12 bg-white px-6 py-8 text-left transition hover:border-black/25"
    >
      <input type="radio" checked={checked} readOnly className="h-7 w-7" />
      <div className="flex flex-wrap items-center gap-6 text-[1.15rem]">
        <span className={checked ? "font-semibold text-black" : "text-black/35"}>{method.label}</span>
        <span className={checked ? "text-black/75" : "text-black/30"}>{method.description}</span>
      </div>
      <span className={checked ? "text-[1.1rem] font-medium text-[#202348]" : "text-[1.1rem] text-black/28"}>{method.etaLabel}</span>
    </button>
  );
}
