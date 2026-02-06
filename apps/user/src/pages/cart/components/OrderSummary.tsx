import React, { useState } from "react";

export const OrderSummary: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");

  return (
    <div className="w-full max-w-md bg-white p-6 border border-gray-300 rounded">
      <h3 className="text-xl font-semibold mb-6">Tóm tắt đơn hàng</h3>

      <div className="mb-5">
        <p className="text-sm text-gray-600 mb-2">
          Mã giảm giá / Mã khuyến mãi
        </p>
        <input
          type="text"
          placeholder="Mã"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Số thẻ thưởng của bạn</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Nhập số thẻ"
            className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none"
          />
          <button className="px-4 border rounded text-sm">Xác nhận</button>
        </div>
      </div>

      <div className="space-y-3 text-sm mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Tổng phụ</span>
          <span className="font-medium">$2347</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Thuế ước tính</span>
          <span className="font-medium">$50</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển & xử lý ước tính</span>
          <span className="font-medium">$29</span>
        </div>

        <div className="flex justify-between pt-3 border-t font-semibold text-base">
          <span>Tổng cộng</span>
          <span>$2426</span>
        </div>
      </div>

      <button className="w-full bg-black text-white py-3 rounded text-sm">
        Thanh toán
      </button>
    </div>
  );
};
