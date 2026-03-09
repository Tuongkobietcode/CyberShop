import { useLocation } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import { GlobalSearch } from "./GlobalSearch";
import { NotiButton } from "./NotiButton";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import type { AdminTheme } from "../AdminLayout";

const TITLE_BY_PATH: Record<string, string> = {
  [PATHS.dashboard]: "Dashboard",
  [PATHS.orders]: "Order Management",
  [PATHS.customers]: "Customers",
  [PATHS.coupons]: "Coupon Code",
  [PATHS.categories]: "Categories",
  [PATHS.transactions]: "Transaction",
  [PATHS.addProduct]: "Add Products",
  [PATHS.adminRole]: "Admin role",

  [PATHS.dev.dashboard]: "Dashboard",
  [PATHS.dev.orders]: "Order Management",
  [PATHS.dev.customers]: "Customers",
  [PATHS.dev.coupons]: "Coupon Code",
  [PATHS.dev.categories]: "Categories",
  [PATHS.dev.transactions]: "Transaction",
  [PATHS.dev.addProduct]: "Add Products",
  [PATHS.dev.adminRole]: "Admin role",
};

type Props = {
  theme: AdminTheme;
  onToggleTheme: () => void;
};

export function Topbar({ theme, onToggleTheme }: Props) {
  const location = useLocation();
  const title = TITLE_BY_PATH[location.pathname] ?? "Dashboard";
  const isDark = theme === "dark";

  return (
    <div
      className={[
        "flex items-center bg-white gap-4 px-5 py-4 transition-colors duration-300",
        isDark ? "border-slate-800" : "border-slate-100",
      ].join(" ")}
    >
      <div className="min-w-45">
        <h1
          className={[
            "text-lg font-semibold",
            isDark ? "text-white" : "text-slate-900",
          ].join(" ")}
        >
          {title}
        </h1>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <GlobalSearch theme={theme} />
      </div>

      <div className="flex items-center gap-2">
        <NotiButton theme={theme} />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <UserMenu theme={theme} />
      </div>
    </div>
  );
}