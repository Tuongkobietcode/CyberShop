import { ChevronDown } from "lucide-react";
import type { AdminTheme } from "../AdminLayout";

type Props = {
  theme?: AdminTheme;
  name?: string;
  avatarUrl?: string;
};

export function UserMenu({
  theme = "light",
  name = "Dealport",
  avatarUrl = "https://i.pravatar.cc/80?img=12",
}: Props) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="User menu"
      className={[
        "flex items-center gap-2 rounded-full p-1 transition",
        isDark ? "hover:bg-slate-800" : "hover:bg-slate-100",
      ].join(" ")}
    >
      <img
        src={avatarUrl}
        alt={name}
        className="h-10 w-10 rounded-full object-cover"
      />

      <ChevronDown
        size={16}
        className={isDark ? "text-slate-400" : "text-slate-500"}
      />
    </button>
  );
}