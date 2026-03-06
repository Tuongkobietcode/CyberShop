import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import BasicDetailsSection from "./features/products/components/ProductForm/BasicDetailsSection";
import PricingSection from "./features/products/components/ProductForm/PricingSection";
import InventorySection from "./features/products/components/ProductForm/InventorySection";
import UploadImagesSection from "./features/products/components/ProductForm/UploadImagesSection";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UploadImagesSection></UploadImagesSection>
  </StrictMode>,
);
