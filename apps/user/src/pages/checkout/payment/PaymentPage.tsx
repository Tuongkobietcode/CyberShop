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
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_460px]">
        <div className="cy-panel p-7 sm:p-8">
          <div className="max-w-2xl">
            <span className="cy-kicker">Payment Method</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-(--text-primary) sm:text-4xl">
              Complete the order with a calm, secure finish.
            </h2>
            <p className="mt-4 text-base leading-8 text-(--text-secondary)">
              VNPay stays the primary handoff for online payment, while cash on delivery remains available for orders that do not need an immediate gateway redirect.
            </p>
          </div>

          <div className="mt-8">
            <PaymentMethodTabs value={checkout.paymentMethod} onChange={setPaymentMethod} />
          </div>

          <div className="mt-6">
            <CreditCardForm method={checkout.paymentMethod} sameAsBilling={checkout.sameAsBilling} onToggleSameAsBilling={setSameAsBilling} />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button type="button" onClick={() => navigate("/checkout/shipping")} className="cy-btn-secondary h-14 min-w-[200px]">
              Back
            </button>
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
              className="cy-btn-primary h-14 min-w-[240px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (isVnpay ? "Redirecting..." : "Creating order...") : isVnpay ? "Continue with VNPay" : "Place COD order"}
            </button>
          </div>
        </div>

        <PaymentSummary
          items={items}
          address={selectedAddress}
          shippingMethod={shippingMethod}
          subtotal={subtotal}
          tax={tax}
          shippingFee={shippingFee}
          total={total}
        />
      </div>
    </CheckoutShell>
  );
}
