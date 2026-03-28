import type { ProductSpecRow } from "../data/product-content";

export default function ProductSpecs({ specs }: { specs: ProductSpecRow[] }) {
  return (
    <section className="cy-panel px-6 py-8 sm:px-8 sm:py-10">
      <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-white">Technical details</h2>
      <p className="mt-5 text-[15px] leading-7 text-white/58">
        A cleaner spec layout that reads like a premium product sheet instead of
        filler copy. Key hardware attributes are kept direct and easy to scan.
      </p>

      <div className="mt-8 space-y-3">
        {specs.map((item) => (
          <div key={item.label} className="grid grid-cols-[1.2fr_0.8fr] border-b border-white/8 py-4 text-[15px]">
            <span className="text-white">{item.label}</span>
            <span className="text-right text-white/62">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
