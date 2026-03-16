import type { ProductSpecRow } from "../data/product-content";

export default function ProductSpecs({ specs }: { specs: ProductSpecRow[] }) {
  return (
    <section className="rounded-[24px] bg-white px-6 py-8 sm:px-8 sm:py-10">
      <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-black">Details</h2>
      <p className="mt-5 text-[15px] leading-7 text-black/58">
        Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced screen technology allows you to appreciate every image.
      </p>

      <div className="mt-8 space-y-3">
        {specs.map((item) => (
          <div key={item.label} className="grid grid-cols-[1.2fr_0.8fr] border-b border-black/8 py-4 text-[15px]">
            <span className="text-black">{item.label}</span>
            <span className="text-right text-black/72">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button type="button" className="inline-flex h-12 items-center justify-center rounded-xl border border-black px-7 text-sm font-medium text-black transition hover:bg-black hover:text-white">
          View More
        </button>
      </div>
    </section>
  );
}
