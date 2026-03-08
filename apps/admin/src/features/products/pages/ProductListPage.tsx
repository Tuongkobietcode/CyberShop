import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getAdminCategories } from "@/features/categories/api/categories.api";
import {
  deleteAdminProduct,
  getAdminProducts,
  updateAdminProduct,
  type AdminProduct,
} from "../api/products.api";

function formatMoney(value: number) {
  return value.toLocaleString("vi-VN");
}

export default function ProductListPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
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
    if (selectedProductId === productId) {
      resetForm();
    }
    await loadProducts();
  }

  async function handleSave() {
    if (!selectedProductId) {
      return;
    }

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

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Real products stored in MongoDB.</p>
        </div>
        <Link
          to="/admin/products/new"
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Add Product
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {selectedProductId ? "Edit Product" : "Select a product to edit"}
            </h2>
            <p className="text-sm text-slate-500">
              Create happens on the dedicated page. Update and delete happen here.
            </p>
          </div>
          {selectedProductId ? (
            <Button variant="outline" onClick={resetForm}>
              Cancel Edit
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Product name"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
          <Input
            placeholder="SKU"
            value={form.sku}
            onChange={(event) => setForm((current) => ({ ...current, sku: event.target.value }))}
          />
          <Input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
          />
          <Input
            type="number"
            placeholder="Compare at price"
            value={form.compareAtPrice}
            onChange={(event) =>
              setForm((current) => ({ ...current, compareAtPrice: event.target.value }))
            }
          />
          <Input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))}
          />
          <select
            value={form.categoryId}
            onChange={(event) =>
              setForm((current) => ({ ...current, categoryId: event.target.value }))
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={form.status}
            onChange={(event) =>
              setForm((current) => ({ ...current, status: event.target.value }))
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900"
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="out_of_stock">Out of stock</option>
            <option value="archived">Archived</option>
          </select>
          <label className="md:col-span-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                setForm((current) => ({ ...current, featured: event.target.checked }))
              }
              className="h-4 w-4 rounded border-slate-300"
            />
            Mark as featured on user-facing lists
          </label>
          <Input
            className="md:col-span-2"
            placeholder="Image URL"
            value={form.image}
            onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
          />
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({ ...current, description: event.target.value }))
            }
            placeholder="Description"
            className="min-h-28 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none md:col-span-2"
          />
          <div className="md:col-span-2">
            <Button onClick={handleSave} disabled={!selectedProductId || saving}>
              {saving ? "Saving..." : "Update Product"}
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
                  <p className="text-xs text-slate-500">
                    {form.status} · {form.featured ? "featured" : "standard"}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-slate-900">Product List</h2>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-10 text-center text-sm text-slate-500">Loading products...</div>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image || "https://placehold.co/80x80?text=Product"}
                      alt={product.name}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="font-medium text-slate-900">{product.name}</p>
                      <p className="text-sm text-slate-500">
                        {product.category?.name || "No category"} · SKU {product.sku}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-1 text-sm text-slate-600 lg:text-right">
                    <p>Price: {formatMoney(product.price)}</p>
                    <p>Stock: {product.stock}</p>
                    <p>Status: {product.status}</p>
                    <p>Storefront: {product.featured ? "featured" : product.displayStatus}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {products.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-500">No products found.</div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
