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
    <div className="cy-panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="cy-kicker">Catalog state</p>
        <p className="mt-2 text-[1.05rem] text-white/72">
          Selected products: <span className="font-semibold text-white">{total}</span>
        </p>
      </div>

      <select
        value={sort}
        onChange={(event) => onSortChange(event.target.value as SortOption)}
        className="h-14 min-w-[220px] rounded-2xl border border-white/8 bg-white/[0.04] px-4 text-[15px] text-white outline-none"
      >
        <option className="bg-slate-900" value="rating">
          By rating
        </option>
        <option className="bg-slate-900" value="newest">
          Newest
        </option>
        <option className="bg-slate-900" value="price_asc">
          Price: Low to High
        </option>
        <option className="bg-slate-900" value="price_desc">
          Price: High to Low
        </option>
      </select>
    </div>
  );
}
