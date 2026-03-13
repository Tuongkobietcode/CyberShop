import { Star } from "lucide-react";
import { resolveAssetUrl } from "@/utils/assets";
import type { ProductReview } from "../data/product-content";

function RatingStars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1 text-[#ffb547]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-4 w-4" fill={index < value ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

export default function ReviewSection({ reviews }: { reviews: ProductReview[] }) {
  return (
    <section className="space-y-8">
      <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-black">Reviews</h2>

      <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)]">
        <div className="rounded-[24px] bg-white p-6 text-center">
          <p className="text-[3rem] font-semibold tracking-[-0.06em] text-black">4.8</p>
          <p className="mt-2 text-sm text-black/35">of 125 reviews</p>
          <div className="mt-4 flex justify-center"><RatingStars value={5} /></div>
        </div>

        <div className="space-y-3 pt-2">
          {[
            ["Excellent", 100],
            ["Good", 76],
            ["Average", 44],
            ["Below Average", 18],
            ["Poor", 8],
          ].map(([label, width]) => (
            <div key={label as string} className="grid grid-cols-[140px_minmax(0,1fr)_40px] items-center gap-4 text-sm text-black/70">
              <span>{label}</span>
              <div className="h-1 rounded-full bg-black/10"><div className="h-full rounded-full bg-[#ffb547]" style={{ width: `${width}%` }} /></div>
              <span>{Math.max(1, Math.round(Number(width) / 9))}</span>
            </div>
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder="Leave Comment"
        className="h-16 w-full rounded-2xl border border-black/10 bg-white px-5 text-sm outline-none placeholder:text-black/30"
      />

      <div className="space-y-4">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-[24px] bg-white p-6">
            <div className="flex gap-4">
              <img src={resolveAssetUrl(review.avatar)} alt={review.author} className="h-14 w-14 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-[1.05rem] font-semibold text-black">{review.author}</h3>
                    <div className="mt-2"><RatingStars value={review.rating} /></div>
                  </div>
                  <p className="text-sm text-black/30">{review.date}</p>
                </div>
                <p className="mt-4 text-[15px] leading-7 text-black/58">{review.content}</p>
                {review.photos?.length ? (
                  <div className="mt-4 flex gap-3">
                    {review.photos.map((photo) => (
                      <img key={photo} src={resolveAssetUrl(photo)} alt="Review" className="h-20 w-20 rounded-xl object-cover" />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center">
        <button type="button" className="inline-flex h-12 items-center justify-center rounded-xl border border-black px-7 text-sm font-medium text-black transition hover:bg-black hover:text-white">
          View More
        </button>
      </div>
    </section>
  );
}
