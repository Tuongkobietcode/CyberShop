import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { StatCard } from "@/components/data-display/StatCard";
import { getDashboardSummary } from "../api/dashboard.api";
import type { DashboardSummary } from "../types";

function formatMoney(value: number) {
  return value.toLocaleString("vi-VN");
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      setLoading(true);

      try {
        setSummary(await getDashboardSummary());
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  if (loading) {
    return <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-center text-sm text-slate-500">Loading dashboard...</div>;
  }

  if (!summary) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-600">Dashboard data is unavailable.</div>;
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Live metrics from the CyberShop API.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Revenue" value={formatMoney(summary.overview.totalRevenue)} subtitle="All time" />
        <StatCard title="Orders" value={String(summary.overview.totalOrders)} subtitle="All time" />
        <StatCard title="Customers" value={String(summary.overview.totalCustomers)} subtitle="Registered" />
        <StatCard title="Pending Orders" value={String(summary.overview.pendingOrders)} subtitle="Needs action" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {summary.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">{order.orderCode}</p>
                  <p className="text-sm text-slate-500">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-900">{formatMoney(order.totalAmount)}</p>
                  <p className="text-sm text-slate-500">{order.orderStatus}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-slate-900">Top Products</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {summary.topProducts.map((item) => (
              <div key={item._id} className="rounded-2xl border border-slate-100 px-4 py-3">
                <p className="font-medium text-slate-900">{item.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Sold {item.quantitySold} units · Revenue {formatMoney(item.revenue)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
