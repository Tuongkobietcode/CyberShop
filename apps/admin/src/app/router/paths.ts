export const PATHS = {
  root: "/",
  dashboard: "/admin/dashboard",
  orders: "/admin/orders",
  customers: "/admin/customers",
  coupons: "/admin/coupons",
  categories: "/admin/categories",
  transactions: "/admin/transactions",
  addProduct: "/admin/products/new",
  adminRole: "/admin/admin-role",

  dev: {
    dashboard: "/dev/dashboard",
    orders: "/dev/orders",
    customers: "/dev/customers",
    coupons: "/dev/coupons",
    categories: "/dev/categories",
    transactions: "/dev/transactions",
    addProduct: "/dev/add-product",
    adminRole: "/dev/admin-role",
  },
} as const;
