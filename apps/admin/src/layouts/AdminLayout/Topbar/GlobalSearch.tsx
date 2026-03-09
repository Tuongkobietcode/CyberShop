import { Search } from "lucide-react";
import type { AdminTheme } from "../AdminLayout";

type Props = {
  theme: AdminTheme;
};

export function GlobalSearch({ theme }: Props) {
  const isDark = theme === "dark";

  return (
    <div
      className={[
        "flex h-12 items-center rounded-full border px-4 transition-colors duration-300",
        isDark
          ? "border-slate-700 bg-slate-900"
          : "border-slate-200 bg-slate-50",
      ].join(" ")}
    >
      <Search size={20} className="text-slate-400" />
      <input
        placeholder="Search data, users, or reports"
        className={[
          "ml-3 w-full bg-transparent text-sm outline-none",
          isDark
            ? "text-slate-100 placeholder:text-slate-500"
            : "text-slate-700 placeholder:text-slate-400",
        ].join(" ")}
      />
    </div>
  );
}