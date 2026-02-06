import { Bell } from "lucide-react";

export function NotiButton() {
  return (
    <button className="relative rounded-full p-2 hover:bg-slate-100" aria-label="Notifications">
      <Bell className="h-5 w-5 text-slate-600" />
      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
    </button>
  );
}
