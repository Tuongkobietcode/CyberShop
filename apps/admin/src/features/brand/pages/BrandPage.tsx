import { useMemo, useState } from "react";
import { MoreHorizontal, PlusCircle, Search, Trash2 } from "lucide-react";
import { resolveAssetUrl } from "@/utils/assets";

type Brand = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  createdAt: string;
  isActive: boolean;
};

const surface =
  "rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)]";

const brandsData: Brand[] = [
  {
    id: "1",
    name: "Apple",
    slug: "apple",
    image: "/assets/images/apple-logo.png",
    description: "Premium consumer electronics",
    createdAt: "2026-03-01",
    isActive: true,
  },
  {
    id: "2",
    name: "Samsung",
    slug: "samsung",
    image:
      "https://static.vecteezy.com/system/resources/previews/020/975/545/non_2x/samsung-logo-samsung-icon-transparent-free-png.png",
    description: "Global electronics brand",
    createdAt: "2026-03-02",
    isActive: true,
  },
  {
    id: "3",
    name: "Sony",
    slug: "sony",
    image: "/assets/images/sony-logo.png",
    description: "Audio and entertainment devices",
    createdAt: "2026-03-03",
    isActive: true,
  },
];

const productsData = [
  { id: "p1", brandId: "1" },
  { id: "p2", brandId: "1" },
  { id: "p3", brandId: "1" },
  { id: "p4", brandId: "2" },
  { id: "p5", brandId: "2" },
  { id: "p6", brandId: "3" },
];

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(brandsData);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
    description: "",
    isActive: true,
  });

  const productCounts = useMemo(() => {
    return productsData.reduce<Record<string, number>>((acc, product) => {
      acc[product.brandId] = (acc[product.brandId] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const filteredBrands = useMemo(
    () =>
      brands.filter((item) =>
        `${item.name} ${item.slug}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [brands, search],
  );

  function resetForm() {
    setSelectedId("");

    setForm({
      name: "",
      slug: "",
      image: "",
      description: "",
      isActive: true,
    });
  }

  function handleSelect(brand: Brand) {
    setSelectedId(brand.id);

    setForm({
      name: brand.name,
      slug: brand.slug,
      image: brand.image,
      description: brand.description,
      isActive: brand.isActive,
    });
  }

  function handleDelete(id: string) {
    setBrands((prev) => prev.filter((b) => b.id !== id));
    if (selectedId === id) resetForm();
  }

  function handleSubmit() {
    if (selectedId) {
      setBrands((prev) =>
        prev.map((b) => (b.id === selectedId ? { ...b, ...form } : b)),
      );
    } else {
      setBrands((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          ...form,
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    resetForm();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium text-black/45">Catalog</p>
          <h1 className="mt-2 text-[2.2rem] font-semibold tracking-[-0.05em]">
            Brand management
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetForm}
            className="flex h-11 items-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white "
          >
            <PlusCircle className="h-4 w-4" />
            Add Brand
          </button>

          <button className="flex h-11 items-center gap-2 rounded-full border border-black/10 px-5 text-sm ">
            More Action
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredBrands.slice(0, 8).map((brand) => (
          <button
            key={brand.id}
            type="button"
            onClick={() => handleSelect(brand)}
            className={[
              surface,
              "flex items-center gap-4 p-4 text-left transition hover:-translate-y-1",
            ].join(" ")}
          >
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f7f8]">
              <img
                src={resolveAssetUrl(brand.image)}
                alt={brand.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-lg font-semibold tracking-[-0.03em] text-black">
                {brand.name}
              </p>

              <p className="mt-1 text-sm text-black/42">
                {productCounts[brand.id] || 0} products
              </p>
            </div>
          </button>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className={surface}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Brand list</h2>

            <label className="flex h-12 items-center gap-3 rounded-2xl bg-[#f5f5f5] px-4">
              <Search size={16} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search brand"
                className="bg-transparent outline-none"
              />
            </label>
          </div>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-black/8">
            <table className="min-w-full text-sm">
              <thead className="bg-[#f7f7f8] text-black/50">
                <tr>
                  <th className="px-5 py-4">Brand</th>
                  <th className="px-5 py-4">Slug</th>
                  <th className="px-5 py-4">Created</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBrands.map((brand) => (
                  <tr key={brand.id} className="border-t border-black/6">
                    <td className="px-5 py-4 flex gap-3 items-center">
                      <img
                        src={resolveAssetUrl(brand.image)}
                        className="h-10 w-10 rounded-xl object-cover"
                      />

                      <div>
                        <p className="font-semibold">{brand.name}</p>
                        <p className="text-sm text-black/40">
                          {brand.description}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">{brand.slug}</td>

                    <td className="px-5 py-4">
                      {new Date(brand.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          brand.isActive ? "bg-black text-white" : "bg-gray-200"
                        }`}
                      >
                        {brand.isActive ? "Live" : "Hidden"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelect(brand)}
                          className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(brand.id)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 text-rose-500 transition hover:bg-rose-500 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={surface}>
          <p className="text-sm font-medium text-black/45">
            {selectedId ? "Edit brand" : "Create brand"}
          </p>

          <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">
            Brand form
          </h2>

          <div className="mt-6 space-y-4">
            <Field
              label="Brand name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />

            <Field
              label="Slug"
              value={form.slug}
              onChange={(v) => setForm({ ...form, slug: v })}
            />

            <Field
              label="Image path"
              value={form.image}
              onChange={(v) => setForm({ ...form, image: v })}
            />

            <label className="block space-y-2">
              <span className="text-sm font-medium text-black/58">
                Description
              </span>

              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                className="min-h-28 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 py-3 text-sm outline-none"
              />
            </label>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#1f1f1f] disabled:opacity-60"
              >
                {selectedId ? "Update Brand" : "Create Brand"}
              </button>

              <button
                onClick={resetForm}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-black/10 px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
              >
                Reset
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-black/58">{label}</span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-black/10 bg-[#f7f7f8] px-4 outline-none"
      />
    </label>
  );
}
