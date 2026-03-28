import Breadcrumb from "@/components/layout/Breadcrumb";
import { useCart } from "@/features/cart/cart.context";
import CartList from "./components/CartList";
import OrderSummary from "./components/OrderSummary";

export default function CartPage() {
  const { items, subtotal, shippingFee, tax, total, updateQuantity, removeItem } = useCart();

  return (
    <div className="pb-24">
      <Breadcrumb items={[{ label: "Home", to: "/home" }, { label: "Cart" }]} />

      <div className="cy-shell pt-10 sm:pt-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-10">
            <div className="max-w-3xl">
              <span className="cy-kicker">Shopping Bag</span>
              <h1 className="cy-display mt-5 max-w-[12ch]">Build the order before the payment flow starts.</h1>
              <p className="cy-copy mt-5 max-w-2xl">
                Review devices, adjust quantities, and confirm the totals before moving into shipping and payment.
              </p>
            </div>

            {items.length === 0 ? (
              <div className="cy-panel px-8 py-16 text-center">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Cart is empty</p>
                <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-secondary)]">
                  Add a few devices to start your order. The checkout flow will unlock automatically once something is in the bag.
                </p>
              </div>
            ) : (
              <div className="cy-panel overflow-hidden p-5 sm:p-7">
                <div className="mb-6 flex items-center justify-between gap-4 border-b border-[var(--line-soft)] pb-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Active order</p>
                    <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">
                      {items.length} {items.length === 1 ? "device" : "devices"} ready
                    </p>
                  </div>
                  <div className="rounded-full border border-[var(--line-soft)] bg-white/[0.03] px-4 py-2 text-sm text-[var(--text-secondary)]">
                    Tax and shipping calculated live
                  </div>
                </div>

                <CartList
                  items={items}
                  onDecrease={(id, quantity) => updateQuantity(id, Math.max(1, quantity))}
                  onIncrease={updateQuantity}
                  onRemove={removeItem}
                />
              </div>
            )}
          </section>

          <aside>
            <OrderSummary subtotal={subtotal} tax={tax} shippingFee={shippingFee} total={total} />
          </aside>
        </div>
      </div>
    </div>
  );
}
