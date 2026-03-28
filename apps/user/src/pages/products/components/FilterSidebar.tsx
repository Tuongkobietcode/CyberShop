import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import type { CatalogCategory, CatalogProductFilters } from "@/features/catalog/catalog.types";

type FilterKey =
  | "batteryCapacity"
  | "screenType"
  | "screenDiagonal"
  | "protectionClass"
  | "builtInMemory";

type Props = {
  categories: CatalogCategory[];
  activeCategory: string;
  search: string;
  filters: CatalogProductFilters;
  selectedFilters: Record<FilterKey, string[]>;
  onSearch: (value: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onToggleFilter: (key: FilterKey, value: string) => void;
};

const filterSections: Array<{
  key: FilterKey;
  label: string;
  source: keyof CatalogProductFilters;
}> = [
  { key: "batteryCapacity", label: "Battery capacity", source: "batteryCapacity" },
  { key: "screenType", label: "Screen type", source: "screenType" },
  { key: "screenDiagonal", label: "Screen diagonal", source: "screenDiagonal" },
  { key: "protectionClass", label: "Protection class", source: "protectionClass" },
  { key: "builtInMemory", label: "Built-in memory", source: "builtInMemory" },
];

export default function FilterSidebar({
  categories,
  activeCategory,
  search,
  filters,
  selectedFilters,
  onSearch,
  onSelectCategory,
  onToggleFilter,
}: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    batteryCapacity: false,
    screenType: false,
    screenDiagonal: false,
    protectionClass: false,
    builtInMemory: false,
  });

  function toggleSection(key: string) {
    setOpenSections((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <section className="cy-panel p-6">
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className="mb-4 flex w-full items-center justify-between border-b border-white/8 pb-4"
        >
          <h3 className="text-[1.7rem] font-medium tracking-[-0.04em] text-white">Category</h3>
          <ChevronDown
            className={[
              "h-5 w-5 text-white transition",
              openSections.category ? "rotate-180" : "rotate-0",
            ].join(" ")}
          />
        </button>

        <label className="mb-4 flex h-12 items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 text-white/38">
          <Search className="h-4 w-4" />
          <input
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search"
            className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/32"
          />
        </label>

        {openSections.category ? (
          <div className="space-y-3 text-[15px] text-white/82">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={!activeCategory}
                onChange={() => onSelectCategory("")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span>All</span>
              <span className="text-white/28">{categories.length}</span>
            </label>
            {categories.map((category) => (
              <label key={category.id} className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={activeCategory === category.id}
                  onChange={() => onSelectCategory(activeCategory === category.id ? "" : category.id)}
                  className="h-4 w-4 rounded border-white/20 bg-transparent"
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        ) : null}
      </section>

      {filterSections.map((section) => {
        const options = filters[section.source];
        const selectedValues = selectedFilters[section.key];

        return (
          <section key={section.key} className="cy-panel p-6">
            <button
              type="button"
              onClick={() => toggleSection(section.key)}
              className="flex w-full items-center justify-between border-b border-white/8 pb-4 text-left"
            >
              <span className="text-[1.05rem] text-white/88">{section.label}</span>
              <ChevronDown
                className={[
                  "h-4 w-4 text-white transition",
                  openSections[section.key] ? "rotate-180" : "rotate-0",
                ].join(" ")}
              />
            </button>

            {openSections[section.key] ? (
              options.length ? (
                <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-2 text-[15px] text-white/82">
                  {options.map((option) => (
                    <label key={option} className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(option)}
                        onChange={() => onToggleFilter(section.key, option)}
                        className="h-4 w-4 rounded border-white/20 bg-transparent"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-white/35">No options available</p>
              )
            ) : null}
          </section>
        );
      })}
    </aside>
  );
}
