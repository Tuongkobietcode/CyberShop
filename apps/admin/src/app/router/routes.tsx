import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";
import { CustomersListPage } from "@/features/customers/pages/CustomersListPage";
import CustomerDetailsPage from "@/features/customers/pages/CustomerDetailsPage";
import { CategoriesPage } from "@/features/categories/pages/CategoriesPage";
import BlogPostsPage from "@/features/blog/pages/BlogPostsPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import OrdersListPage from "@/features/orders/pages/OrdersListPage";
import ProductListPage from "@/features/products/pages/ProductListPage";
import ProductCreatePage from "@/features/products/pages/ProductCreatePage";
import InventoryPage from "@/features/inventory/pages/InventoryPage";
import { AdminLoginPage } from "@/features/auth/pages/AdminLoginPage";
import { RequireAdminAuth } from "@/features/auth/RequireAdminAuth";
import TransactionsPage from "@/features/transactions/pages/TransactionsPage";
import AdminRolePage from "@/features/admin/pages/AdminRolePage";
import ContactInboxPage from "@/features/contact/pages/ContactInboxPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route element={<RequireAdminAuth />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="orders" element={<OrdersListPage />} />
          <Route path="customers" element={<CustomersListPage />} />
          <Route path="customers/:id" element={<CustomerDetailsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="blog" element={<BlogPostsPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="contact-inbox" element={<ContactInboxPage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/new" element={<ProductCreatePage />} />
          <Route path="products/inventory" element={<InventoryPage />} />
          <Route path="admin-role" element={<AdminRolePage />} />
          <Route path="*" element={<Navigate to={PATHS.dashboard} replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
