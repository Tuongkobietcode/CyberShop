import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AddressForm from "./pages/checkout/address/components/AddressForm";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import Header from "./components/layout/Header";
import Breadcrumb from "./components/layout/Breadcrumb";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AddressForm />
  </StrictMode>,
);
