import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import { Topbar } from "./Topbar/Topbar";

export type AdminTheme = "light" | "dark";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<AdminTheme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme") as AdminTheme | null;
    const savedCollapsed = localStorage.getItem("admin-sidebar-collapsed");

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

    if (savedCollapsed === "true") {
      setCollapsed(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("admin-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("admin-sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  return (
    <div
      className={[
        "min-h-screen transition-colors duration-300",
        theme === "dark" ? "bg-[#0b1220]" : "bg-[#f3f5f7]",
      ].join(" ")}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <aside
            className={[
              "shrink-0 transition-all duration-300",
              collapsed ? "w-23" : "w-70",
            ].join(" ")}
          >
            <Sidebar
              collapsed={collapsed}
              onToggleCollapsed={() => setCollapsed((prev) => !prev)}
              theme={theme}
            />
          </aside>

          <main className="min-w-0 flex-1">
            <div
              className={[
                "overflow-hidden rounded-[28px] border transition-colors duration-300",
                theme === "dark"
                  ? "border-slate-800 bg-[#111827]"
                  : "border-slate-200 bg-white",
              ].join(" ")}
            >
              <Topbar
                theme={theme}
                onToggleTheme={() =>
                  setTheme((prev) => (prev === "light" ? "dark" : "light"))
                }
              />

              <div className="p-5">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}