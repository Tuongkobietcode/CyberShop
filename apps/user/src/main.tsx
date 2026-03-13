import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AuthProvider } from "@/features/auth/auth.context";
import { CartProvider } from "@/features/cart/cart.context";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import Header from "./components/layout/Header";
import Breadcrumb from "./components/layout/Breadcrumb";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
