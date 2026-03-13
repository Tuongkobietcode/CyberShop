import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useAuth } from "@/features/auth/auth.context";
import type { CheckoutAddress } from "@/features/cart/cart.types";
import AddressForm from "@/pages/checkout/address/components/AddressForm";

function formatMoney(value: number) {
  return `$${Math.round(value / 16000).toLocaleString("en-US")}`;
}

function formatDate(value: string | null) {
  if (!value) return "Never";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { customer, orders, signOut, updateProfile, saveAddress, deleteAddress } = useAuth();
  const [form, setForm] = useState(() => ({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
  }));
  const [savingProfile, setSavingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState<CheckoutAddress | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const addresses = useMemo<CheckoutAddress[]>(() => {
    if (!customer) return [];
    return customer.addresses.map((address) => ({
      id: address.id,
      label: address.label,
      fullName: address.fullName,
      email: customer.email,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      ward: address.ward,
      district: address.district,
      city: address.city,
      country: address.country,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    }));
  }, [customer]);

  useEffect(() => {
    if (!customer) return;
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
  }, [customer]);

  if (!customer) {
    return null;
  }

  return (
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb items={[{ label: "Home", to: "/home" }, { label: "Profile" }]} />

      <div className="mx-auto max-w-[1200px] space-y-10 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="rounded-[32px] border border-black/10 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-black text-2xl font-semibold text-white">
                {customer.name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-black/35">Customer profile</p>
                <h1 className="mt-2 text-[2.2rem] font-semibold tracking-[-0.05em] text-black">{customer.name}</h1>
              </div>
            </div>

            <dl className="mt-8 space-y-5 text-[15px] text-black/65">
              <div className="flex items-start justify-between gap-6 border-b border-black/8 pb-4">
                <dt>Email</dt>
                <dd className="text-right font-medium text-black">{customer.email}</dd>
              </div>
              <div className="flex items-start justify-between gap-6 border-b border-black/8 pb-4">
                <dt>Phone</dt>
                <dd className="text-right font-medium text-black">{customer.phone}</dd>
              </div>
              <div className="flex items-start justify-between gap-6 border-b border-black/8 pb-4">
                <dt>Joined</dt>
                <dd className="text-right font-medium text-black">{formatDate(customer.createdAt)}</dd>
              </div>
              <div className="flex items-start justify-between gap-6">
                <dt>Last login</dt>
                <dd className="text-right font-medium text-black">{formatDate(customer.lastLoginAt)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={async () => {
                await signOut();
                navigate("/sign-in", { replace: true });
              }}
              className="mt-8 inline-flex h-13 items-center justify-center rounded-xl border border-black px-6 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Sign out
            </button>
          </article>

          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <article className="rounded-[32px] border border-black/10 bg-white p-7 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-black/35">Orders</p>
                <p className="mt-4 text-[2.5rem] font-semibold tracking-[-0.06em] text-black">{customer.orderCount}</p>
              </article>
              <article className="rounded-[32px] border border-black/10 bg-white p-7 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-black/35">Saved addresses</p>
                <p className="mt-4 text-[2.5rem] font-semibold tracking-[-0.06em] text-black">{customer.addresses.length}</p>
              </article>
              <article className="rounded-[32px] border border-black/10 bg-white p-7 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-black/35">Total spend</p>
                <p className="mt-4 text-[2.5rem] font-semibold tracking-[-0.06em] text-black">{formatMoney(customer.totalSpend)}</p>
              </article>
            </div>

            <article className="rounded-[32px] border border-black/10 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-black/35">Account</p>
                  <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">Edit your details</h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field label="Full name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
                <Field label="Phone" value={form.phone} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} />
                <Field label="Email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} className="md:col-span-2" />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  disabled={savingProfile}
                  onClick={async () => {
                    setSavingProfile(true);
                    try {
                      await updateProfile(form);
                    } finally {
                      setSavingProfile(false);
                    }
                  }}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-[#1d1d1d] disabled:opacity-60"
                >
                  {savingProfile ? "Saving..." : "Save profile"}
                </button>
              </div>
            </article>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
          <article className="rounded-[32px] border border-black/10 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-black/35">Addresses</p>
                <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">Delivery book</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingAddress(null);
                  setShowAddressForm(true);
                }}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-black px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
              >
                Add address
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {addresses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-black/12 px-6 py-12 text-center text-sm text-black/45">
                  You have not saved any address yet.
                </div>
              ) : (
                addresses.map((address) => (
                  <article key={address.id} className="rounded-2xl bg-[#f7f7f8] px-5 py-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-black">{address.fullName}</h3>
                          <span
                            className={[
                              "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]",
                              address.isDefault ? "bg-black text-white" : "bg-white text-black/55",
                            ].join(" ")}
                          >
                            {address.label}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-black/55">
                          {address.addressLine1}
                          {address.addressLine2 ? `, ${address.addressLine2}` : ""}
                          {address.ward ? `, ${address.ward}` : ""}
                          {address.district ? `, ${address.district}` : ""}
                          {`, ${address.city}, ${address.country}`}
                          {address.postalCode ? ` ${address.postalCode}` : ""}
                        </p>
                        <p className="mt-2 text-sm font-medium text-black">{address.phone}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAddress(address);
                            setShowAddressForm(true);
                          }}
                          className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await deleteAddress(address.id);
                          }}
                          className="inline-flex h-10 items-center justify-center rounded-full border border-rose-200 px-4 text-sm font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {showAddressForm ? (
              <div className="mt-6">
                <AddressForm
                  initialValue={editingAddress || undefined}
                  onSave={async (value) => {
                    await saveAddress(value);
                    setEditingAddress(null);
                    setShowAddressForm(false);
                  }}
                  onCancel={() => {
                    setEditingAddress(null);
                    setShowAddressForm(false);
                  }}
                />
              </div>
            ) : null}
          </article>

          <article className="rounded-[32px] border border-black/10 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-black/35">Recent orders</p>
                <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">Your latest purchases</h2>
              </div>
              <Link to="/products" className="text-sm font-semibold text-black/64 transition hover:text-black">
                Continue shopping
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-black/12 px-6 py-14 text-center text-sm text-black/45">
                No orders yet. Your first successful checkout will show up here.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {orders.slice(0, 6).map((order) => (
                  <article key={order.id} className="rounded-2xl bg-[#f7f7f8] px-5 py-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.18em] text-black/35">{order.orderCode}</p>
                        <h3 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-black">{order.items[0]?.name || "Order"}</h3>
                        <p className="mt-2 text-sm text-black/45">{order.orderStatus} · {order.paymentStatus}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-black/45">{formatDate(order.createdAt)}</p>
                        <p className="mt-1 text-lg font-semibold text-black">{formatMoney(order.totalAmount)}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </article>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, className = "" }: { label: string; value: string; onChange: (value: string) => void; className?: string }) {
  return (
    <label className={["block space-y-2", className].join(" ")}>
      <span className="text-sm font-medium text-black/58">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 text-sm outline-none" />
    </label>
  );
}
