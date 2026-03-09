import { Bell } from "lucide-react";
import type { AdminTheme } from "../AdminLayout";

type Props = {
  theme: AdminTheme;
};

export function NotiButton({ theme }: Props) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={[
        "relative flex h-11 w-11 items-center justify-center rounded-full transition",
        isDark
          ? "text-slate-300 hover:bg-slate-800"
          : "text-slate-700 hover:bg-slate-100",
      ].join(" ")}
    >
      <Bell size={20} />
      <span className="absolute right-2.5 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
    </button>
  );
}