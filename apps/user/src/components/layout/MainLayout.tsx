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
    <div className="min-h-screen bg-transparent text-white">
      <div
        className={[
          "fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(143,185,255,0.48),rgba(255,255,255,0.1))] shadow-[0_8px_24px_rgba(111,142,194,0.18)] transition-transform duration-500",
          isTransitioning ? "scale-x-100" : "scale-x-0",
        ].join(" ")}
      />
      <div
        className={[
          "pointer-events-none fixed inset-0 z-[60] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_24%),radial-gradient(circle_at_82%_10%,rgba(103,128,168,0.08),transparent_26%)] transition duration-300",
          isTransitioning ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[560px] bg-[radial-gradient(circle_at_top,rgba(89,110,145,0.14),transparent_62%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.018),transparent_18%,transparent_82%,rgba(255,255,255,0.01))]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.028),transparent_18%),radial-gradient(circle_at_76%_72%,rgba(80,103,145,0.08),transparent_24%)]" />
      <div
        className={[
          "pointer-events-none fixed right-5 top-24 z-[80] w-[min(380px,calc(100vw-2.5rem))] rounded-[26px] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300",
          notification?.type === "wishlist"
            ? "border border-rose-300/30 bg-[#171217]/92"
            : notification?.type === "order"
              ? "border border-sky-300/30 bg-[#101722]/92"
              : notification?.type === "stock"
                ? "border border-amber-300/30 bg-[#171510]/92"
            : "border border-emerald-300/30 bg-[#0e1713]/92",
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
                  ? "bg-sky-100 text-sky-700"
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
            <p className="text-sm font-semibold text-white">
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
            <p className="mt-1 text-sm leading-5 text-white/62">
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
          <div className="rounded-full bg-white/6 p-2 text-white/44">
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
