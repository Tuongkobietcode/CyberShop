import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/home/HomePage";
import AboutPage from "@/pages/about/AboutPage";
import ContactPage from "@/pages/contact/ContactPage";
import BlogPage from "@/pages/blog/BlogPage";
import BlogDetailPage from "@/pages/blog/BlogDetailPage";
import ProductsPage from "@/pages/products/ProductsPage";
import ProductDetailPage from "@/pages/product-detail/ProductDetailPage";
import CartPage from "@/pages/cart/CartPage";
import WishlistPage from "@/pages/wishlist/WishlistPage";
import AddressPage from "@/pages/checkout/address/AddressPage";
import ShippingPage from "@/pages/checkout/shipping/ShippingPage";
import PaymentPage from "@/pages/checkout/payment/PaymentPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SignInPage from "@/pages/sign-in/SignInPage";
import SignUpPage from "@/pages/sign-up/SignUpPage";
import RequireCustomerAuth from "@/features/auth/RequireCustomerAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/blog/:slug", element: <BlogDetailPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:slug", element: <ProductDetailPage /> },
      {
        element: <RequireCustomerAuth />,
        children: [
          { path: "/wishlist", element: <WishlistPage /> },
          { path: "/cart", element: <CartPage /> },
          { path: "/checkout/address", element: <AddressPage /> },
          { path: "/checkout/shipping", element: <ShippingPage /> },
          { path: "/checkout/payment", element: <PaymentPage /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },
      { path: "*", element: <Navigate to="/home" replace /> },
    ],
  },
]);
