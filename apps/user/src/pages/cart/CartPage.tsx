import Breadcrumb from "@/components/layout/Breadcrumb";
import { useCart } from "@/features/cart/cart.context";
import CartList from "./components/CartList";
import OrderSummary from "./components/OrderSummary";

export default function CartPage() {
  const { items, subtotal, shippingFee, tax, total, updateQuantity, removeItem } = useCart();

  return (
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb items={[{ label: "Home", to: "/home" }, { label: "Cart" }]} />

      <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_560px]">
          <div>
            <h1 className="text-[3rem] font-semibold tracking-[-0.05em] text-black">Shopping Cart</h1>
            <div className="mt-10">
              <CartList
                items={items}
                onDecrease={(id, quantity) => updateQuantity(id, Math.max(1, quantity))}
                onIncrease={updateQuantity}
                onRemove={removeItem}
              />
              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-black/10 px-6 py-20 text-center text-black/50">
                  Your cart is empty.
                </div>
              ) : null}
            </div>
          </div>

          <OrderSummary subtotal={subtotal} tax={tax} shippingFee={shippingFee} total={total} />
        </div>
      </div>
    </div>
  );
}
