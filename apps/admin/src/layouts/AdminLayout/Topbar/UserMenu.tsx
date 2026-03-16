import { ChevronDown, UserCog } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AdminTheme } from "../AdminLayout";

type Props = {
  theme?: AdminTheme;
  name?: string;
};

export function UserMenu({ theme = "light", name = "Cyber Admin" }: Props) {
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="User menu"
        onClick={() => setOpen(!open)}
        className={[
          "flex items-center gap-2 rounded-full border p-1 pr-3 shadow-[0_12px_24px_-22px_rgba(15,23,42,0.45)] transition",
          isDark
            ? "border-slate-700 hover:bg-slate-800"
            : "border-slate-200 bg-white hover:bg-slate-50",
        ].join(" ")}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-sm font-semibold text-white ring-4 ring-slate-100">
          C
        </div>

        <div className="hidden text-left sm:block">
          <p
            className={[
              "text-sm font-semibold",
              isDark ? "text-white" : "text-slate-900",
            ].join(" ")}
          >
            {name}
          </p>
          <p className="text-xs text-slate-400">admin@cyber.com</p>
        </div>

        <ChevronDown
          size={16}
          className={isDark ? "text-slate-400" : "text-slate-500"}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-black/10 bg-white shadow-lg">
          <button
            onClick={() => {
              navigate("/admin/admin-role");
              setOpen(false);
            }}
            className=" flex items-center gap-2 w-full px-4 py-3 text-left text-sm hover:bg-gray-100"
          >
            <UserCog size={16} className="shrink-0" />
            Admin profile
          </button>
        </div>
      )}
    </div>
  );
}
