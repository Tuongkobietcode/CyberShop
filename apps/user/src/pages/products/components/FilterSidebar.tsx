import { useState } from "react";
import ArrowDownIcon from "../../../assets/icons/expand_more.png";
import SearchIcon from "../../../assets/icons/Search.png";

type BrandItem = {
  label: string;
  count?: number;
};

type OptionItem = {
  label: string;
  count?: number;
};

type FilterSection = {
  key: string;
  title: string;
  options: OptionItem[];
};

const mockBrands: BrandItem[] = [
  { label: "Samsung", count: 125 },
  { label: "Xiaomi", count: 68 },
  { label: "Poco", count: 44 },
  { label: "OPPO", count: 36 },
  { label: "Honor", count: 10 },
  { label: "Motorola", count: 34 },
  { label: "Nokia", count: 22 },
  { label: "Realme", count: 35 },
  { label: "Apple", count: 110 },
];

const mockSections: FilterSection[] = [
  {
    key: "battery",
    title: "Battery capacity",
    options: [
      { label: "3000 – 3999 mAh", count: 24 },
      { label: "4000 – 4999 mAh", count: 68 },
      { label: "5000 – 5999 mAh", count: 102 },
      { label: "6000+ mAh", count: 19 },
    ],
  },
  {
    key: "screen",
    title: "Screen type",
    options: [
      { label: "AMOLED", count: 86 },
      { label: "OLED", count: 44 },
      { label: "IPS LCD", count: 72 },
    ],
  },
  {
    key: "diagonal",
    title: "Screen diagonal",
    options: [
      { label: "≤ 6.1 inch", count: 38 },
      { label: "6.2 – 6.6 inch", count: 96 },
      { label: "≥ 6.7 inch", count: 54 },
    ],
  },
  {
    key: "protection",
    title: "Protection class",
    options: [
      { label: "IP53", count: 14 },
      { label: "IP67", count: 22 },
      { label: "IP68", count: 41 },
    ],
  },
  {
    key: "memory",
    title: "Built-in memory",
    options: [
      { label: "64 GB", count: 33 },
      { label: "128 GB", count: 88 },
      { label: "256 GB", count: 61 },
      { label: "512 GB", count: 12 },
    ],
  },
];

function DropdownIcon({ isOpen }: { isOpen?: boolean }) {
  return (
    <img
      src={ArrowDownIcon}
      alt="dropdown"
      className={`h-4 w-4 transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
    />
  );
}

function SearchBox() {
  return (
    <div className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2">
      <img src={SearchIcon} alt="search" className="h-4 w-4 opacity-60" />
      <input
        placeholder="Search"
        className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
      />
    </div>
  );
}

export default function FilterSidebar() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    brand: true,
  });

  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const toggleSection = (key: string) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleOption = (section: string, value: string) => {
    setSelected((prev) => {
      const current = prev[section] || [];
      return {
        ...prev,
        [section]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  return (
    <aside className="w-72 border-r bg-white px-4 py-6">
      <div className="mb-6">
        <button
          onClick={() => toggleSection("brand")}
          className="flex w-full items-center justify-between text-sm font-semibold"
        >
          Brand
          <DropdownIcon isOpen={open.brand} />
        </button>

        <div className="mt-3 h-px bg-gray-200" />

        {open.brand && (
          <div className="mt-4 space-y-4">
            <SearchBox />

            <div className="space-y-3">
              {mockBrands.map((item) => (
                <label
                  key={item.label}
                  className="flex cursor-pointer items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={(selected.brand || []).includes(item.label)}
                      onChange={() => toggleOption("brand", item.label)}
                    />
                    <span className="font-medium text-gray-900">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{item.count}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {mockSections.map((section) => (
          <div key={section.key}>
            <button
              onClick={() => toggleSection(section.key)}
              className="flex w-full items-center justify-between text-sm font-semibold"
            >
              {section.title}
              <DropdownIcon isOpen={open[section.key]} />
            </button>

            <div className="mt-3 h-px bg-gray-200" />

            {open[section.key] && (
              <div className="mt-4 space-y-4">
                <SearchBox />

                <div className="space-y-3">
                  {section.options.map((opt) => (
                    <label
                      key={opt.label}
                      className="flex cursor-pointer items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={(selected[section.key] || []).includes(
                            opt.label,
                          )}
                          onChange={() => toggleOption(section.key, opt.label)}
                        />
                        <span className="font-medium">{opt.label}</span>
                      </div>
                      <span className="text-xs text-gray-400">{opt.count}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
