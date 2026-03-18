import { CheckCircle2, Heart, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useCart } from "@/features/cart/cart.context";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  const location = useLocation();
  const { notification, clearNotification } = useCart();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousPath = useRef(`${location.pathname}${location.search}`);

  useEffect(() => {
    const currentPath = `${location.pathname}${location.search}`;

    if (previousPath.current === currentPath) {
      return;
    }

    previousPath.current = currentPath;
    setIsTransitioning(true);

    const timeout = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 420);

    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timeout = window.setTimeout(() => {
      clearNotification();
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [clearNotification, notification]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <div
        className={[
          "fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-[linear-gradient(90deg,#111827,#4f46e5,#38bdf8)] shadow-[0_8px_24px_rgba(79,70,229,0.35)] transition-transform duration-500",
          isTransitioning ? "scale-x-100" : "scale-x-0",
        ].join(" ")}
      />
      <div
        className={[
          "pointer-events-none fixed inset-0 z-[60] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_38%)] transition duration-300",
          isTransitioning ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
      <div
        className={[
          "pointer-events-none fixed right-5 top-24 z-[80] w-[min(360px,calc(100vw-2.5rem))] rounded-[22px] bg-white/95 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl transition duration-300",
          notification?.type === "wishlist"
            ? "border border-rose-200/80"
            : notification?.type === "order"
              ? "border border-sky-200/80"
              : notification?.type === "stock"
                ? "border border-amber-200/80"
            : "border border-emerald-200/70",
          notification ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
        ].join(" ")}
      >
        <div className="flex items-start gap-3">
          <div
            className={[
              "mt-0.5 rounded-full p-2",
              notification?.type === "wishlist"
                ? "bg-rose-100 text-rose-600"
                : notification?.type === "order"
                  ? "bg-sky-100 text-sky-600"
                  : notification?.type === "stock"
                    ? "bg-amber-100 text-amber-600"
                : "bg-emerald-100 text-emerald-600",
            ].join(" ")}
          >
              {notification?.type === "wishlist" ? (
                <Heart className="h-5 w-5" fill="currentColor" />
              ) : notification?.type === "order" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : notification?.type === "stock" ? (
                <ShoppingBag className="h-5 w-5" />
              ) : (
                <CheckCircle2 className="h-5 w-5" />
              )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900">
              {notification?.type === "wishlist"
                ? notification.action === "added"
                  ? "Saved to wishlist"
                  : "Removed from wishlist"
                : notification?.type === "order"
                  ? "Order placed successfully"
                  : notification?.type === "stock"
                    ? "Inventory limit reached"
                : "Added to cart"}
            </p>
            <p className="mt-1 text-sm leading-5 text-slate-600">
              {notification
                ? notification.type === "wishlist"
                  ? notification.name
                  : notification.type === "order"
                    ? `${notification.name} is confirmed. Redirecting to home...`
                    : notification.type === "stock"
                      ? notification.name
                  : `${notification.quantity} x ${notification.name}`
                : ""}
            </p>
          </div>
          <div className="rounded-full bg-slate-100 p-2 text-slate-500">
            {notification?.type === "wishlist" ? (
              <Heart className="h-4 w-4" fill="currentColor" />
            ) : notification?.type === "order" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : notification?.type === "stock" ? (
              <ShoppingBag className="h-4 w-4" />
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
