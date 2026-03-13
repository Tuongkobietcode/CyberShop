import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/features/auth/auth.context";
import { useCart } from "@/features/cart/cart.context";

const navigation = [
  { label: "Home", to: "/home" },
  { label: "About", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Blog", to: "/blog" },
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
      return location.pathname === "/home" || location.pathname.startsWith("/products");
    }

    return location.pathname === path;
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
    <header className="border-b border-black/12 bg-white/96 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/home" className="text-[1.95rem] font-black tracking-[-0.07em] text-black">
          cyber
        </Link>

        <div className="hidden flex-1 md:block">
          <form onSubmit={handleSearchSubmit} className="flex h-[56px] items-center gap-3 rounded-2xl bg-[#f5f5f5] px-5 text-[#989898]">
            <Search className="h-[18px] w-[18px]" />
            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search"
              className="w-full border-0 bg-transparent text-sm text-black outline-none placeholder:text-[#989898]"
            />
          </form>
        </div>

        <nav className="hidden items-center gap-10 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={[
                "text-sm font-medium transition",
                isNavActive(item.to) ? "text-black" : "text-black/45 hover:text-black",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 sm:gap-5">
          <Link to={isAuthenticated ? "/wishlist" : "/sign-in?redirect=%2Fwishlist"} className="relative text-black transition hover:scale-105">
            <Heart className={["h-6 w-6", wishlistCount > 0 ? "fill-rose-500 text-rose-500" : ""].join(" ")} />
            {wishlistCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                {wishlistCount}
              </span>
            ) : null}
          </Link>
          <Link to={isAuthenticated ? "/cart" : "/sign-in?redirect=%2Fcart"} className="relative text-black transition hover:scale-105">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            ) : null}
          </Link>
          <Link to={isAuthenticated ? "/profile" : "/sign-in"} className="text-black transition hover:scale-105">
            <User className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
