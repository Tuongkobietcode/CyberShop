import React from "react";
import PaymentMethodTabs from "./components/PaymentMethodTabs";
import PaymentSummary from "./components/PaymentSummary";

const PaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
          <div className="h-full">
            <PaymentSummary />
          </div>

          <div className="h-full">
            <PaymentMethodTabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
