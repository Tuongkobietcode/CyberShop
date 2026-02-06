import { useState } from "react";
import phone from "../../assets/images/Images.png";
import screenIcon from "../../assets/images/Screensize.png";
import cpuIcon from "../../assets/images/Cpu.png";
import coreIcon from "../../assets/images/Core.png";
import cameraIcon from "../../assets/images/Camera.png";
import frontCameraIcon from "../../assets/images/FrontCamera.png";
import batteryIcon from "../../assets/images/Battery.png";
import { FiTruck, FiCheckCircle } from "react-icons/fi";
import { MdOutlineStore } from "react-icons/md";

const COLORS = [
  "bg-black",
  "bg-purple-600",
  "bg-red-500",
  "bg-yellow-400",
  "bg-gray-200",
];

const STORAGES = ["128GB", "256GB", "512GB", "1TB"];

const SPECS = [
  {
    label: "Screen size",
    value: "6.7”",
    img: screenIcon,
  },
  {
    label: "CPU",
    value: "Apple A16 Bionic",
    img: cpuIcon,
  },
  {
    label: "Number of Cores",
    value: "6",
    img: coreIcon,
  },
  {
    label: "Main camera",
    value: "48-12-12 MP",
    img: cameraIcon,
  },
  {
    label: "Front-camera",
    value: "12 MP",
    img: frontCameraIcon,
  },
  {
    label: "Battery capacity",
    value: "4323 mAh",
    img: batteryIcon,
  },
];

const SERVICES = [
  {
    title: "Free Delivery",
    desc: "1-2 day",
    icon: <FiTruck size={22} />,
  },
  {
    title: "In Stock",
    desc: "Today",
    icon: <MdOutlineStore size={22} />,
  },
  {
    title: "Guaranteed",
    desc: "1 year",
    icon: <FiCheckCircle size={22} />,
  },
];

const ProductDetailPage = () => {
  const [color, setColor] = useState("bg-black");
  const [storage, setStorage] = useState("1TB");

  return (
    <div className="flex min-h-screen">
      {/* LEFT */}
      <div className="w-1/2 p-30">
        <img src={phone} />
      </div>

      {/* RIGHT */}
      <div className="w-1/2 bg-white p-10">
        <div className="max-w-full space-y-6">
          {/* title */}
          <h1 className="text-3xl font-bold">Apple iPhone 14 Pro Max</h1>

          {/* price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold">$1399</span>
            <span className="text-gray-400 line-through">$1499</span>
          </div>

          {/* colors */}
          <div className="flex">
            <p className="text-sm text-black mb-2 mr-4">Select color :</p>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full ${c} ${
                    color === c ? "ring-2 ring-black" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* storage */}
          <div>
            <div className="flex gap-3">
              {STORAGES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStorage(s)}
                  className={`px-4 py-2 w-full rounded-lg border-2 text-sm ${
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

          {/* specs */}
          <div className=" grid grid-cols-3 gap-3 text-sm">
            {SPECS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl p-4 bg-[#F4F4F4]"
              >
                <img src={item.img} className="w-6 h-6" />

                <div>
                  <p className="text-gray-400 text-xs">{item.label}</p>
                  <p className="text-[#4E4E4E] font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* description */}
          <p className="text-gray-500 text-sm">
            Enhanced capabilities thanks to an enlarged display of 6.7 inches
            and work without recharging throughout the day.
          </p>

          {/* buttons */}
          <div className="flex gap-3">
            <button className="flex-1 border-2 py-3 rounded-lg">
              Add to Wishlist
            </button>
            <button className="flex-1 bg-black text-white py-3 rounded-lg">
              Add to Cart
            </button>
          </div>

          {/* services */}
          <div className="flex justify-between mt-6 gap-3">
            {SERVICES.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1"
              >
                <div className="w-15 h-15 rounded-xl bg-[#F7F7F7] flex items-center justify-center text-[#797979]">
                  {item.icon}
                </div>

                <div className="text-sm">
                  <p className="text-gray-400">{item.title}</p>
                  <p className="font-medium text-black">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
