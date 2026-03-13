import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="border-b border-black/8">
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-8 text-[15px] text-black/38 sm:px-6 lg:px-8">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center gap-3"
            >
              {item.to && !isLast ? (
                <Link to={item.to} className="transition hover:text-black/70">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-black" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast ? <ChevronRight className="h-[15px] w-[15px]" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
