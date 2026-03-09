import * as React from "react";

type Variant = "solid" | "outline" | "ghost";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "sm" | "md";
};

export function Button({
  className = "",
  variant = "solid",
  size = "md",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = size === "sm" ? "h-8 px-3 text-sm" : "h-10 px-4 text-sm";

  const variants: Record<Variant, string> = {
    solid: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-900",
  };

  return (
    <button
      className={[base, sizes, variants[variant], className].join(" ")}
      {...props}
    />
  );
}
