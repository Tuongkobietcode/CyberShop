import React from "react";
import addOrdersIcon from "../../../assets/icons/circle-plus.png";
import moreOrdersIcon from "../../../assets/icons/DotsHorizontal.png";

const cardStyle: React.CSSProperties = {
  flex: 1,
  background: "#fff",
  borderRadius: 10,
  padding: 20,
  border: "1px solid #e5e7eb",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

export default function OrdersKpiRow() {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 25, fontWeight: "bold" }}>
            Order List
          </h2>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {/* ADD ORDER */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#22c55e",
              color: "#fff",
              border: "none",
              padding: "8px 14px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <img src={addOrdersIcon} width={16} />
            Add Order
          </button>

          {/* MORE ACTION */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              border: "1px solid #e5e7eb",
              background: "#fff",
              padding: "8px 14px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            More Action
            <img src={moreOrdersIcon} width={16} />
          </button>
        </div>
      </div>

      {/* KPI ROW */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={cardStyle}>
          <div style={{ fontSize: 14 }}>Total Orders</div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>
            1,240{" "}
            <span style={{ color: "#22c55e", fontSize: 14 }}>↑ 14.4%</span>
          </div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Last 7 days</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 14 }}>New Orders</div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>
            240 <span style={{ color: "#22c55e", fontSize: 14 }}>↑ 20%</span>
          </div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Last 7 days</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 14 }}>Completed Orders</div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>
            960 <span style={{ color: "#22c55e", fontSize: 14 }}>85%</span>
          </div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Last 7 days</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 14 }}>Canceled Orders</div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>
            87 <span style={{ color: "#ef4444", fontSize: 14 }}>↓ 5%</span>
          </div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Last 7 days</div>
        </div>
      </div>
    </div>
  );
}
