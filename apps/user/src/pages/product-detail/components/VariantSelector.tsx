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
        <p className="text-sm text-black/55">Select color :</p>
        <div className="mt-3 flex items-center gap-3">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={color}
              onClick={() => onSelectColor(color)}
              className={[
                "h-8 w-8 rounded-full border-2 transition",
                selectedColor === color ? "border-black scale-110" : "border-transparent",
              ].join(" ")}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {capacities.map((capacity) => (
          <button
            key={capacity}
            type="button"
            onClick={() => onSelectCapacity(capacity)}
            className={[
              "h-14 rounded-lg border text-sm transition",
              selectedCapacity === capacity
                ? "border-black text-black"
                : "border-black/12 text-black/35 hover:border-black/35",
            ].join(" ")}
          >
            {capacity}
          </button>
        ))}
      </div>
    </div>
  );
}
