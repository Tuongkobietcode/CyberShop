import React from "react";
import { MoreVertical } from "lucide-react";

type KpiCardProps = {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
};

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, positive }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
        <MoreVertical size={16} className="text-gray-500 cursor-pointer" />
      </div>

      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold text-gray-900">{value}</span>

        <span
          className={`text-sm font-medium flex items-center gap-1 ${
            positive ? "text-green-600" : "text-red-500"
          }`}
        >
          {positive ? "↑" : "↓"} {change}
        </span>
      </div>

      <span className="text-xs text-gray-400">Last 7 days</span>
    </div>
  );
};

export const TransactionKpiRow: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <KpiCard
        title="Total Revenue"
        value="$15,045"
        change="14.4%"
        positive
      />

      <KpiCard
        title="Completed Transactions"
        value="3,150"
        change="20%"
        positive
      />

      <KpiCard
        title="Pending Transactions"
        value="150"
        change="85%"
        positive
      />

      <KpiCard
        title="Failed Transactions"
        value="75"
        change="15%"
        positive={false}
      />
    </div>
  );
};