import React from "react";

export const PaymentMethodCard: React.FC = () => {
  return (
    <div className="max-w-3xl bg-white rounded-xl shadow-md p-6">
      <div className="flex gap-6 items-start">

        {/* Card */}
        <div className="w-[260px] h-[160px] relative">
        <img
            src="https://geniemoneyy.com/wp-content/uploads/2022/10/card-3.png"
            alt="card"
            className="w-full h-full object-cover rounded-xl"
        />
        </div>

        {/* Info */}
        <div className="flex-1 text-sm">
          <h2 className="font-semibold text-lg mb-3">Phương thức thanh toán</h2>

          <p>
            Status: <span className="text-green-500 font-medium">Hoạt động</span>
          </p>
          <p>
            Transactions: <span className="font-medium">1,250</span>
          </p>
          <p>
            Revenue: <span className="font-medium">$50,000</span>
          </p>

          <button className="text-blue-600 hover:underline mt-1">
            Xem các giao dịch
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button className="border rounded-lg px-4 py-2 hover:bg-gray-50">
          Thêm thẻ
        </button>

        <button className="border border-red-300 text-red-500 rounded-lg px-4 py-2 hover:bg-red-50">
          Vô hiệu hoá
        </button>
      </div>
    </div>
  );
};