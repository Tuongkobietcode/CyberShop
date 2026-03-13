import { useState } from "react";
import type { CheckoutAddress } from "@/features/cart/cart.types";

const emptyAddress: CheckoutAddress = {
  id: "",
  label: "HOME",
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  ward: "",
  district: "",
  city: "",
  country: "USA",
  postalCode: "",
  isDefault: false,
};

export default function AddressForm({
  initialValue,
  onSave,
  onCancel,
}: {
  initialValue?: CheckoutAddress;
  onSave: (value: CheckoutAddress) => Promise<void> | void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<CheckoutAddress>(
    initialValue || {
      ...emptyAddress,
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}`,
      isDefault: true,
    },
  );
  const [saving, setSaving] = useState(false);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="h-14 rounded-xl border border-black/10 px-4 outline-none"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <input
          className="h-14 rounded-xl border border-black/10 px-4 outline-none"
          placeholder="Label (HOME/OFFICE)"
          value={form.label}
          onChange={(e) =>
            setForm({ ...form, label: e.target.value.toUpperCase() })
          }
        />
        <input
          className="h-14 rounded-xl border border-black/10 px-4 outline-none"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="h-14 rounded-xl border border-black/10 px-4 outline-none"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className="h-14 rounded-xl border border-black/10 px-4 outline-none md:col-span-2"
          placeholder="Address line 1"
          value={form.addressLine1}
          onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
        />
        <input
          className="h-14 rounded-xl border border-black/10 px-4 outline-none md:col-span-2"
          placeholder="Address line 2"
          value={form.addressLine2}
          onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
        />
        <input
          className="h-14 rounded-xl border border-black/10 px-4 outline-none"
          placeholder="Ward"
          value={form.ward}
          onChange={(e) => setForm({ ...form, ward: e.target.value })}
        />
        <input
          className="h-14 rounded-xl border border-black/10 px-4 outline-none"
          placeholder="District"
          value={form.district}
          onChange={(e) => setForm({ ...form, district: e.target.value })}
        />
        <input
          className="h-14 rounded-xl border border-black/10 px-4 outline-none"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          className="h-14 rounded-xl border border-black/10 px-4 outline-none"
          placeholder="Postal code"
          value={form.postalCode}
          onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
        />
        <input
          className="h-14 rounded-xl border border-black/10 px-4 outline-none"
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />
      </div>
      <label className="mt-4 flex items-center gap-3 text-sm text-black/70">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
        />
        Set as default address
      </label>
      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="h-12 rounded-xl border border-black px-6 text-sm font-medium text-black"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            try {
              await onSave(form);
            } finally {
              setSaving(false);
            }
          }}
          className="h-12 rounded-xl bg-black px-6 text-sm font-medium text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Address"}
        </button>
      </div>
    </div>
  );
}
