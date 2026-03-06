import { GlobalSearch } from "./GlobalSearch";
import { NotiButton } from "./NotiButton";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

export function Topbar() {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-4">
      {/* Title area (left) */}
      <div className="min-w-0">
        <h1 className="text-lg font-semibold text-slate-900">Customers</h1>
      </div>

      {/* Center search */}
      <div className="mx-auto w-full max-w-xl">
        <GlobalSearch />
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-2">
        <NotiButton />
        <ThemeToggle />
        <UserMenu />
      </div>
    </div>
  );
}
