import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FilterSidebar from "./pages/products/components/FilterSidebar";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterSidebar />
  </StrictMode>,
);
