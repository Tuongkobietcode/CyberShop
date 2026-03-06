import React from "react";

type Status = "complete" | "pending" | "canceled";

type Transaction = {
  id: string;
  name: string;
  date: string;
  total: string;
  method: string;
  status: Status;
};

const transactions: Transaction[] = [
  { id: "#CUST001", name: "John Doe", date: "01-01-2025", total: "$2,904", method: "CC", status: "complete" },
  { id: "#CUST001", name: "John Doe", date: "01-01-2025", total: "$2,904", method: "PayPal", status: "complete" },
  { id: "#CUST001", name: "John Doe", date: "01-01-2025", total: "$2,904", method: "CC", status: "complete" },
  { id: "#CUST001", name: "John Doe", date: "01-01-2025", total: "$2,904", method: "Bank", status: "complete" },
  { id: "#CUST001", name: "Jane Smith", date: "01-01-2025", total: "$2,904", method: "CC", status: "canceled" },
  { id: "#CUST001", name: "Emily Davis", date: "01-01-2025", total: "$2,904", method: "PayPal", status: "pending" },
  { id: "#CUST001", name: "Jane Smith", date: "01-01-2025", total: "$2,904", method: "Bank", status: "canceled" },
];

const statusStyle = {
  complete: "text-green-600",
  pending: "text-yellow-500",
  canceled: "text-red-500",
};

const statusText = {
  complete: "Hoàn thành",
  pending: "Đang chờ xử lý",
  canceled: "Đã huỷ",
};

export const TransactionsTable: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden">

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="bg-green-100 text-gray-700">
          <tr>
            <th className="text-left px-6 py-3 font-medium">Mã khách hàng</th>
            <th className="text-left px-6 py-3 font-medium">Tên</th>
            <th className="text-left px-6 py-3 font-medium">Ngày</th>
            <th className="text-left px-6 py-3 font-medium">Tổng</th>
            <th className="text-left px-6 py-3 font-medium">Phương thức</th>
            <th className="text-left px-6 py-3 font-medium">Trạng thái</th>
            <th className="text-left px-6 py-3 font-medium">Hoạt động</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="border-t border-gray-300">
              <td className="px-6 py-4">{t.id}</td>
              <td className="px-6 py-4">{t.name}</td>
              <td className="px-6 py-4">{t.date}</td>
              <td className="px-6 py-4">{t.total}</td>
              <td className="px-6 py-4">{t.method}</td>

              {/* Status */}
              <td className="px-6 py-4">
                <span className={`flex items-center gap-2 ${statusStyle[t.status]}`}>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  {statusText[t.status]}
                </span>
              </td>

              {/* Action */}
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:underline">
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4">

        <button className="px-4 py-2 shadow-sm rounded-lg hover:bg-gray-50">
          ← Trước
        </button>

        <div className="flex gap-2">
          <button className="px-3 py-1 bg-green-200 rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded">3</button>
          <button className="px-3 py-1 border border-gray-300 rounded">4</button>
          <button className="px-3 py-1 border border-gray-300 rounded">5</button>
          <button className="px-3 py-1 border border-gray-300 rounded">...</button>
          <button className="px-3 py-1 border border-gray-300 rounded">24</button>
        </div>

        <button className="px-4 py-2 shadow-sm rounded-lg hover:bg-gray-50">
          Sau →
        </button>

      </div>
    </div>
  );
};