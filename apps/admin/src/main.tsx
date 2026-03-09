import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ProductTable from "./features/products/components/ProductTable";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductTable></ProductTable>
  </StrictMode>,
);
