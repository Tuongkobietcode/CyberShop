import { FiMoreVertical } from "react-icons/fi";
import ReactCountryFlag from "react-country-flag";

const countries = [
  {
    name: "US",
    code: "US",
    value: "30k",
    percent: "25.8%",
    trend: "up",
    width: "75%",
  },
  {
    name: "Brazil",
    code: "BR",
    value: "30k",
    percent: "15.8%",
    trend: "down",
    width: "50%",
  },
  {
    name: "Australia",
    code: "AU",
    value: "25k",
    percent: "35.8%",
    trend: "up",
    width: "70%",
  },
];

const UsersLast30Min = () => {
  const bars = Array.from({ length: 24 });

  return (
    <div className="bg-white rounded-2xl w-1/3 p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-start">
        <p className="text-blue-600 font-medium">Users in last 30 minutes</p>

        <FiMoreVertical className="text-gray-400 cursor-pointer" />
      </div>

      {/* Total */}
      <h2 className="text-4xl font-bold mt-2 text-gray-800">21.5K</h2>

      {/* Chart label */}
      <p className="text-gray-500 mt-4 mb-2 text-sm">Users per minute</p>

      {/* Mini chart */}
      <div className="flex items-end gap-1 h-16 w-full">
        {bars.map((_, i) => (
          <div
            key={i}
            className="bg-[#4EA674] flex-1 rounded-sm"
            style={{
              height: `${Math.random() * 60 + 10}px`,
            }}
          />
        ))}
      </div>

      {/* Sales by Country */}
      <div className="mt-6 flex justify-between items-center">
        <p className="font-semibold text-gray-700">Sales by Country</p>
        <p className="font-semibold text-gray-700">Sales</p>
      </div>

      <div className="space-y-4 mt-4">
        {countries.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            {/* Flag */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <ReactCountryFlag
                countryCode={item.code}
                svg
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Name */}
            <div className="w-16">
              <p className="font-semibold text-gray-800">{item.value}</p>
              <p className="text-sm text-gray-400">{item.name}</p>
            </div>

            {/* Progress */}
            <div className="flex-1">
              <div className="w-full bg-gray-100 h-2 rounded-full">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: item.width }}
                ></div>
              </div>
            </div>

            {/* Trend */}
            <p
              className={`text-sm font-medium ${
                item.trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.trend === "up" ? "↑" : "↓"} {item.percent}
            </p>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="w-full mt-6 border border-blue-500 text-blue-500 py-2 rounded-full hover:bg-blue-50">
        View Insight
      </button>
    </div>
  );
};

export default UsersLast30Min;
