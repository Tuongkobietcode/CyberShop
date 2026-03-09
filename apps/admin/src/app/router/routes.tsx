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
import AboutSection from "@/features/admin/pages/AdminRolePage";

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
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Placeholder title="Dashboard" />} />
        <Route
          path="orders"
          element={<Placeholder title="Order Management" />}
        />
        <Route path="customers" element={<CustomersListPage />} />
        <Route path="categories" element={<Placeholder title="Categories" />} />
        <Route
          path="transactions"
          element={<Placeholder title="Transactions" />}
        />
        <Route path="products">
          <Route path="new" element={<Placeholder title="Add Product" />} />
        </Route>
        <Route path="admin-role" element={<AboutSection />} />

        {/* fallback inside admin */}
        <Route path="*" element={<Navigate to={PATHS.customers} replace />} />
      </Route>

      <Route path="/dev">
        <Route
          path="dashboard"
          element={<Placeholder title="(DEV) Dashboard" />}
        />
        <Route path="orders" element={<Placeholder title="(DEV) Orders" />} />
        <Route path="customers" element={<CustomersListPage />} />
        <Route
          path="categories"
          element={<Placeholder title="(DEV) Categories" />}
        />
        <Route
          path="transactions"
          element={<Placeholder title="(DEV) Transactions" />}
        />
        <Route
          path="add-product"
          element={<Placeholder title="(DEV) Add Product" />}
        />
        <Route
          path="admin-role"
          element={<Placeholder title="(DEV) Admin Role" />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
