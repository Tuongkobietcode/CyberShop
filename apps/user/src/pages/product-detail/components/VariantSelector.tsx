export default function VariantSelector({
  colors,
  selectedColor,
  onSelectColor,
  capacities,
  selectedCapacity,
  onSelectCapacity,
}: {
  colors: string[];
  selectedColor: string;
  onSelectColor: (value: string) => void;
  capacities: string[];
  selectedCapacity: string;
  onSelectCapacity: (value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-white/52">Finish</p>
        <div className="mt-3 flex items-center gap-3">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={color}
              onClick={() => onSelectColor(color)}
              className={[
                "h-9 w-9 rounded-full border-2 transition",
                selectedColor === color ? "border-white scale-110" : "border-transparent",
              ].join(" ")}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-white/52">Storage</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {capacities.map((capacity) => (
            <button
              key={capacity}
              type="button"
              onClick={() => onSelectCapacity(capacity)}
              className={[
                "h-14 rounded-2xl border text-sm transition",
                selectedCapacity === capacity
                  ? "border-[var(--accent)] bg-[var(--accent)]/12 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/18 hover:text-white/82",
              ].join(" ")}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
