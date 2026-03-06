import { ExternalLink, LogOut, Store } from "lucide-react";
import type { AdminTheme } from "../AdminLayout";

type Props = {
  collapsed: boolean;
  theme: AdminTheme;
};

export function SidebarUserCard({ collapsed, theme }: Props) {
  const isDark = theme === "dark";

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-3">
        <img
          src="https://i.pravatar.cc/80?img=12"
          alt="User avatar"
          className="h-11 w-11 rounded-full object-cover"
        />

        <button
          type="button"
          className={[
            "flex h-10 w-10 items-center justify-center rounded-xl border transition",
            isDark
              ? "border-slate-700 bg-slate-900 text-slate-300"
              : "border-slate-200 bg-white text-slate-600",
          ].join(" ")}
        >
          <Store size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src="https://i.pravatar.cc/80?img=12"
            alt="Dealport"
            className="h-11 w-11 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p
              className={[
                "truncate text-sm font-semibold",
                isDark ? "text-white" : "text-slate-900",
              ].join(" ")}
            >
              Dealport
            </p>
            <p className="truncate text-sm text-slate-400">
              Mark@thedesigner...
            </p>
          </div>
        </div>

        <button
          type="button"
          className={isDark ? "text-slate-400" : "text-slate-500"}
        >
          <LogOut size={18} />
        </button>
      </div>

      <button
        type="button"
        className={[
          "flex w-full items-center justify-between rounded-2xl border px-4 py-4 shadow-sm transition",
          isDark
            ? "border-slate-700 bg-slate-900 text-white"
            : "border-slate-200 bg-white text-slate-900",
        ].join(" ")}
      >
        <div className="flex items-center gap-3">
          <Store size={18} className="text-emerald-600" />
          <span className="text-sm font-medium">Your Shop</span>
        </div>

        <ExternalLink
          size={16}
          className={isDark ? "text-slate-400" : "text-slate-500"}
        />
      </button>
    </div>
  );
}