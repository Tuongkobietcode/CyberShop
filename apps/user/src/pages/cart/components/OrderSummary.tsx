import React, { useState } from "react";

export const OrderSummary: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");

  return (
    <div className="w-full max-w-md bg-white p-6 border rounded">
      <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

      <div className="mb-5">
        <p className="text-sm text-gray-600 mb-2">
          Discount code / Promo code
        </p>
        <input
          type="text"
          placeholder="Code"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Your bonus card number</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter Card Number"
            className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none"
          />
          <button className="px-4 border rounded text-sm">Apply</button>
        </div>
      </div>

      <div className="space-y-3 text-sm mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">$2347</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Tax</span>
          <span className="font-medium">$50</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated shipping & Handling</span>
          <span className="font-medium">$29</span>
        </div>

        <div className="flex justify-between pt-3 border-t font-semibold text-base">
          <span>Total</span>
          <span>$2426</span>
        </div>
      </div>

      <button className="w-full bg-black text-white py-3 rounded text-sm">
        Checkout
      </button>
    </div>
  );
};
