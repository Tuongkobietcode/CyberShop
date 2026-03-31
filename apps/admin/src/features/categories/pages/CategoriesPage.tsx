import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import axios from "axios";
import {
  ImagePlus,
  MoreHorizontal,
  PlusCircle,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { uploadAdminImages } from "@/features/uploads/api/uploads.api";
import {
  isBlank,
  isNonNegativeInteger,
  isValidSlug,
  type ValidationErrors,
} from "@shared/validation/forms";
import { resolveAssetUrl } from "@/utils/assets";
import {
  createAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
  updateAdminCategory,
  type AdminCategory,
} from "../api/categories.api";

const surface =
  "rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)]";

function Field({
  label,
  value,
  onChange,
  error = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-black/58">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={[
          "h-12 w-full rounded-2xl border bg-[#f5f5f5] px-4 text-sm outline-none",
          error ? "border-rose-300 bg-rose-50/70" : "border-black/10",
        ].join(" ")}
        aria-invalid={Boolean(error)}
      />
      {error ? <span className="text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}

function validateCategoryForm(form: {
  name: string;
  slug: string;
  sortOrder: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (isBlank(form.name)) {
    errors.name = "Category name is required.";
  }

  if (isBlank(form.slug)) {
    errors.slug = "Slug is required.";
  } else if (!isValidSlug(form.slug)) {
    errors.slug = "Use lowercase letters, numbers, and hyphens only.";
  }

  if (isBlank(form.sortOrder)) {
    errors.sortOrder = "Sort order is required.";
  } else if (!isNonNegativeInteger(form.sortOrder)) {
    errors.sortOrder = "Sort order must be a non-negative integer.";
  }

  return errors;
}

export function CategoriesPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaError, setMediaError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; message: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
    description: "",
    sortOrder: "1",
    isActive: true,
  });

  async function loadData() {
    setLoading(true);

    try {
      const categoryResponse = await getAdminCategories({ limit: 40 });
      setCategories(categoryResponse.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);
  useEffect(() => {
    if (!feedback) return;
    const timeoutId = window.setTimeout(() => setFeedback(null), 1500);
    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  const filteredCategories = useMemo(
    () =>
      categories.filter((item) =>
        `${item.name} ${item.slug}`.toLowerCase().includes(search.toLowerCase())
      ),
    [categories, search]
  );

  function resetForm() {
    setSelectedId("");
    setMediaError("");
    setSubmitError("");
    setFeedback(null);
    setFieldErrors({});
    setForm({
      name: "",
      slug: "",
      image: "",
      description: "",
      sortOrder: String(categories.length + 1),
      isActive: true,
    });
  }

  function handleSelect(category: AdminCategory) {
    setSelectedId(category.id);
    setMediaError("");
    setSubmitError("");
    setFeedback(null);
    setFieldErrors({});
    setForm({
      name: category.name,
      slug: category.slug,
      image: category.image,
      description: category.description,
      sortOrder: String(category.sortOrder),
      isActive: category.isActive,
    });
  }

  async function handleSubmit() {
    const nextErrors = validateCategoryForm(form);
    setFieldErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setSaving(true);
    setSubmitError("");

    try {
      const payload = {
        ...form,
        sortOrder: Number(form.sortOrder) || 0,
      };

      if (selectedId) {
        await updateAdminCategory(selectedId, payload);
      } else {
        await createAdminCategory(payload);
      }

      resetForm();
      await loadData();
      setFeedback({
        tone: "success",
        message: selectedId ? "Category updated successfully." : "Category created successfully.",
      });
    } catch (error) {
      setSubmitError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Unable to save category right now."
          : error instanceof Error
            ? error.message
            : "Unable to save category right now."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(categoryId: string) {
    try {
      const deletedCategory = await deleteAdminCategory(categoryId);

      if (selectedId === categoryId) {
        resetForm();
      }

      await loadData();
      setFeedback({
        tone: "success",
        message: `${deletedCategory.name} is now hidden from the storefront.`,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        message: axios.isAxiosError(error)
          ? error.response?.data?.message || "Unable to disable category right now."
          : error instanceof Error
            ? error.message
            : "Unable to disable category right now.",
      });
    }
  }

  async function handleImageSelection(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMediaError("");
    setUploading(true);

    try {
      const [uploadedImage] = await uploadAdminImages([file], "categories");
      setForm((current) => ({ ...current, image: uploadedImage?.url || "" }));
    } catch (error) {
      setMediaError(error instanceof Error ? error.message : "Category image upload failed");
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium text-black/45">Discover</p>
          <h1 className="mt-2 text-[2.2rem] font-semibold tracking-[-0.05em] text-black">
            Shared catalog categories
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#1f1f1f]"
          >
            <PlusCircle className="h-4 w-4" />
            Add Category
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/10 px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
          >
            More Action
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredCategories.slice(0, 8).map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleSelect(category)}
            className={[
              surface,
              "flex items-center gap-4 p-4 text-left transition hover:-translate-y-1",
            ].join(" ")}
          >
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f7f8]">
              <img
                src={resolveAssetUrl(category.image)}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold tracking-[-0.03em] text-black">
                {category.name}
              </p>
              <p className="mt-1 text-sm text-black/42">{category.productCount} products</p>
            </div>
          </button>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className={surface}>
          {feedback ? (
            <div
              className={[
                "mb-6 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-medium",
                feedback.tone === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-rose-200 bg-rose-50 text-rose-600",
              ].join(" ")}
            >
              <span>{feedback.message}</span>
              <button
                type="button"
                onClick={() => setFeedback(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-current/15 text-current transition hover:bg-white/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-black/45">Category inventory</p>
              <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">
                Manage categories
              </h2>
            </div>
            <label className="flex h-12 min-w-[280px] items-center gap-3 rounded-2xl bg-[#f5f5f5] px-4 text-black/35">
              <Search className="h-4 w-4" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search category"
                className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/35"
              />
            </label>
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl border border-dashed border-black/10 px-6 py-12 text-center text-sm text-black/45">
              Loading categories...
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-[24px] border border-black/8">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#f7f7f8] text-black/48">
                  <tr>
                    <th className="px-5 py-4 font-medium">Category</th>
                    <th className="px-5 py-4 font-medium">Slug</th>
                    <th className="px-5 py-4 font-medium">Created</th>
                    <th className="px-5 py-4 font-medium">Products</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="border-t border-black/6">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f7f8]">
                            <img
                              src={resolveAssetUrl(category.image)}
                              alt={category.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-black">{category.name}</p>
                            <p className="mt-1 text-sm text-black/42">
                              {category.description || "No description"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-black/52">{category.slug}</td>
                      <td className="px-5 py-4 text-black/42">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 font-medium text-black">
                        {category.productCount}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={[
                            "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                            category.isActive
                              ? "bg-slate-900 text-white"
                              : "bg-slate-100 text-slate-600",
                          ].join(" ")}
                        >
                          {category.isActive ? "Live" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSelect(category)}
                            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(category.id)}
                            disabled={category.productCount > 0}
                            title={
                              category.productCount > 0
                                ? "Archive or move live products before hiding this category."
                                : "Hide this category from the storefront"
                            }
                            className={[
                              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
                              category.productCount > 0
                                ? "cursor-not-allowed border-black/8 text-black/25"
                                : "border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white",
                            ].join(" ")}
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
          )}
        </section>

        <section className={surface}>
          <p className="text-sm font-medium text-black/45">
            {selectedId ? "Edit category" : "Create category"}
          </p>
          <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">
            Category form
          </h2>

          <div className="mt-6 space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelection}
              className="hidden"
            />

            <Field
              label="Category name"
              value={form.name}
              onChange={(value) => {
                setForm((current) => ({ ...current, name: value }));
                setFieldErrors((current) => ({ ...current, name: "" }));
                setSubmitError("");
              }}
              error={fieldErrors.name}
            />
            <Field
              label="Slug"
              value={form.slug}
              onChange={(value) => {
                setForm((current) => ({ ...current, slug: value }));
                setFieldErrors((current) => ({ ...current, slug: "" }));
                setSubmitError("");
              }}
              error={fieldErrors.slug}
            />
            <Field
              label="Sort order"
              value={form.sortOrder}
              onChange={(value) => {
                setForm((current) => ({ ...current, sortOrder: value }));
                setFieldErrors((current) => ({ ...current, sortOrder: "" }));
                setSubmitError("");
              }}
              error={fieldErrors.sortOrder}
            />
            <label className="block space-y-2">
              <span className="text-sm font-medium text-black/58">Description</span>
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
                className="min-h-28 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 py-3 text-sm outline-none"
              />
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#f7f7f8] px-4 py-4 text-sm font-medium text-black">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) =>
                  setForm((current) => ({ ...current, isActive: event.target.checked }))
                }
                className="h-4 w-4 rounded border-black/20"
              />
              Visible on user storefront
            </label>

            <div className="rounded-[24px] border border-dashed border-black/12 bg-[#f7f7f8] p-4">
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-white">
                {form.image ? (
                  <img
                    src={resolveAssetUrl(form.image)}
                    alt={form.name || "Preview"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center text-black/35">
                    <ImagePlus className="mx-auto h-8 w-8" />
                    <p className="mt-3 text-sm">
                      Upload a category image for storefront navigation and admin preview.
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={openFilePicker}
                  disabled={uploading}
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 bg-white px-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white disabled:opacity-60"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Upload
                </button>
                <button
                  type="button"
                  onClick={openFilePicker}
                  disabled={uploading}
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 bg-white px-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white disabled:opacity-60"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {uploading ? "Uploading..." : "Replace"}
                </button>
                <button
                  type="button"
                  onClick={() => setForm((current) => ({ ...current, image: "" }))}
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-rose-200 bg-white px-4 text-sm font-semibold text-rose-500 transition hover:bg-rose-500 hover:text-white"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>

            {mediaError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                {mediaError}
              </div>
            ) : null}
            {submitError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                {submitError}
              </div>
            ) : null}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#1f1f1f] disabled:opacity-60"
              >
                {saving ? "Saving..." : selectedId ? "Update Category" : "Create Category"}
              </button>
              <button
                type="button"
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
