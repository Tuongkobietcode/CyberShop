import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CategoryItem } from "../types";

type Props = {
  categories: CategoryItem[];
};

export function CategoryChips({ categories }: Props) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className="flex items-center gap-4 rounded-[5px] border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <span className="text-sm font-semibold text-slate-800">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center lg:flex">
        <div className="-ml-5 pointer-events-auto">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center lg:flex">
        <div className="-mr-5 pointer-events-auto">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}