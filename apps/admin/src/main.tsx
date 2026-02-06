import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import OrdersListPage from "./features/orders/pages/OrdersListPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OrdersListPage />
  </StrictMode>,
);
