import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "@/features/cart/cart.context";
import CheckoutShell from "../CheckoutShell";
import ShippingMethodList from "./components/ShippingMethodList";

export default function ShippingPage() {
  const navigate = useNavigate();
  const { items, checkout, shippingMethods, setShippingMethod } = useCart();

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <CheckoutShell currentStep={2} title="Shipment Method">
      <ShippingMethodList
        methods={shippingMethods}
        selectedMethodId={checkout.shippingMethodId}
        onSelect={setShippingMethod}
      />

      <div className="flex justify-end gap-4 pt-24">
        <button type="button" onClick={() => navigate("/checkout/address")} className="h-16 min-w-[220px] rounded-xl border border-black text-[1.15rem] font-medium text-black">Back</button>
        <button type="button" onClick={() => navigate("/checkout/payment")} className="h-16 min-w-[220px] rounded-xl bg-black text-[1.15rem] font-medium text-white">Next</button>
      </div>
    </CheckoutShell>
  );
}
