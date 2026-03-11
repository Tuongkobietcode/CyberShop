import { useEffect, useState, type FormEvent } from "react";
import { PlusCircle, Upload, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAdminCategories } from "@/features/categories/api/categories.api";
import { resolveAssetUrl } from "@/utils/assets";
import { createAdminProduct } from "../api/products.api";

const surface = "rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)]";

type CategoryOption = {
  id: string;
  name: string;
};

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "0",
    compareAtPrice: "",
    stock: "0",
    categoryId: "",
    description: "",
    image: "",
    featured: false,
    status: "active",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      const response = await getAdminCategories({ limit: 50 });
      const options = response.data.map((item) => ({ id: item.id, name: item.name }));
      setCategories(options);
      setForm((current) => ({ ...current, categoryId: current.categoryId || options[0]?.id || "" }));
    }

    loadCategories();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await createAdminProduct({
        name: form.name,
        sku: form.sku,
        description: form.description,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
        stock: Number(form.stock),
        status: form.status,
        featured: form.featured,
        categoryId: form.categoryId,
        images: form.image ? [{ url: form.image, alt: form.name, sortOrder: 0 }] : [],
      });
      navigate("/admin/products", { replace: true });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium text-black/45">Add new product</p>
          <h1 className="mt-2 text-[2.2rem] font-semibold tracking-[-0.05em] text-black">Publish to shared catalog</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white">Save to draft</button>
          <button type="submit" form="admin-product-form" disabled={submitting} className="inline-flex h-12 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#1f1f1f] disabled:opacity-60">{submitting ? "Publishing..." : "Publish Product"}</button>
        </div>
      </div>

      <form id="admin-product-form" onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className={surface}>
          <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-black">Basic details</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Field label="Product Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} className="md:col-span-2" />
            <Field label="SKU" value={form.sku} onChange={(value) => setForm((current) => ({ ...current, sku: value }))} />
            <Field label="Stock Quantity" value={form.stock} onChange={(value) => setForm((current) => ({ ...current, stock: value }))} />
            <Field label="Product Price" value={form.price} onChange={(value) => setForm((current) => ({ ...current, price: value }))} />
            <Field label="Discounted Price" value={form.compareAtPrice} onChange={(value) => setForm((current) => ({ ...current, compareAtPrice: value }))} />

            <label className="block space-y-2">
              <span className="text-sm font-medium text-black/58">Description</span>
              <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className="min-h-40 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 py-3 text-sm outline-none md:col-span-2" />
            </label>

            <div className="rounded-[24px] bg-[#f7f7f8] p-5 md:col-span-2">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm font-medium text-black">
                  <input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} className="h-4 w-4 rounded border-black/20" />
                  Highlight this product on the user home page
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-black/58">Stock Status</span>
                  <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))} className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none">
                    <option value="active">In Stock</option>
                    <option value="draft">Draft</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className={surface}>
          <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-black">Product media</h2>

          <div className="mt-8 space-y-5">
            <Field label="Image Path" value={form.image} onChange={(value) => setForm((current) => ({ ...current, image: value }))} placeholder="/assets/images/your-file.png" />

            <div className="rounded-[24px] border border-dashed border-black/12 bg-[#f7f7f8] p-5">
              <div className="flex min-h-[260px] items-center justify-center overflow-hidden rounded-[20px] bg-white">
                {form.image ? (
                  <img src={resolveAssetUrl(form.image)} alt={form.name || "Product preview"} className="max-h-[240px] object-contain" />
                ) : (
                  <div className="text-center text-black/35">
                    <Upload className="mx-auto h-8 w-8" />
                    <p className="mt-3 text-sm">Preview will appear here</p>
                  </div>
                )}
              </div>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-black/58">Product Category</span>
              <select value={form.categoryId} onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))} className="h-12 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 text-sm outline-none">
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-3 gap-3">
              <button type="button" className="inline-flex h-12 items-center justify-center rounded-2xl border border-black/10 px-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Browse
              </button>
              <button type="button" className="inline-flex h-12 items-center justify-center rounded-2xl border border-black/10 px-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
                <Upload className="mr-2 h-4 w-4" />
                Replace
              </button>
              <button type="button" onClick={() => setForm((current) => ({ ...current, image: "" }))} className="inline-flex h-12 items-center justify-center rounded-2xl border border-rose-200 px-4 text-sm font-semibold text-rose-500 transition hover:bg-rose-500 hover:text-white">
                <XCircle className="mr-2 h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, className = "" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; className?: string }) {
  return (
    <label className={["block space-y-2", className].join(" ")}>
      <span className="text-sm font-medium text-black/58">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-12 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 text-sm outline-none" />
    </label>
  );
}
