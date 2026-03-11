import { Search } from "lucide-react";
import type { CatalogCategory } from "@/features/catalog/catalog.types";

type Props = {
  categories: CatalogCategory[];
  activeCategory: string;
  search: string;
  onSearch: (value: string) => void;
  onSelectCategory: (categoryId: string) => void;
};

const staticFilters = [
  "Battery capacity",
  "Screen type",
  "Screen diagonal",
  "Protection class",
  "Built-in memory",
];

export default function FilterSidebar({
  categories,
  activeCategory,
  search,
  onSearch,
  onSelectCategory,
}: Props) {
  return (
    <aside className="space-y-6">
      <div>
        <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-4">
          <h3 className="text-[1.9rem] font-medium tracking-[-0.04em] text-black">Category</h3>
          <span className="text-xl text-black">^</span>
        </div>

        <label className="mb-4 flex h-12 items-center gap-3 rounded-xl bg-[#f5f5f5] px-4 text-[#989898]">
          <Search className="h-4 w-4" />
          <input
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search"
            className="w-full border-0 bg-transparent text-sm text-black outline-none placeholder:text-[#989898]"
          />
        </label>

        <div className="space-y-3 text-[15px] text-black/88">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={!activeCategory}
              onChange={() => onSelectCategory("")}
              className="h-4 w-4 rounded border-black/20"
            />
            <span>All</span>
            <span className="text-black/30">{categories.length}</span>
          </label>
          {categories.map((category) => (
            <label key={category.id} className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={activeCategory === category.id}
                onChange={() => onSelectCategory(activeCategory === category.id ? "" : category.id)}
                className="h-4 w-4 rounded border-black/20"
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {staticFilters.map((item) => (
        <div key={item} className="flex items-center justify-between border-b border-black/10 pb-4 text-[1.1rem] text-black/92">
          <span>{item}</span>
          <span>?</span>
        </div>
      ))}
    </aside>
  );
}
