import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getAdminCategories } from "@/features/categories/api/categories.api";
import { createAdminProduct } from "../api/products.api";

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
      setForm((current) => ({
        ...current,
        categoryId: current.categoryId || options[0]?.id || "",
      }));
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
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create Product</h1>
        <p className="mt-1 text-sm text-slate-500">Submit directly to the backend API.</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-slate-900">Product Form</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            <Input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <Input placeholder="Compare at price" type="number" value={form.compareAtPrice} onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value })} />
            <Input placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of stock</option>
            </select>
            <label className="md:col-span-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300"
              />
              Show as featured on user-facing lists
            </label>
            <Input
              className="md:col-span-2"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
              className="min-h-32 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none md:col-span-2"
            />
            <div className="md:col-span-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Creating..." : "Create Product"}
              </Button>
            </div>
            {form.image ? (
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <img
                    src={form.image}
                    alt={form.name || "Product preview"}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {form.name || "Product preview"}
                    </p>
                    <p className="text-xs text-slate-500">Visible in user catalog after save</p>
                  </div>
                </div>
              </div>
            ) : null}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
