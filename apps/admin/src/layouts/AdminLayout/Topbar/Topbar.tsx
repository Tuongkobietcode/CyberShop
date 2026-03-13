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
        "flex flex-col gap-4 border-b px-5 py-5 transition-colors duration-300 xl:flex-row xl:items-center xl:justify-between",
        isDark
          ? "border-slate-800"
          : "border-slate-100 bg-white/90 backdrop-blur",
      ].join(" ")}
    >
      <div>
        <p
          className={[
            "text-xs uppercase tracking-[0.18em]",
            isDark ? "text-slate-500" : "text-slate-400",
          ].join(" ")}
        >
          Cyber admin
        </p>
        <h1
          className={[
            "mt-2 text-[1.8rem] font-semibold tracking-[-0.05em]",
            isDark ? "text-white" : "text-slate-900",
          ].join(" ")}
        >
          {title}
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center xl:min-w-[620px] xl:justify-end">
        <div className="w-full sm:flex-1 xl:max-w-[560px]">
          <GlobalSearch theme={theme} />
        </div>

        <div className="flex items-center justify-end gap-2.5">
          <NotiButton theme={theme} />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <UserMenu theme={theme} />
        </div>
      </div>
    </div>
  );
}
