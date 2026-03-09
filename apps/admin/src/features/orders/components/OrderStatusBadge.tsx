import React from "react";

type Status = "Delivered" | "Pending" | "Cancelled" | "Shipped";

const color: Record<Status, string> = {
  Delivered: "#22c55e",
  Pending: "#f59e0b",
  Cancelled: "#ef4444",
  Shipped: "#111827",
};

export default function OrderStatusBadge({ status }: { status: Status }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: color[status],
        fontWeight: 500,
      }}
    >
      <img src="" width={18} />
      {status}
    </div>
  );
}
