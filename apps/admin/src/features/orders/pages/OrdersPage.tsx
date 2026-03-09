import React from "react";
import OrdersKpiRow from "../components/OrdersKpiRow";
import OrdersToolbar from "../components/OrdersToolbar";
import OrdersTable from "../components/OrdersTable";

const OrdersPage = () => {
  return (
    <div
      style={{
        padding: 30,
        background: "#f9fafb",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <OrdersKpiRow />
      <OrdersToolbar />
      <OrdersTable />
    </div>
  );
};

export default OrdersPage;
