import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar/Sidebar";
import { Topbar } from "./Topbar/Topbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="w-full p-4">
        <div className="flex gap-4">
          {/* LEFT: Sidebar */}
          <aside className="w-70 shrink-0">
            <Sidebar />
          </aside>

          {/* RIGHT: Topbar + Page Content */}
          <main className="min-w-0 flex-1">
            <div className="rounded-2xl border border-slate-200 bg-white">
              <Topbar />
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
