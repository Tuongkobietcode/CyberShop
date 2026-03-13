import { MapPin, Truck, WalletCards } from "lucide-react";
import type { ReactNode } from "react";

const steps = [
  { id: 1, label: "Address", icon: MapPin, path: "/checkout/address" },
  { id: 2, label: "Shipping", icon: Truck, path: "/checkout/shipping" },
  { id: 3, label: "Payment", icon: WalletCards, path: "/checkout/payment" },
];

export default function CheckoutShell({
  currentStep,
  title,
  children,
}: {
  currentStep: 1 | 2 | 3;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#fafafa] pb-16">
      <div className="mx-auto max-w-[1200px] px-4 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            return (
              <div key={step.id} className={isActive ? "text-black" : "text-black/28"}>
                <div className="flex items-start gap-3">
                  <Icon className="mt-1 h-7 w-7" />
                  <div>
                    <p className="text-[1.05rem]">Step {step.id}</p>
                    <p className="text-[1.9rem] font-medium tracking-[-0.04em]">{step.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-18">
          <h1 className="text-[2.25rem] font-semibold tracking-[-0.04em] text-[#202348]">{title}</h1>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
