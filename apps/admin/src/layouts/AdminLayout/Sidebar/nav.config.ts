import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  TicketPercent,
  Shapes,
  Wallet,
  BadgeCheck,
  PlusCircle,
  Image,
  List,
  Star,
  UserCog,
  ShieldCheck,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export type NavGroup = {
  title: string;
  items: SidebarItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Main menu",
    items: [
      { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Order Management", to: "/admin/orders", icon: ShoppingCart },
      { label: "Customers", to: "/admin/customers", icon: Users },
      { label: "Coupon Code", to: "/admin/coupons", icon: TicketPercent },
      { label: "Categories", to: "/admin/categories", icon: Shapes },
      { label: "Transaction", to: "/admin/transactions", icon: Wallet },
      { label: "Brand", to: "/admin/brands", icon: BadgeCheck },
    ],
  },
  {
    title: "Product",
    items: [
      { label: "Add Products", to: "/admin/products/new", icon: PlusCircle },
      { label: "Product Media", to: "/admin/products/media", icon: Image },
      { label: "Product List", to: "/admin/products", icon: List },
      { label: "Product Reviews", to: "/admin/products/reviews", icon: Star },
    ],
  },
  {
    title: "Admin",
    items: [
      { label: "Admin role", to: "/admin/admin-role", icon: UserCog },
      {
        label: "Control Authority",
        to: "/admin/control-authority",
        icon: ShieldCheck,
      },
    ],
  },
];