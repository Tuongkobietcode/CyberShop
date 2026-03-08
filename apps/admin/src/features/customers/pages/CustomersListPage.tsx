import { useEffect, useMemo, useState } from "react";
import { CustomersKpiColumn } from "../components/CustomersKpiColumn";
import { CustomerOverviewCard } from "../components/CustomerOverviewCard";
import { CustomersTable } from "../components/CustomersTable";
import { Pagination } from "@/components/data-display/Pagination";
import type {
  CustomerOverviewMetric,
  CustomerOverviewPoint,
  CustomerRow,
  CustomersKpi,
} from "../types";
import { getAdminCustomers } from "../api/customers.api";

export function CustomersListPage() {
  const [page, setPage] = useState(1);
  const [allRows, setAllRows] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(allRows.length / pageSize));

  useEffect(() => {
    async function loadCustomers() {
      setLoading(true);

      try {
        const response = await getAdminCustomers({ limit: 100 });
        setAllRows(
          response.data.map((customer) => ({
            id: customer.id,
            name: customer.name,
            phone: customer.phone,
            orderCount: customer.orderCount,
            totalSpend: customer.totalSpend,
            status: customer.status,
          }))
        );
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  const rows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allRows.slice(start, start + pageSize);
  }, [allRows, page]);

  const activeCount = allRows.filter((item) => item.status === "active").length;
  const vipCount = allRows.filter((item) => item.status === "vip").length;
  const totalSpend = allRows.reduce((sum, item) => sum + item.totalSpend, 0);
  const avgOrders =
    allRows.length > 0
      ? allRows.reduce((sum, item) => sum + item.orderCount, 0) / allRows.length
      : 0;

  const kpi: CustomersKpi = {
    totalCustomers: allRows.length,
    totalCustomersChangePct: 0,
    newCustomers: allRows.length,
    newCustomersChangePct: 0,
    visitors: totalSpend,
    visitorsChangePct: 0,
  };

  const metrics: CustomerOverviewMetric[] = [
    { label: "Active Customers", value: String(activeCount) },
    { label: "VIP Customers", value: String(vipCount) },
    { label: "Total Spend", value: totalSpend.toLocaleString() },
    { label: "Avg Orders", value: avgOrders.toFixed(1) },
  ];

  const days: CustomerOverviewPoint["day"][] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const points: CustomerOverviewPoint[] = days.map((day, index) => ({
    day,
    value: activeCount * 120 + vipCount * 150 + index * 30,
  }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-4">
          <CustomersKpiColumn kpi={kpi} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <CustomerOverviewCard metrics={metrics} points={points} />
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center text-sm text-slate-500">
          Loading customers...
        </div>
      ) : (
        <CustomersTable rows={rows} />
      )}

      <div className="px-1">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
