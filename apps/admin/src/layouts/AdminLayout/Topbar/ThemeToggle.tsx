import { Sun } from "lucide-react";

export function ThemeToggle() {
  return (
    <button
      className="rounded-full bg-emerald-50 p-2 hover:bg-emerald-100"
      aria-label="Theme"
      title="Theme"
    >
      <Sun className="h-5 w-5 text-emerald-700" />
    </button>
  );
}
