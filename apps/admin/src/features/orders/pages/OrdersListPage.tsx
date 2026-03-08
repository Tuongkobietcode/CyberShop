import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { getAdminOrders, updateAdminOrderStatus, type AdminOrder } from "../api/orders.api";

function formatMoney(value: number) {
  return value.toLocaleString("vi-VN");
}

export default function OrdersListPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  async function loadOrders() {
    setLoading(true);

    try {
      const response = await getAdminOrders({ limit: 100 });
      setOrders(response.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleConfirm(orderId: string) {
    setUpdatingId(orderId);
    try {
      await updateAdminOrderStatus(orderId, {
        orderStatus: "confirmed",
        paymentStatus: "paid",
      });
      await loadOrders();
    } finally {
      setUpdatingId("");
    }
  }

  async function handleShip(orderId: string) {
    setUpdatingId(orderId);
    try {
      await updateAdminOrderStatus(orderId, {
        orderStatus: "shipping",
      });
      await loadOrders();
    } finally {
      setUpdatingId("");
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Orders</h1>
        <p className="mt-1 text-sm text-slate-500">Manage live order activity from the backend.</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-slate-900">Order List</h2>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-10 text-center text-sm text-slate-500">Loading orders...</div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-100 px-4 py-4 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div>
                    <p className="font-medium text-slate-900">{order.orderCode}</p>
                    <p className="text-sm text-slate-500">
                      {order.customerName} · {order.customerPhone}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="grid gap-1 text-sm text-slate-600 lg:text-right">
                    <p>Status: {order.orderStatus}</p>
                    <p>Payment: {order.paymentStatus} · {order.paymentMethod}</p>
                    <p>Total: {formatMoney(order.totalAmount)}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleConfirm(order.id)}
                      disabled={updatingId === order.id}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {updatingId === order.id ? "Updating..." : "Mark Confirmed"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShip(order.id)}
                      disabled={updatingId === order.id}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Ship
                    </button>
                  </div>
                </div>
              ))}

              {orders.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-500">No orders found.</div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
