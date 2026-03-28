import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useAuth } from "@/features/auth/auth.context";
import { useCart } from "@/features/cart/cart.context";

const primaryNavigation = [
  { label: "Store", to: "/home" },
  { label: "Mac", to: "/products?category=mac" },
  { label: "iPhone", to: "/products?category=iphone" },
  { label: "iPad", to: "/products?category=ipad" },
  { label: "Watch", to: "/products?category=apple-watch" },
  { label: "Vision", to: "/products?category=apple-vision-pro" },
  { label: "AirPods", to: "/products?category=airpods" },
  { label: "Journal", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Support", to: "/contact" },
];

export default function Header() {
  const { itemCount, wishlistCount } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [routeSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (location.pathname === "/products") {
      setKeyword(routeSearchParams.get("search") || "");
    } else {
      setKeyword("");
    }
  }, [location.pathname, routeSearchParams]);

  function isNavActive(path: string) {
    if (path === "/home") {
      return location.pathname === "/home";
    }

    const [pathname] = path.split("?");
    return location.pathname === pathname;
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }
    navigate(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(180,205,255,0.12)] bg-[linear-gradient(180deg,rgba(18,25,38,0.9),rgba(11,16,24,0.86))] shadow-[0_18px_54px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
      <div className="mx-auto max-w-[1680px] px-3 sm:px-4 lg:px-8 2xl:px-10">
        <div className="flex min-h-[64px] items-center gap-4">
          <Link
            to="/home"
            className="shrink-0 text-[1.02rem] font-semibold tracking-[-0.05em] text-white"
          >
            Cyber
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-7 xl:flex">
            {primaryNavigation.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={[
                  "text-[0.78rem] font-medium tracking-[0.01em] transition",
                  isNavActive(item.to)
                    ? "text-white"
                    : "text-white/48 hover:text-white/80",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <form
              onSubmit={handleSearchSubmit}
              className="flex h-10 w-[240px] items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 text-white/40 transition hover:border-white/12"
            >
              <Search className="h-4 w-4" />
              <input
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search products"
                className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/28"
              />
            </form>

            <Link
              to={isAuthenticated ? "/wishlist" : "/sign-in?redirect=%2Fwishlist"}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/68 transition hover:bg-white/[0.06]"
            >
              <Heart
                className={[
                  "h-[18px] w-[18px]",
                  wishlistCount > 0 ? "fill-rose-500 text-rose-500" : "",
                ].join(" ")}
              />
              {wishlistCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>

            <Link
              to={isAuthenticated ? "/cart" : "/sign-in?redirect=%2Fcart"}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/68 transition hover:bg-white/[0.06]"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {itemCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-semibold text-slate-950">
                  {itemCount}
                </span>
              ) : null}
            </Link>

            <Link
              to={isAuthenticated ? "/profile" : "/sign-in"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/68 transition hover:bg-white/[0.06]"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <Link
              to="/products"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/68"
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>
            <Link
              to={isAuthenticated ? "/cart" : "/sign-in?redirect=%2Fcart"}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/68"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {itemCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-semibold text-slate-950">
                  {itemCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto border-t border-white/6 py-3 xl:hidden">
          {primaryNavigation.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={[
                "shrink-0 text-[0.78rem] font-medium tracking-[0.01em] transition",
                isNavActive(item.to) ? "text-white" : "text-white/46",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
