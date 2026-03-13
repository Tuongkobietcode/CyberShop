import type { PaymentMethod } from "@/features/cart/cart.types";

const tabs: { id: PaymentMethod; label: string }[] = [
  { id: "card", label: "Credit Card" },
  { id: "paypal", label: "PayPal" },
  { id: "paypal_credit", label: "PayPal Credit" },
];

export default function PaymentMethodTabs({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}) {
  return (
    <div className="flex flex-wrap gap-10 border-b border-black/10 pb-3 text-[1.2rem]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={[
            "pb-3 transition",
            value === tab.id ? "border-b-2 border-black font-medium text-black" : "text-black/45",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
