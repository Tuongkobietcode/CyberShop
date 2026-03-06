import { Search } from "lucide-react";

export function GlobalSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        placeholder="Search data, users, or reports"
        className={[
          "h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm",
          "outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100",
        ].join(" ")}
      />
    </div>
  );
}
