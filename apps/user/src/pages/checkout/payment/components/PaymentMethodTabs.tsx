import React, { useState } from "react";
import CreditCardForm from "./CreditCardForm";
import VnPayForm from "./VnPayForm";

type PaymentMethod = "card" | "vnpay";

const PaymentMethodTabs: React.FC = () => {
  const [method, setMethod] = useState<PaymentMethod>("card");

  return (
    <div className="max-w-lg rounded-xl border border-gray-50 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Payment</h2>

      <div className="mb-6 flex gap-6 text-sm">
        <button
          onClick={() => setMethod("card")}
          className={`pb-1 font-medium ${
            method === "card" ? "border-b-2 border-black" : "text-gray-400"
          }`}
        >
          Credit Card
        </button>

        <button
          onClick={() => setMethod("vnpay")}
          className={`pb-1 font-medium ${
            method === "vnpay" ? "border-b-2 border-black" : "text-gray-400"
          }`}
        >
          VNPay
        </button>
      </div>

      {method === "card" && <CreditCardForm />}
      {method === "vnpay" && <VnPayForm />}

      <div className="mt-8 flex gap-4">
        <button className="w-1/2 rounded-md border py-2 text-sm font-medium">
          Back
        </button>

        {method === "card" && (
          <button className="w-1/2 rounded-md bg-black py-2 text-sm font-medium text-white">
            Pay
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodTabs;
