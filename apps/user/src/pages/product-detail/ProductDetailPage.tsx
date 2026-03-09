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
import { ChevronDown } from "lucide-react";

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

const SCREEN_DETAILS = [
  { label: "Screen diagonal", value: "6.7″" },
  { label: "The screen resolution", value: "2796×1290" },
  { label: "The screen refresh rate", value: "120 Hz" },
  { label: "The pixel density", value: "460 ppi" },
  { label: "Screen type", value: "OLED" },
  {
    label: "Additionally",
    value: `Dynamic Island
Always-On display
HDR display
True Tone
Wide color (P3)`,
  },
];

const CPU_DETAILS = [
  { label: "CPU", value: "A16 Bionic" },
  { label: "Number of cores", value: "6" },
];

const REVIEW_STATS = [
  { label: "Excellent", value: 100 },
  { label: "Good", value: 11 },
  { label: "Average", value: 3 },
  { label: "Below Average", value: 8 },
  { label: "Poor", value: 1 },
];

const REVIEWS = [
  {
    name: "Grace Carey",
    rating: 4,
    date: "24 January, 2023",
    text: "I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn't be happier with my purchase!",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    name: "Ronald Richards",
    rating: 5,
    date: "24 January, 2023",
    text: "This phone has 1TB storage and is durable. Plus all the new iPhones have a C port!",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
];

const ProductDetailPage = () => {
  const [color, setColor] = useState("bg-black");
  const [storage, setStorage] = useState("1TB");
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-row">
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

      {/* DETAILS */}
      <div className="bg-white mt-20 p-20 rounded-xl w-3/4 mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>

        <p className="text-gray-400 text-sm leading-6 mb-8 max-w-5xl">
          Just as a book is judged by its cover, the first thing you notice when
          you pick up a modern smartphone is the display. Nothing surprising,
          because advanced technologies allow you to practically level the
          display frames.
        </p>

        {/* SCREEN */}
        <h3 className="font-semibold text-lg mb-4">Screen</h3>

        <div className="border-t border-gray-200">
          {SCREEN_DETAILS.map((item) => (
            <div
              key={item.label}
              className="flex justify-between py-4 border-b border-gray-200 text-sm"
            >
              <span className="text-gray-500">{item.label}</span>

              <span className="text-gray-800 text-right whitespace-pre-line">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* CPU */}
        <h3 className="font-semibold text-lg mt-10 mb-4">CPU</h3>

        <div>
          {CPU_DETAILS.map((item) => (
            <div
              key={item.label}
              className="flex justify-between py-4 border-gray-200 border-b text-sm"
            >
              <span className="text-gray-500">{item.label}</span>
              <span className="text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>

        {/* VIEW MORE */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-2 border px-10 py-2 rounded-lg hover:bg-gray-50"
          >
            View More
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="bg-white mt-20 p-20 rounded-xl w-3/4 mx-auto">
        <h2 className="text-2xl font-semibold mb-10">Reviews</h2>

        <div className="flex gap-16 mb-10">
          {/* SCORE */}
          <div className="bg-gray-50 rounded-xl px-10 py-8 text-center">
            <p className="text-5xl font-bold">4.8</p>
            <p className="text-gray-400 text-sm mt-2">of 125 reviews</p>

            <div className="flex justify-center gap-1 mt-3 text-orange-400">
              {"★★★★★"}
            </div>
          </div>

          {/* BARS */}
          <div className="flex-1 space-y-3">
            {REVIEW_STATS.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="w-32 text-sm text-gray-600">{item.label}</span>

                <div className="flex-1 h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-orange-300 rounded"
                    style={{ width: `${item.value}%` }}
                  />
                </div>

                <span className="text-sm text-gray-400 w-6">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COMMENT INPUT */}
        <input
          placeholder="Leave Comment"
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm mb-10"
        />

        {/* REVIEWS LIST */}
        <div className="space-y-6">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-3">
                  <img src={review.avatar} className="w-10 h-10 rounded-full" />

                  <div>
                    <p className="font-medium">{review.name}</p>

                    <div className="text-orange-400 text-sm">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>

                <span className="text-gray-400 text-sm">{review.date}</span>
              </div>

              <p className="text-gray-500 text-sm leading-6">{review.text}</p>
            </div>
          ))}
        </div>

        {/* VIEW MORE */}
        <div className="flex justify-center mt-10">
          <button className="flex items-center gap-2 border px-10 py-2 rounded-lg hover:bg-gray-50">
            View More
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
