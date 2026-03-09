import { ChevronDown, Save } from "lucide-react";
import { useState } from "react";

const InventorySection = () => {
  const [quantity, setQuantity] = useState("");
  const [unlimited, setUnlimited] = useState(true);
  const [highlight, setHighlight] = useState(true);

  return (
    <div className="bg-white p-6 rounded-xl w-full">
      <h2 className="text-2xl font-semibold mb-6">Inventory</h2>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        {/* Stock Quantity */}
        <div>
          <label className="block text-[#023337] font-semibold mb-2">
            Stock Quantity
          </label>

          <input
            type="text"
            value={unlimited ? "Unlimited" : quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled={unlimited}
            className="w-full bg-[#F5F7F8] border border-gray-200 rounded-lg px-4 py-3 outline-none"
          />
        </div>

        {/* Stock Status */}
        <div>
          <label className="block text-[#023337] font-semibold mb-2">
            Stock Status
          </label>

          <div className="flex items-center justify-between bg-[#F5F7F8] border border-gray-200 rounded-lg px-4 py-3 cursor-pointer">
            <span>In Stock</span>
            <ChevronDown size={18} />
          </div>
        </div>
      </div>

      {/* Unlimited toggle */}
      <div className="flex items-center gap-3 mb-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={unlimited}
            onChange={() => setUnlimited(!unlimited)}
            className="sr-only peer"
          />

          <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-[#4EA674] transition"></div>

          <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-5"></div>
        </label>

        <span className="text-gray-800">Unlimited</span>
      </div>

      {/* Highlight checkbox */}
      <label className="flex items-center gap-3 mb-8 cursor-pointer">
        <input
          type="checkbox"
          checked={highlight}
          onChange={() => setHighlight(!highlight)}
          className="w-5 h-5 accent-[#4EA674]"
        />

        <span className="text-gray-600">
          Highlight this product in a featured section.
        </span>
      </label>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg bg-white hover:bg-gray-50">
          <Save size={16} />
          Save to draft
        </button>

        <button className="bg-[#4EA674] text-white px-5 py-2 rounded-lg hover:bg-[#449562]">
          Publish Product
        </button>
      </div>
    </div>
  );
};

export default InventorySection;
