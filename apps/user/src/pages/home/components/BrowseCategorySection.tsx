import {
  type LucideIcon,
  Camera,
  Gamepad2,
  Headphones,
  Laptop2,
  Smartphone,
  Watch,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCatalogCategories } from "@/features/catalog/catalog.service";

const categoryIconMap: Record<string, LucideIcon> = {
  phones: Smartphone,
  "smart-watches": Watch,
  cameras: Camera,
  headphones: Headphones,
  computers: Laptop2,
  gaming: Gamepad2,
};

const fallbackCategories: Array<{ id: string; label: string; slug: string; icon: LucideIcon }> = [
  { id: "phones", label: "Phones", slug: "phones", icon: Smartphone },
  { id: "smart-watches", label: "Smart Watches", slug: "smart-watches", icon: Watch },
  { id: "cameras", label: "Cameras", slug: "cameras", icon: Camera },
  { id: "headphones", label: "Headphones", slug: "headphones", icon: Headphones },
  { id: "computers", label: "Computers", slug: "computers", icon: Laptop2 },
  { id: "gaming", label: "Gaming", slug: "gaming", icon: Gamepad2 },
];

export default function BrowseCategorySection() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<
    Array<{ id: string; label: string; slug: string; icon: LucideIcon }>
  >(fallbackCategories);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await getCatalogCategories({ limit: 6 });

        if (!response.data.length) {
          setCategories(fallbackCategories);
          return;
        }

        setCategories(
          response.data.map((item) => ({
            id: item.id,
            label: item.name,
            slug: item.slug,
            icon: categoryIconMap[item.slug] || Smartphone,
          }))
        );
      } catch {
        setCategories(fallbackCategories);
      }
    }

    void loadCategories();
  }, []);

  return (
    <section className="bg-[#f1f1f1] py-14">
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-10 2xl:px-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">
            Browse By Category
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-500"
            >
              &lt;
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-500"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:gap-5">
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(`/products?category=${encodeURIComponent(item.slug)}`)}
                className="group rounded-[24px] border border-white/60 bg-white/80 px-4 py-6 text-center shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-[#18121f] hover:text-white hover:shadow-[0_24px_60px_rgba(24,18,31,0.18)] sm:px-5 sm:py-7 2xl:py-8"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f5f5] text-slate-900 transition duration-300 group-hover:bg-white/10 group-hover:text-white sm:h-14 sm:w-14 2xl:h-16 2xl:w-16">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold tracking-tight">
                  {item.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
