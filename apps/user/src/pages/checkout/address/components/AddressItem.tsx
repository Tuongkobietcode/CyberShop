import { Pencil, X } from "lucide-react";
import type { CheckoutAddress } from "@/features/cart/cart.types";

export default function AddressItem({
  address,
  checked,
  onSelect,
  onEdit,
  onDelete,
}: {
  address: CheckoutAddress;
  checked: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="flex items-start justify-between rounded-2xl bg-[#f6f6f6] px-6 py-8">
      <div className="flex gap-5">
        <input type="radio" checked={checked} onChange={onSelect} className="mt-2 h-7 w-7" />
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="text-[1.8rem] font-medium tracking-[-0.04em] text-[#202348]">{address.fullName}</h3>
            <span className="rounded-md bg-black px-3 py-1 text-sm font-medium text-white">{address.label}</span>
          </div>
          <p className="mt-4 text-[1.2rem] leading-9 text-[#202348]">{address.addressLine1}, {address.city}</p>
          <p className="text-[1.2rem] leading-9 text-[#202348]">{address.phone}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-black">
        <button type="button" onClick={onEdit}><Pencil className="h-6 w-6" /></button>
        <button type="button" onClick={onDelete}><X className="h-7 w-7" /></button>
      </div>
    </article>
  );
}
