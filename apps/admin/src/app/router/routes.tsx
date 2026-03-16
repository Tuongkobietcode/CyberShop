import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";
import { CustomersListPage } from "@/features/customers/pages/CustomersListPage";
import { CategoriesPage } from "@/features/categories/pages/CategoriesPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import OrdersListPage from "@/features/orders/pages/OrdersListPage";
import ProductListPage from "@/features/products/pages/ProductListPage";
import ProductCreatePage from "@/features/products/pages/ProductCreatePage";
import InventoryPage from "@/features/inventory/pages/InventoryPage";
import { AdminLoginPage } from "@/features/auth/pages/AdminLoginPage";
import { RequireAdminAuth } from "@/features/auth/RequireAdminAuth";
import TransactionsPage from "@/features/transactions/pages/TransactionsPage";
import AdminRolePage from "@/features/admin/pages/AdminRolePage";
import ModulePlaceholderPage from "@/components/feedback/ModulePlaceholderPage";

function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <ModulePlaceholderPage title={title} description={description} />
  );
}

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
          <Route
            path="coupons"
            element={
              <Placeholder
                title="Coupon Code Management"
                description="This marketing module has not been implemented yet. Core catalog, orders, customers, and dashboard flows are already live."
              />
            }
          />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/new" element={<ProductCreatePage />} />
          <Route path="products/inventory" element={<InventoryPage />} />
          <Route
            path="products/media"
            element={
              <Placeholder
                title="Product Media"
                description="Shared assets are already centralized. This page can be added later if you want dedicated media browsing or upload management."
              />
            }
          />
          <Route
            path="products/reviews"
            element={
              <Placeholder
                title="Product Reviews"
                description="Storefront review content is present, but admin moderation tooling for reviews has not been built yet."
              />
            }
          />
          <Route
            path="brands"
            element={
              <Placeholder
                title="Brands"
                description="Brand management is currently folded into product and category data. A separate brands module can be added when the data model needs it."
              />
            }
          />
          <Route path="admin-role" element={<AdminRolePage />} />
          <Route
            path="control-authority"
            element={
              <Placeholder
                title="Control Authority"
                description="Role and permission control has been intentionally deferred to keep the project basic. Admin auth is working, but granular RBAC is not enabled."
              />
            }
          />
          <Route path="*" element={<Navigate to={PATHS.dashboard} replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
