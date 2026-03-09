import { NavLink } from "react-router-dom";
import type { NavItem } from "./nav.config";

export function NavItemRow({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      className={[
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
        active
          ? "bg-emerald-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100",
      ].join(" ")}
    >
      <Icon className={["h-4 w-4", active ? "text-white" : "text-slate-500"].join(" ")} />
      <span className="font-medium">{item.label}</span>
    </NavLink>
  );
}
