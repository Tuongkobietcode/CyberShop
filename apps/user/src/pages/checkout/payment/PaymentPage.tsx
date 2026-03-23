import { Navigate, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import CheckoutShell from "../CheckoutShell";
import { useCart } from "@/features/cart/cart.context";
import { useAuth } from "@/features/auth/auth.context";
import PaymentSummary from "./components/PaymentSummary";
import PaymentMethodTabs from "./components/PaymentMethodTabs";
import CreditCardForm from "./components/CreditCardForm";
import { createCodOrder, createVnpayPayment } from "@/features/order/order.service";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const {
    items,
    checkout,
    shippingMethods,
    subtotal,
    tax,
    shippingFee,
    total,
    setPaymentMethod,
    setSameAsBilling,
    clearCart,
    showOrderSuccess,
  } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const selectedAddress = useMemo(
    () => checkout.addresses.find((item) => item.id === checkout.selectedAddressId),
    [checkout.addresses, checkout.selectedAddressId]
  );
  const shippingMethod = shippingMethods.find((item) => item.id === checkout.shippingMethodId);
  const isVnpay = checkout.paymentMethod === "vnpay";

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <CheckoutShell currentStep={3} title="Payment">
      <div className="grid gap-12 lg:grid-cols-[1.02fr_1fr]">
        <PaymentSummary
          items={items}
          address={selectedAddress}
          shippingMethod={shippingMethod}
          subtotal={subtotal}
          tax={tax}
          shippingFee={shippingFee}
          total={total}
        />

        <div>
          <h2 className="text-[2.4rem] font-semibold tracking-[-0.04em] text-black">Payment</h2>
          <div className="mt-8">
            <PaymentMethodTabs value={checkout.paymentMethod} onChange={setPaymentMethod} />
          </div>
          <div className="mt-8">
            <CreditCardForm method={checkout.paymentMethod} sameAsBilling={checkout.sameAsBilling} onToggleSameAsBilling={setSameAsBilling} />
          </div>

          <div className="mt-10 flex gap-4">
            <button type="button" onClick={() => navigate("/checkout/shipping")} className="h-16 min-w-[220px] rounded-xl border border-black text-[1.15rem] font-medium text-black">Back</button>
            <button
              type="button"
              disabled={submitting || !selectedAddress || !shippingMethod}
              onClick={async () => {
                if (!selectedAddress || !shippingMethod) return;
                setSubmitting(true);
                try {
                  if (isVnpay) {
                    const payment = await createVnpayPayment({
                      items,
                      address: selectedAddress,
                      shippingMethod,
                      paymentMethod: checkout.paymentMethod,
                    });
                    window.location.assign(payment.paymentUrl);
                    return;
                  }

                  const order = await createCodOrder({
                    items,
                    address: selectedAddress,
                    shippingMethod,
                    paymentMethod: checkout.paymentMethod,
                  });
                  await refreshProfile();
                  showOrderSuccess(order.orderCode);
                  clearCart();
                  navigate(`/checkout/payment/result?mode=cod&orderCode=${encodeURIComponent(order.orderCode)}`, { replace: true });
                } finally {
                  setSubmitting(false);
                }
              }}
              className="h-16 min-w-[220px] rounded-xl bg-black text-[1.15rem] font-medium text-white disabled:opacity-60"
            >
              {submitting ? (isVnpay ? "Redirecting..." : "Creating order...") : isVnpay ? "Pay with VNPay" : "Place COD order"}
            </button>
          </div>
        </div>
      </div>
    </CheckoutShell>
  );
}
