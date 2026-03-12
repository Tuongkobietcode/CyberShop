import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import OrdersPage from "./features/orders/pages/OrdersPage";
import OrdersListPage from "./features/orders/pages/OrdersListPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OrdersListPage />
    {/* <OrdersPage /> */}
  </StrictMode>,
);
