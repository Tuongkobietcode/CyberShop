import { CheckCircle2, Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddToCartSection({
  quantity,
  addedSignal,
  wishlistSignal,
  isWishlisted,
  onDecrease,
  onIncrease,
  onAddToCart,
  onToggleWishlist,
}: {
  quantity: number;
  addedSignal: number;
  wishlistSignal: number;
  isWishlisted: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlistAnimated, setIsWishlistAnimated] = useState(false);

  useEffect(() => {
    if (!addedSignal) {
      return;
    }

    setIsAdded(true);
    const timeout = window.setTimeout(() => {
      setIsAdded(false);
    }, 1600);

    return () => window.clearTimeout(timeout);
  }, [addedSignal]);

  useEffect(() => {
    if (!wishlistSignal) {
      return;
    }

    setIsWishlistAnimated(true);
    const timeout = window.setTimeout(() => {
      setIsWishlistAnimated(false);
    }, 1400);

    return () => window.clearTimeout(timeout);
  }, [wishlistSignal]);

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <div className="inline-flex h-14 items-center rounded-xl border border-black/15 px-3">
        <button type="button" onClick={onDecrease} className="h-10 w-10 text-xl text-black/60">
          -
        </button>
        <span className="w-12 text-center text-lg font-medium text-black">{quantity}</span>
        <button type="button" onClick={onIncrease} className="h-10 w-10 text-xl text-black/60">
          +
        </button>
      </div>
      <button
        type="button"
        onClick={onToggleWishlist}
        className={[
          "inline-flex h-14 items-center justify-center gap-3 rounded-xl border px-8 text-[15px] font-medium transition duration-300",
          isWishlisted
            ? "border-rose-500 bg-rose-500 text-white shadow-[0_18px_42px_rgba(244,63,94,0.24)]"
            : "border-black text-black hover:bg-black hover:text-white",
          isWishlistAnimated ? "scale-[1.02]" : "",
        ].join(" ")}
      >
        <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
        {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
      </button>
      <button
        type="button"
        onClick={onAddToCart}
        className={[
          "relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-xl px-8 text-[15px] font-medium text-white transition duration-300",
          isAdded
            ? "bg-emerald-600 shadow-[0_18px_42px_rgba(16,185,129,0.32)]"
            : "bg-black hover:bg-[#1d1d1d] hover:shadow-[0_16px_36px_rgba(15,23,42,0.18)]",
        ].join(" ")}
      >
        <span
          className={[
            "absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.28),transparent)] transition duration-700",
            isAdded ? "translate-x-full" : "-translate-x-full",
          ].join(" ")}
        />
        {isAdded ? <CheckCircle2 className="relative z-10 h-5 w-5" /> : <ShoppingCart className="relative z-10 h-5 w-5" />}
        <span className="relative z-10">{isAdded ? "Added to Cart" : "Add to Cart"}</span>
      </button>
    </div>
  );
}
