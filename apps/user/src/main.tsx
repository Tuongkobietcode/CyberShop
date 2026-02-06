import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AddressForm from "./pages/checkout/address/components/AddressForm";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AddressForm />
  </StrictMode>,
);
