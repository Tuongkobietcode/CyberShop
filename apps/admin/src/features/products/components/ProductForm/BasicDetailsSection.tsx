import { Pencil, Sparkles } from "lucide-react";

const BasicDetailsSection = () => {
  return (
    <div className="max-w-full p-5">
      {/* Tiêu đề */}
      <p className="font-semibold text-2xl">Basic Details</p>

      {/* Tên sản phẩm */}
      <p className="text-[#023337] font-semibold text-base mt-5 mb-2">
        Product Name
      </p>
      <input
        type="text"
        defaultValue="iPhone15"
        className="w-full bg-[#F9FAFB] border border-gray-400 rounded-xl px-4 py-3 text-gray-800 outline-none"
      />

      {/* Tiêu đề sản phẩm */}
      <p className="text-[#023337] font-semibold text-base mt-7 mb-2">
        Product Description
      </p>
      <div className="relative w-full max-w-3xl">
        <textarea
          className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none"
          rows={6}
          defaultValue="The iPhone 15 delivers cutting-edge performance with the A16 Bionic chip, an immersive Super Retina XDR display, advanced dual-camera system, and exceptional battery life, all encased in stunning aerospace-grade aluminum."
        />

        <div className="absolute bottom-4 right-4 flex gap-3 text-gray-600">
          <Pencil size={20} className="cursor-pointer" />
          <Sparkles size={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsSection;
