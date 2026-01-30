import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/layout/Header";
import { BrowserRouter } from "react-router-dom";
import Breadcrumb from "./components/layout/Breadcrumb";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Breadcrumb />
  </BrowserRouter>,
);
