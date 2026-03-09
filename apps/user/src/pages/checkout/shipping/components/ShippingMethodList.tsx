import React, { useState } from "react";

type Method = "free" | "fast" | "schedule";

export const ShippingMethodList: React.FC = () => {
  const [method, setMethod] = useState<Method>("free");
  const [date, setDate] = useState("");

  return (
    <div className="w-full max-w-7xl rounded-lg p-4 mx-auto">
      <h2 className="mb-4 text-mb font-bold text-black-900">
        Shipping Method
      </h2>

      <label
        className={`flex cursor-pointer items-center justify-between rounded-md border border-gray-300 p-4 mb-3
        ${method === "free" ? "text-black-500" : "text-gray-400"}`}
      >
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="shipment"
            checked={method === "free"}
            onChange={() => setMethod("free")}
            className="h-4 w-4 accent-black"
          />
          <div>
            <span className="text-sm font-medium pr-3">Free</span>
            <span className={`text-sm ${method === "free" ? "text-black" : "text-gray-500"}`}>
              Regularly shipment
            </span>
          </div>
        </div>
        <span className={`text-sm ${method === "free" ? "text-black" : "text-gray-500"}`}>
          17 Oct, 2023
        </span>
      </label>

    <label
       className={`flex cursor-pointer items-center justify-between rounded-md border border-gray-300 p-4 mb-3
       ${method === "fast" ? "text-black-500" : "text-gray-400"}`}
    >
      <div className="flex items-center gap-3">
            <input
            type="radio"
            name="shipment"
            checked={method === "fast"}
            onChange={() => setMethod("fast")}
            className="h-4 w-4 accent-black"
            />
            <div>
            <span className="text-sm font-medium pr-3">$8.50</span>
            <span className={`text-sm ${method === "fast" ? "text-black" : "text-gray-500"}`}>
              Get your delivery as soon as possible
            </span>
            </div>
        </div>
        <span className={`text-sm ${method === "fast" ? "text-black" : "text-gray-500"}`}>
          1 Oct, 2023
        </span>
    </label>

      <label
        className={`flex cursor-pointer items-center justify-between rounded-md border border-gray-300 p-4
        ${method === "schedule" ? "text-black-500" : "text-gray-400"}`}
      >
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="shipment"
            checked={method === "schedule"}
            onChange={() => setMethod("schedule")}
            className="h-4 w-4 accent-black"
          />
          <div>
            <span className="text-sm font-medium pr-3">Schedule</span>
            <span className={`text-sm ${method === "schedule" ? "text-black" : "text-gray-500"}`}>
              Pick a date when you want to get your delivery
            </span>
          </div>
        </div>

        {method === "schedule" ? (
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="text-xs border rounded p-1"
        />
      ) : (
        <button
          type="button"
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          Select Date
          <span>▾</span>
        </button>
      )}
      </label>

      <div className="flex justify-end mt-40">
        <button type="button" className="bg-white text-black border mr-3 px-7 py-2 rounded-md text-sm">Back</button>
        <button type="button" className="bg-black text-white border px-7 py-2 rounded-md text-sm">Next</button>
      </div>
    </div>
  );
}
