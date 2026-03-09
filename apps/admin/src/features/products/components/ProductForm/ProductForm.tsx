import { useState } from "react";
import { ChevronDown } from "lucide-react";

const colors = ["#B7C9A9", "#D7B9BD", "#B9C1C6", "#D9CFB1", "#4B4F52"];

const ProductForm = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div className="bg-white p-6 rounded-xl max-w-xl space-y-6">
      {/* title */}
      <p className="text-2xl font-semibold">Categories</p>

      {/* Product Categories */}
      <div>
        <p className="text-[#023337] font-semibold text-base mb-2">
          Product Categories
        </p>

        <div className="relative">
          <select className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 pr-10 bg-[#F7F7F7] focus:outline-none">
            <option>Select your product</option>
            <option>Laptop</option>
            <option>SmartPhone</option>
            <option>Airpod</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* Product Tag */}
      <div>
        <p className="text-[#023337] font-semibold text-base mb-2">
          Product Tag
        </p>

        <div className="relative">
          <select className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 pr-10 bg-[#F7F7F7] focus:outline-none">
            <option>Select your product</option>
            <option>New</option>
            <option>Trending</option>
            <option>Best Seller</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* Select Color */}
      <div>
        <p className="text-[#023337] font-semibold text-base mb-3">
          Select your color
        </p>

        <div className="flex gap-4">
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`w-16 h-16 rounded-xl cursor-pointer shadow-md transition-all
              ${
                selectedColor === color
                  ? "ring-4 ring-[#4EA674]"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
