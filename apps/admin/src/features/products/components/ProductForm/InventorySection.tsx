import { ChevronDown, Save } from "lucide-react";

const InventorySection = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">Inventory</h2>

      {/* Stock inputs */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        {/* Stock Quantity */}
        <div>
          <label className="block text-sm font-medium text-teal-900 mb-2">
            Stock Quantity
          </label>
          <input
            type="text"
            defaultValue="Unlimited"
            className="w-full bg-gray-200 border border-gray-300 rounded-lg px-4 py-3 outline-none"
          />
        </div>

        {/* Stock Status */}
        <div>
          <label className="block text-sm font-medium text-teal-900 mb-2">
            Stock Status
          </label>

          <div className="flex items-center justify-between bg-gray-200 border border-gray-300 rounded-lg px-4 py-3">
            <span>In Stock</span>
            <ChevronDown size={18} />
          </div>
        </div>
      </div>

      {/* Unlimited toggle */}
      <div className="flex items-center gap-3 mb-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />

          {/* background */}
          <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-[#4EA674] transition"></div>

          {/* circle */}
          <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-5"></div>
        </label>

        <span className="text-gray-800">Unlimited</span>
      </div>

      {/* Highlight checkbox */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          defaultChecked
          className="w-4 h-4 accent-[#4EA674] "
        />
        <span className="text-gray-600">
          Highlight this product in a featured section.
        </span>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg bg-white hover:bg-gray-50">
          <Save size={16} />
          Save to draft
        </button>

        <button className="bg-[#4EA674] text-white px-5 py-2 rounded-lg hover:bg-[#449562] transition">
          Publish Product
        </button>
      </div>
    </div>
  );
};

export default InventorySection;
