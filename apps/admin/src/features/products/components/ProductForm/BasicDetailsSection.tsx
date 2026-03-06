import { Pencil, Sparkles } from "lucide-react";

const BasicDetailsSection = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">Basic Details</h2>

      {/* Product Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-teal-900 mb-2">
          Product Name
        </label>
        <input
          type="text"
          defaultValue="iPhone 15"
          className="w-full rounded-lg border border-gray-300 bg-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Product Description */}
      <div>
        <label className="block text-sm font-medium text-teal-900 mb-2">
          Product Description
        </label>

        <div className="relative">
          <textarea
            rows={4}
            defaultValue="The iPhone 15 delivers cutting-edge performance with the A16 Bionic chip, an immersive Super Retina XDR display, advanced dual-camera system, and exceptional battery life, all encased in stunning aerospace-grade aluminum."
            className="w-full rounded-lg border border-gray-300 bg-gray-200 px-4 py-3 pr-16 outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />

          {/* icons */}
          <div className="absolute bottom-3 right-3 flex gap-3 text-gray-500">
            <Pencil size={18} className="cursor-pointer hover:text-black" />
            <Sparkles size={18} className="cursor-pointer hover:text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsSection;
