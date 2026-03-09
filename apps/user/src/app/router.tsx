import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import Login from "@/pages/login/Login";
import PaymentPage from "@/pages/checkout/payment/PaymentPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/checkout/payment", element: <PaymentPage /> },
]);
