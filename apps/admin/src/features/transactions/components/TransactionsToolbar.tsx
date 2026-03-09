import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown, MoreHorizontal } from "lucide-react";

export const TransactionToolbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between gap-4">

      <div className="flex bg-green-100 rounded-lg p-1 text-sm">
        <button className="px-4 py-1.5 rounded-md bg-white text-gray-800 font-medium">
          All order <span className="text-green-600">(240)</span>
        </button>

        <button className="px-4 py-1.5 text-gray-600 hover:text-gray-900">
          Completed
        </button>

        <button className="px-4 py-1.5 text-gray-600 hover:text-gray-900">
          Pending
        </button>

        <button className="px-4 py-1.5 text-gray-600 hover:text-gray-900">
          Canceled
        </button>
      </div>

      <div className="flex items-center gap-2">

        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <input
            type="text"
            placeholder="Search payment history"
            className="bg-transparent outline-none text-sm w-50"
          />
          <Search size={16} className="text-gray-500" />
        </div>

        <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
          <SlidersHorizontal size={16} />
        </button>

        <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
          <ArrowUpDown size={16} />
        </button>

        <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};