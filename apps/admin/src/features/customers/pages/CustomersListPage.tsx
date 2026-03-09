import { useMemo, useState } from "react";
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

export function CustomersListPage() {
  const kpi: CustomersKpi = {
    totalCustomers: 11040,
    totalCustomersChangePct: 14.4,
    newCustomers: 2370,
    newCustomersChangePct: 20,
    visitors: 250000,
    visitorsChangePct: 20,
  };

  const metrics: CustomerOverviewMetric[] = [
    { label: "Active Customers", value: "25k" },
    { label: "Repeat Customers", value: "5.6k" },
    { label: "Shop Visitor", value: "250k" },
    { label: "Conversion Rate", value: "5.5%" },
  ];

  const points: CustomerOverviewPoint[] = [
    { day: "Sun", value: 21000 },
    { day: "Mon", value: 22000 },
    { day: "Tue", value: 31000 },
    { day: "Wed", value: 25409 },
    { day: "Thu", value: 42000 },
    { day: "Fri", value: 30000 },
    { day: "Sat", value: 35000 },
  ];

  const allRows: CustomerRow[] = [
    { id: "#CUST001", name: "John Doe", phone: "+1234567890", orderCount: 25, totalSpend: 3450, status: "active" },
    { id: "#CUST002", name: "John Doe", phone: "+1234567890", orderCount: 25, totalSpend: 3450, status: "active" },
    { id: "#CUST003", name: "John Doe", phone: "+1234567890", orderCount: 25, totalSpend: 3450, status: "active" },
    { id: "#CUST004", name: "John Doe", phone: "+1234567890", orderCount: 25, totalSpend: 3450, status: "active" },
    { id: "#CUST005", name: "Jane Smith", phone: "+1234567890", orderCount: 5, totalSpend: 250, status: "inactive" },
    { id: "#CUST006", name: "Emily Davis", phone: "+1234567890", orderCount: 30, totalSpend: 4600, status: "vip" },
    { id: "#CUST007", name: "Jane Smith", phone: "+1234567890", orderCount: 5, totalSpend: 250, status: "inactive" },
    { id: "#CUST008", name: "John Doe", phone: "+1234567890", orderCount: 25, totalSpend: 3450, status: "active" },
    { id: "#CUST009", name: "Emily Davis", phone: "+1234567890", orderCount: 30, totalSpend: 4600, status: "vip" },
    { id: "#CUST010", name: "Jane Smith", phone: "+1234567890", orderCount: 5, totalSpend: 250, status: "inactive" },
  ];

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = 24; // để giống ảnh (demo)
  const rows = useMemo(() => {
    // demo: page 1 show allRows, page khác show lại (để UI không trống)
    if (page === 1) return allRows;
    return allRows.map((r) => ({ ...r, id: r.id.replace("#CUST", `#CUST${page}`) }));
  }, [page]);

  return (
    <div className="space-y-4">
      {/* Top section: KPI column + Overview */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-4">
          <CustomersKpiColumn kpi={kpi} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <CustomerOverviewCard metrics={metrics} points={points} />
        </div>
      </div>

      {/* Table */}
      <CustomersTable rows={rows.slice(0, pageSize)} />

      {/* Pagination */}
      <div className="px-1">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
