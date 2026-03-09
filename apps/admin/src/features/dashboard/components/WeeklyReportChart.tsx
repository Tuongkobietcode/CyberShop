import { FiMoreVertical } from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Sun", value: 15000 },
  { day: "Mon", value: 27000 },
  { day: "Tue", value: 27000 },
  { day: "Wed", value: 18000 },
  { day: "Thu", value: 35000 },
  { day: "Fri", value: 22000 },
  { day: "Sat", value: 30000 },
];

const stats = [
  { value: "52k", label: "Customers", active: true },
  { value: "3.5k", label: "Total Products" },
  { value: "2.5k", label: "Stock Products" },
  { value: "0.5k", label: "Out of Stock" },
  { value: "250k", label: "Revenue" },
];

const WeeklyReportChart = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-2/3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-700 text-lg">
          Report for this week
        </h2>

        <div className="flex items-center gap-3">
          {/* Toggle */}
          <div className="bg-green-50 rounded-xl p-1 flex text-sm">
            <button className="px-3 py-1 bg-white text-green-700 rounded-lg">
              This week
            </button>
            <button className="px-3 py-1 text-gray-500">Last week</button>
          </div>

          <FiMoreVertical className="text-gray-400 cursor-pointer" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-6 mt-6">
        {stats.map((item, i) => (
          <div key={i}>
            <p className="text-2xl font-semibold text-gray-800">{item.value}</p>
            <p className="text-sm text-gray-400 mt-1">{item.label}</p>

            <div
              className={`h-[2px] mt-3 ${
                item.active ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-72 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis dataKey="day" tick={{ fill: "#94a3b8" }} />

            <YAxis tick={{ fill: "#94a3b8" }} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#16a34a"
              strokeWidth={2}
              fill="url(#colorUv)"
              dot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyReportChart;
