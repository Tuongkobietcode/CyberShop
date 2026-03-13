import { Link } from "react-router-dom";

function formatMoney(value: number) {
  return `$${Math.round(value / 16000).toLocaleString("en-US")}`;
}

export default function OrderSummary({
  subtotal,
  tax,
  shippingFee,
  total,
}: {
  subtotal: number;
  tax: number;
  shippingFee: number;
  total: number;
}) {
  return (
    <div className="rounded-[28px] border border-black/10 bg-white p-8">
      <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-black">Order Summary</h2>

      <div className="mt-10 space-y-6">
        <div>
          <p className="mb-3 text-[1.05rem] text-black/65">Discount code / Promo code</p>
          <input className="h-16 w-full rounded-2xl border border-black/10 px-4 text-base outline-none" placeholder="Code" />
        </div>
        <div>
          <p className="mb-3 text-[1.05rem] text-black/65">Your bonus card number</p>
          <div className="flex rounded-2xl border border-black/10 p-2">
            <input className="h-14 flex-1 px-4 text-base outline-none" placeholder="Enter Card Number" />
            <button type="button" className="h-14 rounded-xl border border-black px-6 text-sm font-medium text-black">Apply</button>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-6 text-[1.15rem]">
        <div className="flex items-center justify-between font-medium text-black">
          <span>Subtotal</span>
          <span>{formatMoney(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-black/58">
          <span>Estimated Tax</span>
          <span>{formatMoney(tax)}</span>
        </div>
        <div className="flex items-center justify-between text-black/58">
          <span>Estimated shipping & Handling</span>
          <span>{formatMoney(shippingFee)}</span>
        </div>
        <div className="flex items-center justify-between text-[1.35rem] font-semibold text-black">
          <span>Total</span>
          <span>{formatMoney(total)}</span>
        </div>
      </div>

      <Link to="/checkout/address" className="mt-10 inline-flex h-16 w-full items-center justify-center rounded-xl bg-black text-lg font-medium text-white transition hover:bg-[#1d1d1d]">
        Checkout
      </Link>
    </div>
  );
}
