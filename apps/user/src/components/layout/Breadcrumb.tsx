import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="border-b border-white/6 bg-[rgba(255,255,255,0.015)]">
      <div className="cy-shell flex items-center gap-3 py-6 text-sm text-white/34">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={`${item.label}-${index}`} className="flex items-center gap-3">
              {item.to && !isLast ? (
                <Link to={item.to} className="transition hover:text-white/70">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-white" : ""}>{item.label}</span>
              )}
              {!isLast ? <ChevronRight className="h-[15px] w-[15px] text-white/22" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
