import { ExternalLink } from "lucide-react";

export function SidebarUserCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-200" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">Dealport</p>
          <p className="truncate text-xs text-slate-500">Mark@thedesigner...</p>
        </div>

        <button className="ml-auto rounded-lg p-2 hover:bg-slate-100" aria-label="Open">
          <ExternalLink className="h-4 w-4 text-slate-500" />
        </button>
      </div>

      <button className="mt-3 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100">
        <span>Your Shop</span>
        <ExternalLink className="h-4 w-4 text-slate-500" />
      </button>
    </div>
  );
}
