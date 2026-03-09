import React from "react";
import { MoreVertical,
         PlusCircle
 } from "lucide-react";

export const PaymentMethodCard: React.FC = () => {
  return (
    <div className="max-w-3xl bg-white rounded-xl shadow-md p-4 h-73 relative">
      <button className="absolute top-4 right-4 text-gray-500">
        <MoreVertical size={20} className="cursor-pointer" />
      </button>
      <h2 className="font-semibold text-lg mb-3">Payment Method</h2>
      <div className="flex gap-6 items-start">

        <div className="w-[260px] h-[160px] relative">
        <img
            src="https://geniemoneyy.com/wp-content/uploads/2022/10/card-3.png"
            alt="card"
            className="w-full h-full object-cover rounded-xl"
        />
        </div>

        <div className="flex-1 text-sm">
          <p className="mb-2">
            Status: <span className="text-green-500 font-medium">Active</span>
          </p>
          <p className="my-2">
            Transactions: <span className="font-medium">1,250</span>
          </p>
          <p className="my-2">
            Revenue: <span className="font-medium">$50,000</span>
          </p>

          <button className="text-blue-600 hover:underline">
            View Transactions
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5">
        <button className="border rounded-lg px-4 py-2 hover:bg-gray-50 flex justify-center items-center w-[260px]">
          <PlusCircle size={18} className="mr-1" />
          Add Card
        </button>

        <button className="border border-red-300 text-red-500 rounded-lg px-4 py-2 bg-red-50">
          Deactive
        </button>
      </div>
    </div>
  );
};