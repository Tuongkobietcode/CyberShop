import { Image, RefreshCw, Plus, X } from "lucide-react";
import { useState } from "react";

const UploadImagesSection = () => {
  // ảnh lớn (cover)
  const [mainImage, setMainImage] = useState<string | null>(null);

  // danh sách ảnh nhỏ
  const [subImages, setSubImages] = useState<string[]>([]);

  // upload ảnh lớn
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setMainImage(preview);
  };

  // upload ảnh nhỏ bên dưới
  const handleSubImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );

    setSubImages((prev) => [...prev, ...newImages]);
  };

  // xóa ảnh nhỏ
  const removeImage = (index: number) => {
    setSubImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-xl max-w-xl">
      {/* title */}
      <p className="text-2xl font-semibold mb-5">Upload Product Image</p>

      {/* label */}
      <p className="text-[#023337] font-semibold text-base mb-3">
        Product Image
      </p>

      {/* khung preview ảnh chính */}
      <div className="relative border border-gray-300 rounded-xl bg-[#F9FAFB] p-8 flex items-center justify-center h-[280px]">
        {mainImage ? (
          <img
            src={mainImage}
            alt="preview"
            className="max-h-[300px] object-contain"
          />
        ) : (
          <div className="text-gray-400">No image selected</div>
        )}

        {/* input upload ảnh chính */}
        <input
          type="file"
          accept="image/*"
          onChange={handleMainImageUpload}
          className="hidden"
          id="main-upload"
        />

        {/* Browse */}
        <label
          htmlFor="main-upload"
          className="absolute left-4 bottom-4 flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 cursor-pointer"
        >
          <Image size={16} />
          Browse
        </label>

        {/* Replace */}
        {mainImage && (
          <label
            htmlFor="main-upload"
            className="absolute right-4 bottom-4 flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 cursor-pointer"
          >
            <RefreshCw size={16} />
            Replace
          </label>
        )}
      </div>

      {/* danh sách ảnh nhỏ */}
      <div className="flex gap-4 mt-6 flex-wrap">
        {subImages.map((img, index) => (
          <div
            key={index}
            className="relative w-28 h-28 border border-gray-300 rounded-xl bg-[#F9FAFB] flex items-center justify-center"
          >
            <img
              src={img}
              alt="preview"
              className="max-h-[80px] object-contain"
            />

            {/* nút xóa */}
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-white border border-gray-300 rounded-full p-1"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {/* Add Image */}
        <label className="w-36 h-28 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#4EA674]">
          <Plus size={20} className="text-[#4EA674]" />
          <span className="text-[#4EA674] text-xs">Add Image</span>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleSubImageUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default UploadImagesSection;
