import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MoreVertical, PlusCircle } from "lucide-react";
import { Pagination } from "@/components/data-display/Pagination";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CategoryChips } from "../components/CategoryChips";
import { CategoriesTable } from "../components/CategoriesTable";
import { CategoriesToolbar } from "../components/CategoriesToolbar";
import type { CategoryItem, ProductItem, ProductStatus } from "../types";
import {
  createAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
  updateAdminCategory,
  type AdminCategory,
} from "../api/categories.api";
import { getAdminProducts } from "@/features/products/api/products.api";

export function CategoriesPage() {
  const [status, setStatus] = useState<ProductStatus>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [categoryRecords, setCategoryRecords] = useState<AdminCategory[]>([]);
  const [allRows, setAllRows] = useState<ProductItem[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savingCategory, setSavingCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    image: "",
    description: "",
    sortOrder: "1",
  });

  const pageSize = 10;

  async function loadData() {
    setLoading(true);

    try {
      const [categoryResponse, productResponse] = await Promise.all([
        getAdminCategories({ limit: 20 }),
        getAdminProducts({ limit: 100 }),
      ]);

      setCategoryRecords(categoryResponse.data);
      setCategories(
        categoryResponse.data.map((item) => ({
          id: item.id,
          name: item.name,
          image:
            item.image ||
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&q=80",
        }))
      );

      setAllRows(
        productResponse.data.map((item) => ({
          id: item.id,
          name: item.name,
          image:
            item.image ||
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&q=80",
          createdDate: new Date(item.createdAt).toLocaleDateString(),
          order: item.stock,
          status:
            item.displayStatus === "featured" ||
            item.displayStatus === "sale" ||
            item.displayStatus === "out_of_stock"
              ? item.displayStatus
              : "normal",
        }))
      );
      setTotalProducts(productResponse.meta?.total || productResponse.data.length);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredRows = useMemo(() => {
    return allRows.filter((row) => {
      const matchSearch = row.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "all" ? true : row.status === status;

      return matchSearch && matchStatus;
    });
  }, [allRows, search, status]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));

  function resetCategoryForm() {
    setSelectedCategoryId("");
    setCategoryForm({
      name: "",
      image: "",
      description: "",
      sortOrder: String(categoryRecords.length + 1),
    });
  }

  function handleSelectCategory(categoryId: string) {
    const category = categoryRecords.find((item) => item.id === categoryId);

    if (!category) {
      return;
    }

    setSelectedCategoryId(category.id);
    setCategoryForm({
      name: category.name,
      image: category.image,
      description: category.description,
      sortOrder: String(category.sortOrder),
    });
  }

  async function handleDeleteCategory(categoryId: string) {
    await deleteAdminCategory(categoryId);
    if (selectedCategoryId === categoryId) {
      resetCategoryForm();
    }
    await loadData();
  }

  async function handleSubmitCategory() {
    setSavingCategory(true);

    try {
      const payload = {
        name: categoryForm.name,
        image: categoryForm.image,
        description: categoryForm.description,
        sortOrder: Number(categoryForm.sortOrder) || 0,
      };

      if (selectedCategoryId) {
        await updateAdminCategory(selectedCategoryId, payload);
      } else {
        await createAdminCategory(payload);
      }

      resetCategoryForm();
      await loadData();
    } finally {
      setSavingCategory(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Discover</h1>
          <p className="mt-1 text-sm text-slate-500">Categories and products are now loaded from the backend.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/admin/products/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#62b56f] px-5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
          >
            <PlusCircle size={18} />
            Add Product
          </Link>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[5px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700"
          >
            More Action
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <CategoryChips
        categories={categories}
        selectedId={selectedCategoryId}
        onSelect={handleSelectCategory}
        onDelete={handleDeleteCategory}
      />

      <Card className="rounded-3xl">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {selectedCategoryId ? "Edit Category" : "Create Category"}
            </h2>
            <p className="text-sm text-slate-500">
              Basic category CRUD styled to match the current admin UI.
            </p>
          </div>
          {selectedCategoryId ? (
            <Button variant="outline" onClick={resetCategoryForm}>
              Cancel Edit
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Category name"
            value={categoryForm.name}
            onChange={(event) =>
              setCategoryForm((current) => ({ ...current, name: event.target.value }))
            }
          />
          <Input
            placeholder="Image URL"
            value={categoryForm.image}
            onChange={(event) =>
              setCategoryForm((current) => ({ ...current, image: event.target.value }))
            }
          />
          <Input
            placeholder="Sort order"
            type="number"
            value={categoryForm.sortOrder}
            onChange={(event) =>
              setCategoryForm((current) => ({ ...current, sortOrder: event.target.value }))
            }
          />
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
            Categories: {categoryRecords.length}
          </div>
          <textarea
            value={categoryForm.description}
            onChange={(event) =>
              setCategoryForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            placeholder="Description"
            className="min-h-28 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none md:col-span-2"
          />
          <div className="md:col-span-2">
            <Button onClick={handleSubmitCategory} disabled={savingCategory}>
              {savingCategory
                ? "Saving..."
                : selectedCategoryId
                  ? "Update Category"
                  : "Create Category"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 rounded-[5px] border border-slate-200 bg-white p-5">
        <CategoriesToolbar
          active={status}
          onChange={(nextStatus) => {
            setStatus(nextStatus);
            setPage(1);
          }}
          search={search}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          totalProducts={totalProducts}
        />

        {loading ? (
          <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-center text-sm text-slate-500">
            Loading category inventory...
          </div>
        ) : (
          <CategoriesTable rows={pagedRows} />
        )}

        <div className="px-1">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}
