// import { createBrowserRouter, Navigate } from "react-router-dom";

// // Layout
// import MainLayout from "@/components/layout/MainLayout";

// // Pages
// import HomePage from "@/pages/home/HomePage";
// import ProductsPage from "@/pages/products/ProductsPage";
// import ProductDetailPage from "@/pages/product-detail/ProductDetailPage";

// import CartPage from "@/pages/cart/CartPage";

// import AddressPage from "@/pages/checkout/address/AddressPage";
// import ShippingPage from "@/pages/checkout/shipping/ShippingPage";
// import PaymentPage from "@/pages/checkout/payment/PaymentPage";

// export const router = createBrowserRouter([
//   {
//     element: <MainLayout />,
//     children: [
//       { path: "/", element: <HomePage /> },

//       // Products
//       { path: "/products", element: <ProductsPage /> },
//       { path: "/products/:id", element: <ProductDetailPage /> },

//       // Cart
//       { path: "/cart", element: <CartPage /> },

//       // Checkout (redirect nếu user gõ /checkout)
//       { path: "/checkout", element: <Navigate to="/checkout/address" replace /> },
//       { path: "/checkout/address", element: <AddressPage /> },
//       { path: "/checkout/shipping", element: <ShippingPage /> },
//       { path: "/checkout/payment", element: <PaymentPage /> },

//       // 404 -> về home (hoặc tạo NotFoundPage nếu muốn)
//       { path: "*", element: <Navigate to="/" replace /> },
//     ],
//   },
// ]);

import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
]);