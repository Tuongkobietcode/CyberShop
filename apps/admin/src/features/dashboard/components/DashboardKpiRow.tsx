import { FiMoreVertical } from "react-icons/fi";

const DashboardKpiRow = () => {
  return (
    <div className="grid grid-cols-3 gap-6 p-5">
      {/* Card 1 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-800">Total Sales</p>
            <p className="text-sm text-gray-400">Last 7 days</p>
          </div>

          <FiMoreVertical className="text-gray-400 cursor-pointer" />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-[#0B3C3D]">$350K</h2>
            <span className="text-sm text-gray-600">Sales</span>
            <span className="text-green-600 text-sm font-medium">↑ 10.4%</span>
          </div>

          <p className="text-sm text-gray-400 mt-2">
            Previous 7days <span className="text-blue-500">($235)</span>
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <button className="px-5 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 text-sm">
            Details
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-800">Total Orders</p>
            <p className="text-sm text-gray-400">Last 7 days</p>
          </div>

          <FiMoreVertical className="text-gray-400 cursor-pointer" />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-[#0B3C3D]">10.7K</h2>
            <span className="text-sm text-gray-600">order</span>
            <span className="text-green-600 text-sm font-medium">↑ 14.4%</span>
          </div>

          <p className="text-sm text-gray-400 mt-2">
            Previous 7days <span className="text-blue-500">(7.6k)</span>
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <button className="px-5 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 text-sm">
            Details
          </button>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-800">Pending & Canceled</p>
            <p className="text-sm text-gray-400">Last 7 days</p>
          </div>

          <FiMoreVertical className="text-gray-400 cursor-pointer" />
        </div>

        <div className="flex items-center justify-between mt-5">
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#0B3C3D]">509</span>
              <span className="text-green-600 text-sm">user 204</span>
            </div>
          </div>

          <div className="w-px h-10 bg-gray-200"></div>

          <div>
            <p className="text-sm text-gray-500">Canceled</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-red-500">94</span>
              <span className="text-red-500 text-sm">↓ 14.4%</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button className="px-5 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 text-sm">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardKpiRow;
