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
  country: "Vietnam",
  postalCode: "",
  isDefault: false,
};

function FormField({
  value,
  placeholder,
  onChange,
  className = "",
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <input
      className={["cy-input", className].join(" ")}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

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
    initialValue ||
      {
        ...emptyAddress,
        id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`,
        isDefault: true,
      }
  );
  const [saving, setSaving] = useState(false);

  return (
    <div className="cy-panel p-6 sm:p-7">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
          {initialValue ? "Edit address" : "New address"}
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">Recipient details</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField value={form.fullName} onChange={(value) => setForm({ ...form, fullName: value })} placeholder="Full name" />
        <FormField value={form.label} onChange={(value) => setForm({ ...form, label: value.toUpperCase() })} placeholder="Label (HOME / OFFICE)" />
        <FormField value={form.email} onChange={(value) => setForm({ ...form, email: value })} placeholder="Email" />
        <FormField value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} placeholder="Phone" />
        <FormField
          className="md:col-span-2"
          value={form.addressLine1}
          onChange={(value) => setForm({ ...form, addressLine1: value })}
          placeholder="Address line 1"
        />
        <FormField
          className="md:col-span-2"
          value={form.addressLine2}
          onChange={(value) => setForm({ ...form, addressLine2: value })}
          placeholder="Address line 2"
        />
        <FormField value={form.ward} onChange={(value) => setForm({ ...form, ward: value })} placeholder="Ward" />
        <FormField value={form.district} onChange={(value) => setForm({ ...form, district: value })} placeholder="District" />
        <FormField value={form.city} onChange={(value) => setForm({ ...form, city: value })} placeholder="City" />
        <FormField value={form.postalCode} onChange={(value) => setForm({ ...form, postalCode: value })} placeholder="Postal code" />
        <FormField value={form.country} onChange={(value) => setForm({ ...form, country: value })} placeholder="Country" />
      </div>

      <label className="mt-5 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(event) => setForm({ ...form, isDefault: event.target.checked })}
          className="h-4 w-4 accent-[var(--accent)]"
        />
        Set as default address
      </label>

      <div className="mt-7 flex flex-wrap gap-4">
        <button type="button" onClick={onCancel} className="cy-btn-secondary h-12 px-6 text-sm">
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
          className="cy-btn-primary h-12 px-6 text-sm disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save address"}
        </button>
      </div>
    </div>
  );
}
