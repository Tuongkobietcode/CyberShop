import { Link, useLocation } from "react-router-dom";
import { NAV_GROUPS } from "./nav.config";
import { NavItemRow } from "./SidebarItem";
import { SidebarUserCard } from "./UserCard";

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="sticky top-4 h-[calc(100vh-32px)] rounded-2xl border border-slate-200 bg-white p-4">
      {/* Logo row */}
      <div className="flex items-center justify-between px-1">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="text-xl font-extrabold text-emerald-600">DEAL</div>
          <div className="text-xl font-extrabold text-slate-900">PORT</div>
        </Link>

        <button
          className="rounded-lg p-2 hover:bg-slate-100"
          aria-label="Collapse sidebar"
          title="Collapse"
        >
          <span className="block h-4 w-4 rounded bg-slate-200" />
        </button>
      </div>

      <div className="mt-4 space-y-6">
        {NAV_GROUPS.map((g) => (
          <div key={g.title}>
            <p className="mb-2 px-1 text-xs font-semibold text-slate-400">
              {g.title}
            </p>

            <div className="space-y-1">
              {g.items.map((item) => (
                <NavItemRow
                  key={item.to}
                  item={item}
                  active={pathname === item.to}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* User card bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <SidebarUserCard />
      </div>
    </div>
  );
}
