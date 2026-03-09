import { FiFilter } from "react-icons/fi";

const transactions = [
  {
    id: 1,
    customer: "#6545",
    date: "01 Oct | 11:29 am",
    status: "paid",
    amount: "$64",
  },
  {
    id: 2,
    customer: "#5412",
    date: "01 Oct | 11:29 am",
    status: "pending",
    amount: "$557",
  },
  {
    id: 3,
    customer: "#6622",
    date: "01 Oct | 11:29 am",
    status: "paid",
    amount: "$156",
  },
  {
    id: 4,
    customer: "#6462",
    date: "01 Oct | 11:29 am",
    status: "paid",
    amount: "$265",
  },
  {
    id: 5,
    customer: "#6462",
    date: "01 Oct | 11:29 am",
    status: "paid",
    amount: "$265",
  },
];

const TransactionTable = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-3/4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold mb-3">Transaction</h2>

        <button className="flex items-center gap-2 bg-[#4EA674] text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600">
          Filter
          <FiFilter />
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr] text-gray-500 text-sm border-b pb-3">
        <span>No</span>
        <span>Id Customer</span>
        <span>Order Date</span>
        <span>Status</span>
        <span className="text-right pr-6">Amount</span>
      </div>

      {/* Table rows */}
      <div>
        {transactions.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr] items-center py-4 text-sm"
          >
            <span className="font-semibold">{index + 1}.</span>
            <span className="font-semibold">{item.customer}</span>
            <span className="font-semibold">{item.date}</span>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  item.status === "paid" ? "bg-green-500" : "bg-yellow-400"
                }`}
              ></span>

              <span
                className={`font-medium ${
                  item.status === "paid" ? "text-green-600" : "text-yellow-500"
                }`}
              >
                {item.status === "paid" ? "Paid" : "Pending"}
              </span>
            </div>

            {/* Amount */}
            <span className="text-right pr-6 font-medium">{item.amount}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-5">
        <button className="px-6 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50">
          Details
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
