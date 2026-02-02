import React, { useState } from "react";

type SortOption = "rating" | "price_asc" | "price_desc" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "rating", label: "By rating" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export const SortBar: React.FC = () => {
  const [selectedCount] = useState<number>(85);
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  return (
    <div className="w-full rounded-sm flex items-center justify-between px-3 py-2 bg-white">
      <div className="text-sm text-gray-700">
        <span className="font-medium">Selected Products:</span>{" "}
        <span className="font-bold">{selectedCount}</span>
      </div>

      <div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
