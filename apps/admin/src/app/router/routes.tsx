import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";
import { CustomersListPage } from "@/features/customers/pages/CustomersListPage";
import { CategoriesPage } from "@/features/categories/pages/CategoriesPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import OrdersListPage from "@/features/orders/pages/OrdersListPage";
import ProductListPage from "@/features/products/pages/ProductListPage";
import ProductCreatePage from "@/features/products/pages/ProductCreatePage";
import { AdminLoginPage } from "@/features/auth/pages/AdminLoginPage";
import { RequireAdminAuth } from "@/features/auth/RequireAdminAuth";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">This section is still using a placeholder page.</p>
    </div>
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
          <Route path="coupons" element={<Placeholder title="Coupon Code Management" />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="transactions" element={<Placeholder title="Transactions" />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/new" element={<ProductCreatePage />} />
          <Route path="products/media" element={<Placeholder title="Product Media" />} />
          <Route path="products/reviews" element={<Placeholder title="Product Reviews" />} />
          <Route path="brands" element={<Placeholder title="Brands" />} />
          <Route path="admin-role" element={<Placeholder title="Admin Role" />} />
          <Route path="control-authority" element={<Placeholder title="Control Authority" />} />
          <Route path="*" element={<Navigate to={PATHS.dashboard} replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
