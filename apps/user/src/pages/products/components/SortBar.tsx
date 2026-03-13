type SortOption = "rating" | "price_asc" | "price_desc" | "newest";

export default function SortBar({
  total,
  sort,
  onSortChange,
}: {
  total: number;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[1.05rem] text-black/80">
        Selected Products: <span className="font-semibold text-black">{total}</span>
      </p>

      <select
        value={sort}
        onChange={(event) => onSortChange(event.target.value as SortOption)}
        className="h-14 min-w-[220px] rounded-xl border border-black/10 bg-white px-4 text-[15px] text-black outline-none"
      >
        <option value="rating">By rating</option>
        <option value="newest">Newest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}
