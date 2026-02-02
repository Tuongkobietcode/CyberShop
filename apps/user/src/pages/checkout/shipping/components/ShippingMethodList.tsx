import React, { useState } from "react";

type Method = "free" | "fast" | "schedule";

export const ShippingMethodList: React.FC = () => {
  const [method, setMethod] = useState<Method>("free");

  return (
    <div className="w-full max-w-2xl rounded-lg p-4">
      <h2 className="mb-4 text-mb font-bold text-black-900">
        Phương thức thanh toán
      </h2>

      <label
        className={`flex cursor-pointer items-center justify-between rounded-md border p-4 mb-3
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
            <span className="text-sm font-medium pr-3">Miễn phí</span>
            <span className="text-xs text-gray-500">Giao hàng thường xuyên</span>
          </div>
        </div>
        <span className="text-xs text-gray-500">2/2/2026</span>
      </label>

    <label
       className={`flex cursor-pointer items-center justify-between rounded-md border p-4 mb-3
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
            <span className="text-xs text-gray-500">
                Nhận hàng của bạn sớm nhất có thể
            </span>
            </div>
        </div>
        <span className="text-xs text-gray-500">1/1/2026</span>
    </label>

      <label
        className={`flex cursor-pointer items-center justify-between rounded-md border p-4
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
            <span className="text-sm font-medium pr-3">Lịch trình</span>
            <span className="text-xs text-gray-500">
              Chọn ngày bạn muốn nhận hàng
            </span>
          </div>
        </div>

        <button
          type="button"
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          Chọn ngày
          <span>▾</span>
        </button>
      </label>

      <div className="flex justify-end mt-40">
        <button type="button" className="bg-white text-black border mr-3 px-7 py-2 rounded-md text-sm">Quay lại</button>
        <button type="button" className="bg-black text-white border px-7 py-2 rounded-md text-sm">Tiếp tục</button>
      </div>
    </div>
  );
}
