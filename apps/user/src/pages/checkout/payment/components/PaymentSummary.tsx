import type { CartItem, CheckoutAddress, ShippingMethod } from "@/features/cart/cart.types";
import { resolveAssetUrl } from "@/utils/assets";

function formatMoney(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PaymentSummary({
  items,
  address,
  shippingMethod,
  subtotal,
  tax,
  shippingFee,
  total,
}: {
  items: CartItem[];
  address: CheckoutAddress | undefined;
  shippingMethod: ShippingMethod | undefined;
  subtotal: number;
  tax: number;
  shippingFee: number;
  total: number;
}) {
  return (
    <div className="rounded-[28px] border border-black/10 bg-white p-6">
      <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-black">Summary</h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 rounded-2xl bg-[#f6f6f6] p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2">
              <img src={resolveAssetUrl(item.image)} alt={item.name} className="max-h-full object-contain" />
            </div>
            <p className="flex-1 text-[1.05rem] font-medium text-black">{item.name}</p>
            <p className="text-[1.6rem] font-semibold tracking-[-0.04em] text-black">{formatMoney(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-2 text-[1.05rem] text-black/72">
        <p>Address</p>
        <p className="text-[1.15rem] text-black">{address ? `${address.addressLine1}, ${address.city}` : "No address selected"}</p>
      </div>

      <div className="mt-6 space-y-2 text-[1.05rem] text-black/72">
        <p>Shipment method</p>
        <p className="text-[1.15rem] text-black">{shippingMethod?.label || "Free"}</p>
      </div>

      <div className="mt-8 space-y-5 text-[1.15rem]">
        <div className="flex items-center justify-between font-medium text-black"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
        <div className="flex items-center justify-between text-black/58"><span>Estimated Tax</span><span>{formatMoney(tax)}</span></div>
        <div className="flex items-center justify-between text-black/58"><span>Estimated shipping & Handling</span><span>{formatMoney(shippingFee)}</span></div>
        <div className="flex items-center justify-between text-[1.35rem] font-semibold text-black"><span>Total</span><span>{formatMoney(total)}</span></div>
      </div>
    </div>
  );
}
