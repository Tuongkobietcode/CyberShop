import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/layout/Header";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Header />
  </BrowserRouter>,
);
