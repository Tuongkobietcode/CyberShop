import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import ProductsPage from "@/pages/products/ProductsPage";
import ProductDetailPage from "@/pages/product-detail/ProductDetailPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/products/:slug", element: <ProductDetailPage /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);
