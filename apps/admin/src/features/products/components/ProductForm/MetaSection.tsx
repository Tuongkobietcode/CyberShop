import { Search, Save, Plus } from "lucide-react";

const MetaSection = () => {
  return (
    <div className="bg-white p-6 rounded-xl w-full flex items-center justify-between">
      {/* Left title */}
      <p className="text-2xl font-semibold text-[#023337] mb-5">
        Add New Product
      </p>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search product for add"
            className="w-[260px] border border-gray-200 rounded-lg px-4 py-2 pr-10 bg-[#F9FAFB] focus:outline-none"
          />

          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Publish button */}
        <button className="bg-[#4EA674] text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
          Publish Product
        </button>

        {/* Save draft */}
        <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
          <Save size={16} />
          Save to draft
        </button>

        {/* Add button */}
        <button className="border border-gray-200 p-2 rounded-lg hover:bg-gray-50">
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default MetaSection;
