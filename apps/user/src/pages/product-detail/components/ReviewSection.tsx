import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { resolveAssetUrl } from "@/utils/assets";
import type { ProductReview } from "@/features/product/product-review.types";

type ReviewSectionProps = {
  reviews: ProductReview[];
  isAuthenticated: boolean;
  customerName?: string;
  onRequireSignIn: () => void;
  onSubmitReview: (payload: { rating: number; content: string }) => Promise<void> | void;
};

function RatingStars({
  value,
  onChange,
  interactive = false,
}: {
  value: number;
  onChange?: (value: number) => void;
  interactive?: boolean;
}) {
  return (
    <div className="flex items-center gap-1 text-[#ffb547]">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange?.(starValue)}
            disabled={!interactive}
            className={interactive ? "transition hover:scale-110" : "cursor-default"}
            aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            <Star className="h-4 w-4" fill={index < value ? "currentColor" : "none"} />
          </button>
        );
      })}
    </div>
  );
}

function getReviewSummary(reviews: ProductReview[]) {
  if (!reviews.length) {
    return {
      average: 0,
      total: 0,
      distribution: [
        { label: "Excellent", stars: 5, count: 0 },
        { label: "Good", stars: 4, count: 0 },
        { label: "Average", stars: 3, count: 0 },
        { label: "Below Average", stars: 2, count: 0 },
        { label: "Poor", stars: 1, count: 0 },
      ],
    };
  }

  const counts = reviews.reduce<Record<number, number>>((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const total = reviews.length;
  const average =
    reviews.reduce((sum, review) => sum + review.rating, 0) / total;

  return {
    average,
    total,
    distribution: [
      { label: "Excellent", stars: 5, count: counts[5] || 0 },
      { label: "Good", stars: 4, count: counts[4] || 0 },
      { label: "Average", stars: 3, count: counts[3] || 0 },
      { label: "Below Average", stars: 2, count: counts[2] || 0 },
      { label: "Poor", stars: 1, count: counts[1] || 0 },
    ],
  };
}

export default function ReviewSection({
  reviews,
  isAuthenticated,
  customerName,
  onRequireSignIn,
  onSubmitReview,
}: ReviewSectionProps) {
  const [draft, setDraft] = useState("");
  const [rating, setRating] = useState(5);
  const [visibleCount, setVisibleCount] = useState(3);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const summary = useMemo(() => getReviewSummary(reviews), [reviews]);
  const visibleReviews = useMemo(
    () => reviews.slice(0, visibleCount),
    [reviews, visibleCount]
  );

  useEffect(() => {
    setVisibleCount((current) => Math.min(Math.max(current, 3), reviews.length || 3));
  }, [reviews.length]);

  async function handleSubmit() {
    const nextContent = draft.trim();

    if (!isAuthenticated) {
      onRequireSignIn();
      return;
    }

    if (!nextContent) {
      setError("Please enter your comment before submitting.");
      setSuccessMessage("");
      return;
    }

    try {
      await onSubmitReview({ rating, content: nextContent });
      setDraft("");
      setRating(5);
      setError("");
      setSuccessMessage("Your review has been added successfully.");
      setVisibleCount((current) => current + 1);
    } catch (submitError) {
      console.error(submitError);
      setError("Failed to submit review. Please try again.");
      setSuccessMessage("");
    }
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-black">
            Reviews
          </h2>
          <p className="mt-2 text-sm text-black/45">
            Read feedback from customers and share your own experience.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)]">
        <div className="rounded-[24px] bg-white p-6 text-center">
          <p className="text-[3rem] font-semibold tracking-[-0.06em] text-black">
            {summary.average ? summary.average.toFixed(1) : "0.0"}
          </p>
          <p className="mt-2 text-sm text-black/35">
            of {summary.total} review{summary.total === 1 ? "" : "s"}
          </p>
          <div className="mt-4 flex justify-center">
            <RatingStars value={Math.round(summary.average)} />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {summary.distribution.map((item) => {
            const width = summary.total ? (item.count / summary.total) * 100 : 0;

            return (
              <div
                key={item.label}
                className="grid grid-cols-[140px_minmax(0,1fr)_40px] items-center gap-4 text-sm text-black/70"
              >
                <span>{item.label}</span>
                <div className="h-1 rounded-full bg-black/10">
                  <div
                    className="h-full rounded-full bg-[#ffb547]"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <span>{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[24px] bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-black">Write a review</h3>
            <p className="mt-1 text-sm text-black/45">
              {isAuthenticated
                ? `Posting as ${customerName || "customer"}`
                : "Sign in to leave a comment for this product."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-black/55">Your rating</span>
            <RatingStars value={rating} onChange={setRating} interactive />
          </div>
        </div>

        <textarea
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            if (error) setError("");
            if (successMessage) setSuccessMessage("");
          }}
          placeholder="Share what you liked or disliked about this product"
          rows={4}
          className="mt-5 min-h-[140px] w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm outline-none placeholder:text-black/30"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm">
            {error ? <p className="text-red-500">{error}</p> : null}
            {successMessage ? (
              <p className="text-emerald-600">{successMessage}</p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-black px-7 text-sm font-medium text-white transition hover:opacity-90"
          >
            {isAuthenticated ? "Submit Review" : "Sign In to Review"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <article key={review.id} className="rounded-[24px] bg-white p-6">
            <div className="flex gap-4">
              <img
                src={resolveAssetUrl(review.avatar)}
                alt={review.author}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-[1.05rem] font-semibold text-black">
                      {review.author}
                    </h3>
                    <div className="mt-2">
                      <RatingStars value={review.rating} />
                    </div>
                  </div>
                  <p className="text-sm text-black/30">{review.date}</p>
                </div>
                <p className="mt-4 text-[15px] leading-7 text-black/58">
                  {review.content}
                </p>
                {review.photos?.length ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {review.photos.map((photo) => (
                      <img
                        key={photo}
                        src={resolveAssetUrl(photo)}
                        alt="Review"
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleCount < reviews.length ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((current) => current + 3)}
            className="inline-flex h-12 items-center justify-center rounded-xl border border-black px-7 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            View More
          </button>
        </div>
      ) : null}
    </section>
  );
}
