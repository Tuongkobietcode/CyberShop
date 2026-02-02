import { useState } from "react";

const COLORS = [
  "bg-black",
  "bg-purple-600",
  "bg-red-500",
  "bg-yellow-400",
  "bg-gray-200",
];

const STORAGES = ["128GB", "256GB", "512GB", "1TB"];

const ProductDetailPage = () => {
  const [color, setColor] = useState("bg-black");
  const [storage, setStorage] = useState("1TB");

  return (
    <div className="flex min-h-screen">
      {/* LEFT */}
      <div className={`w-1/2 bg-black`}></div>

      {/* RIGHT */}
      <div className="w-1/2 bg-white p-10">
        <div className="max-w-md space-y-6">
          {/* title */}
          <h1 className="text-2xl font-bold">Apple iPhone 14 Pro Max</h1>

          {/* price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold">$1399</span>
            <span className="text-gray-400 line-through">$1499</span>
          </div>

          {/* colors */}
          <div className="flex">
            <p className="text-sm text-gray-500 pr-4">Select color:</p>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full ${c} ${
                    color === c ? "ring-1 ring-black" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* storage */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Storage :</p>
            <div className="flex gap-3 flex-wrap">
              {STORAGES.map((s) => (
                <button
                  onClick={() => setStorage(s)}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    storage === s
                      ? "border-black text-black"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* description */}
          <p className="text-gray-500 text-sm">
            Enhanced capabilities thanks to an enlarged display of 6.7 inches
            and work without recharging throughout the day.
          </p>

          {/* specs */}

          {/* buttons */}
          <div className="flex gap-3">
            <button className="flex-1 border py-3 rounded-lg">
              Add to Wishlist
            </button>
            <button className="flex-1 bg-black text-white py-3 rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
