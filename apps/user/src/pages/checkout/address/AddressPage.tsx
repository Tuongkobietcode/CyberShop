import { useMemo, useState } from "react";
import { CirclePlus } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "@/features/cart/cart.context";
import type { CheckoutAddress } from "@/features/cart/cart.types";
import CheckoutShell from "../CheckoutShell";
import AddressForm from "./components/AddressForm";
import AddressItem from "./components/AddressItem";

export default function AddressPage() {
  const navigate = useNavigate();
  const { items, checkout, selectAddress, saveAddress, deleteAddress } = useCart();
  const [editing, setEditing] = useState<CheckoutAddress | null>(null);
  const [showForm, setShowForm] = useState(false);

  const selectedAddress = useMemo(
    () => checkout.addresses.find((item) => item.id === checkout.selectedAddressId),
    [checkout.addresses, checkout.selectedAddressId]
  );

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <CheckoutShell currentStep={1} title="Select Address">
      <div className="space-y-6">
        {checkout.addresses.map((address) => (
          <AddressItem
            key={address.id}
            address={address}
            checked={selectedAddress?.id === address.id}
            onSelect={() => selectAddress(address.id)}
            onEdit={() => {
              setEditing(address);
              setShowForm(true);
            }}
            onDelete={() => deleteAddress(address.id)}
          />
        ))}

        {showForm ? (
          <AddressForm
            initialValue={editing || undefined}
            onSave={async (value) => {
              await saveAddress(value);
              setEditing(null);
              setShowForm(false);
            }}
            onCancel={() => {
              setEditing(null);
              setShowForm(false);
            }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex w-full flex-col items-center justify-center gap-3 border-t border-dashed border-black/14 py-6 text-[1.4rem] text-black"
          >
            <CirclePlus className="h-9 w-9" />
            Add New Address
          </button>
        )}

        <div className="flex justify-end gap-4 pt-8">
          <button type="button" onClick={() => navigate("/cart")} className="h-16 min-w-[220px] rounded-xl border border-black text-[1.15rem] font-medium text-black">Back</button>
          <button type="button" onClick={() => navigate("/checkout/shipping")} className="h-16 min-w-[220px] rounded-xl bg-black text-[1.15rem] font-medium text-white">Next</button>
        </div>
      </div>
    </CheckoutShell>
  );
}
