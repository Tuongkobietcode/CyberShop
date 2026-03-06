import React from "react";
import { ImagePlus, RefreshCw, Plus, X } from "lucide-react";

const UploadImagesSection = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl max-w-3xl">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-6">Upload Product Image</h2>

      {/* Upload box */}
      <div className="border border-gray-300 rounded-xl bg-gray-50 p-6">
        {/* label */}
        <p className="text-sm font-medium text-[#1f4f46] mb-6">Product Image</p>

        {/* Image preview */}
        <div className="flex justify-center mb-6">
          <img
            src="https://images.unsplash.com/photo-1695048133142-1a20484d2569"
            alt="product"
            className="h-40 object-contain"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-lg bg-white hover:bg-gray-50">
            <ImagePlus size={18} />
            Browse
          </button>

          <button className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-lg bg-white hover:bg-gray-50">
            <RefreshCw size={18} />
            Replace
          </button>
        </div>
      </div>

      {/* Thumbnail section */}
      <div className="bg-gray-100 mt-6 flex gap-4 items-center">
        {/* Thumbnail 1 */}
        <div className="relative w-24 h-24 bg-white border rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1695048133142-1a20484d2569"
            className="h-16 object-contain"
          />

          <button className="absolute top-1 right-1 bg-white border rounded-full p-1 shadow">
            <X size={12} />
          </button>
        </div>

        {/* Thumbnail 2 */}
        <div className="relative w-24 h-24 bg-white border rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1695048133142-1a20484d2569"
            className="h-16 object-contain"
          />

          <button className="absolute top-1 right-1 bg-white border rounded-full p-1 shadow">
            <X size={12} />
          </button>
        </div>

        {/* Add image */}
        <div className="w-40 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-[#4EA674] cursor-pointer hover:bg-gray-50">
          <Plus size={20} />
          <span className="text-sm mt-1">Add Image</span>
        </div>
      </div>
    </div>
  );
};

export default UploadImagesSection;
