import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, Pencil, PlusCircle, Search, Trash2 } from "lucide-react";
import { resolveAssetUrl } from "@/utils/assets";
import { getAdminCategories } from "@/features/categories/api/categories.api";
import {
  adjustAdminProductInventory,
  deleteAdminProduct,
  getAdminProducts,
  updateAdminProduct,
  type AdminProduct,
} from "../api/products.api";

const surface = "rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)]";

function formatMoney(value: number) {
  return `$${Math.round(value / 16000).toLocaleString("en-US")}`;
}

export default function ProductListPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "featured" | "active" | "out_of_stock">("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
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
  const [adjustment, setAdjustment] = useState({
    type: "increase" as "increase" | "decrease" | "set",
    quantity: "0",
    reason: "manual_restock",
    note: "",
  });

  async function loadProducts() {
    setLoading(true);
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        getAdminProducts({ limit: 100 }),
        getAdminCategories({ limit: 50 }),
      ]);
      setProducts(productResponse.data);
      setCategories(categoryResponse.data.map((item) => ({ id: item.id, name: item.name })));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const keyword = `${product.name} ${product.sku} ${product.category?.name || ""}`.toLowerCase();
      const searchMatch = keyword.includes(search.toLowerCase());
      const statusMatch =
        status === "all"
          ? true
          : status === "featured"
          ? product.featured
          : product.status === status;
      return searchMatch && statusMatch;
    });
  }, [products, search, status]);

  const topCards = [
    { label: "All Products", value: products.length },
    { label: "Featured", value: products.filter((item) => item.featured).length },
    { label: "Active", value: products.filter((item) => item.status === "active").length },
    { label: "Out of Stock", value: products.filter((item) => item.status === "out_of_stock").length },
  ];

  function resetForm() {
    setSelectedProductId("");
    setForm({
      name: "",
      sku: "",
      price: "0",
      compareAtPrice: "",
      stock: "0",
      categoryId: categories[0]?.id || "",
      description: "",
      image: "",
      featured: false,
      status: "active",
    });
    setAdjustment({
      type: "increase",
      quantity: "0",
      reason: "manual_restock",
      note: "",
    });
  }

  function handleEdit(product: AdminProduct) {
    setSelectedProductId(product.id);
    setForm({
      name: product.name,
      sku: product.sku,
      price: String(product.price),
      compareAtPrice: product.compareAtPrice ? String(product.compareAtPrice) : "",
      stock: String(product.stock),
      categoryId: product.category?.id || "",
      description: product.description,
      image: product.image,
      featured: product.featured,
      status: product.status,
    });
  }

  async function handleDelete(productId: string) {
    await deleteAdminProduct(productId);
    if (selectedProductId === productId) resetForm();
    await loadProducts();
  }

  async function handleSave() {
    if (!selectedProductId) return;
    setSaving(true);
    try {
      await updateAdminProduct(selectedProductId, {
        name: form.name,
        sku: form.sku,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
        stock: Number(form.stock),
        categoryId: form.categoryId,
        description: form.description,
        images: form.image ? [{ url: form.image, alt: form.name, sortOrder: 0 }] : [],
        status: form.status,
        featured: form.featured,
      });
      resetForm();
      await loadProducts();
    } finally {
      setSaving(false);
    }
  }

  async function handleInventoryAdjust() {
    if (!selectedProductId) return;
    setSaving(true);
    try {
      await adjustAdminProductInventory(selectedProductId, {
        type: adjustment.type,
        quantity: Number(adjustment.quantity),
        reason: adjustment.reason,
        note: adjustment.note,
      });
      setAdjustment((current) => ({ ...current, quantity: "0", note: "" }));
      await loadProducts();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium text-black/45">Product list</p>
          <h1 className="mt-2 text-[2.2rem] font-semibold tracking-[-0.05em] text-black">Shared catalog inventory</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/admin/products/new" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#1f1f1f]">
            <PlusCircle className="h-4 w-4" />
            Add Product
          </Link>
          <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/10 px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
            More Action
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topCards.map((card) => (
          <section key={card.label} className={surface}>
            <p className="text-sm font-medium text-black/45">{card.label}</p>
            <p className="mt-5 text-[2.4rem] font-semibold tracking-[-0.06em] text-black">{card.value.toLocaleString("en-US")}</p>
            <p className="mt-2 text-sm text-black/42">Live inventory snapshot</p>
          </section>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <section className={surface}>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="inline-flex rounded-full bg-[#f5f5f5] p-1 text-sm">
              {([
                ["all", `All Product (${products.length})`],
                ["featured", "Featured Products"],
                ["active", "Active"],
                ["out_of_stock", "Out of Stock"],
              ] as const).map(([value, label]) => (
                <button key={value} type="button" onClick={() => setStatus(value)} className={["rounded-full px-4 py-2 font-medium transition", status === value ? "bg-white text-black shadow-sm" : "text-black/45 hover:text-black"].join(" ")}>
                  {label}
                </button>
              ))}
            </div>

            <label className="flex h-12 min-w-[280px] items-center gap-3 rounded-2xl bg-[#f5f5f5] px-4 text-black/35">
              <Search className="h-4 w-4" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your product" className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/35" />
            </label>
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl border border-dashed border-black/10 px-6 py-12 text-center text-sm text-black/45">Loading products...</div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-[24px] border border-black/8">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#f7f7f8] text-black/48">
                  <tr>
                    <th className="px-5 py-4 font-medium">Product</th>
                    <th className="px-5 py-4 font-medium">Created Date</th>
                    <th className="px-5 py-4 font-medium">Category</th>
                    <th className="px-5 py-4 font-medium">Price</th>
                    <th className="px-5 py-4 font-medium">Stock</th>
                    <th className="px-5 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-t border-black/6">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f7f8]">
                            <img src={resolveAssetUrl(product.image || "/assets/images/iphone-fallback.png")} alt={product.name} className="max-h-10 object-contain" />
                          </div>
                          <div>
                            <p className="font-semibold text-black">{product.name}</p>
                            <p className="mt-1 text-sm text-black/42">SKU {product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-black/42">{new Date(product.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4 text-black/65">{product.category?.name || "No category"}</td>
                      <td className="px-5 py-4 font-medium text-black">{formatMoney(product.price)}</td>
                      <td className="px-5 py-4">
                        <span className={["inline-flex rounded-full px-3 py-1 text-xs font-semibold", product.status === "out_of_stock" ? "bg-rose-100 text-rose-600" : "bg-black text-white"].join(" ")}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => handleEdit(product)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black hover:text-white">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button type="button" onClick={() => handleDelete(product.id)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 text-rose-500 transition hover:bg-rose-500 hover:text-white">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className={surface}>
          <p className="text-sm font-medium text-black/45">{selectedProductId ? "Edit product" : "Select a product"}</p>
          <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">Product update</h2>

          <div className="mt-6 space-y-4">
            <Field label="Product name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
            <Field label="SKU" value={form.sku} onChange={(value) => setForm((current) => ({ ...current, sku: value }))} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Price" value={form.price} onChange={(value) => setForm((current) => ({ ...current, price: value }))} />
              <Field label="Compare at price" value={form.compareAtPrice} onChange={(value) => setForm((current) => ({ ...current, compareAtPrice: value }))} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Stock" value={form.stock} onChange={(value) => setForm((current) => ({ ...current, stock: value }))} />
              <label className="block space-y-2">
                <span className="text-sm font-medium text-black/58">Category</span>
                <select value={form.categoryId} onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))} className="h-12 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 text-sm outline-none">
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <Field label="Image path" value={form.image} onChange={(value) => setForm((current) => ({ ...current, image: value }))} />
            <label className="block space-y-2">
              <span className="text-sm font-medium text-black/58">Description</span>
              <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className="min-h-28 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 py-3 text-sm outline-none" />
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#f7f7f8] px-4 py-4 text-sm font-medium text-black">
              <input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} className="h-4 w-4 rounded border-black/20" />
              Featured on user storefront
            </label>
            {form.image ? (
              <div className="rounded-[24px] bg-[#f7f7f8] p-4">
                <div className="flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-white">
                  <img src={resolveAssetUrl(form.image)} alt={form.name || "Preview"} className="max-h-[140px] object-contain" />
                </div>
              </div>
            ) : null}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={handleSave} disabled={!selectedProductId || saving} className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#1f1f1f] disabled:opacity-60">
                {saving ? "Saving..." : "Update Product"}
              </button>
              <button type="button" onClick={resetForm} className="inline-flex h-12 items-center justify-center rounded-2xl border border-black/10 px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
                Reset
              </button>
            </div>

            {selectedProductId ? (
              <div className="rounded-[24px] border border-black/8 bg-[#fbfbfb] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-black/45">Inventory control</p>
                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-black">Stock adjustment</h3>
                  </div>
                  <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                    Current {form.stock}
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-black/58">Adjustment type</span>
                      <select value={adjustment.type} onChange={(event) => setAdjustment((current) => ({ ...current, type: event.target.value as "increase" | "decrease" | "set" }))} className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none">
                        <option value="increase">Increase</option>
                        <option value="decrease">Decrease</option>
                        <option value="set">Set exact stock</option>
                      </select>
                    </label>
                    <Field label="Quantity" value={adjustment.quantity} onChange={(value) => setAdjustment((current) => ({ ...current, quantity: value }))} />
                  </div>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-black/58">Reason</span>
                    <select value={adjustment.reason} onChange={(event) => setAdjustment((current) => ({ ...current, reason: event.target.value }))} className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none">
                      <option value="manual_restock">Manual restock</option>
                      <option value="damage_writeoff">Damage write-off</option>
                      <option value="stock_correction">Stock correction</option>
                      <option value="store_transfer">Store transfer</option>
                    </select>
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-black/58">Note</span>
                    <textarea value={adjustment.note} onChange={(event) => setAdjustment((current) => ({ ...current, note: event.target.value }))} className="min-h-24 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none" placeholder="Explain why stock changed." />
                  </label>

                  <button type="button" onClick={handleInventoryAdjust} disabled={saving || Number(adjustment.quantity) < 0} className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white disabled:opacity-60">
                    {saving ? "Applying..." : "Apply Stock Adjustment"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-black/58">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 text-sm outline-none" />
    </label>
  );
}
