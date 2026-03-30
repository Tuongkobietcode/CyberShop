import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Pencil,
  PlusCircle,
  Search,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";
import { uploadAdminImages } from "@/features/uploads/api/uploads.api";
import { resolveAssetUrl } from "@/utils/assets";
import {
  createAdminBlogPost,
  deleteAdminBlogPost,
  getAdminBlogPosts,
  updateAdminBlogPost,
  type AdminBlogPost,
} from "../api/blog.api";

const surface =
  "rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)]";

type BlogSectionForm = {
  heading: string;
  body: string;
};

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-black/58">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 text-sm outline-none"
      />
    </label>
  );
}

function createEmptySection(): BlogSectionForm {
  return {
    heading: "",
    body: "",
  };
}

export default function BlogPostsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaError, setMediaError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    image: "",
    readTime: "4 min read",
    status: "draft",
    publishedAt: "",
    authorName: "CyberShop Editorial",
  });
  const [sections, setSections] = useState<BlogSectionForm[]>([createEmptySection()]);

  async function loadPosts() {
    setLoading(true);

    try {
      const response = await getAdminBlogPosts({
        page,
        limit: 10,
        search,
        status,
      });
      setPosts(response.data);
      setTotalPages(response.meta?.totalPages || 1);
      setSelectedId((current) =>
        response.data.some((item) => item.id === current) ? current : ""
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadPosts();
  }, [page, search, status]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const selectedPost = useMemo(
    () => posts.find((item) => item.id === selectedId) || null,
    [posts, selectedId]
  );

  function resetForm() {
    setSelectedId("");
    setMediaError("");
    setForm({
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      image: "",
      readTime: "4 min read",
      status: "draft",
      publishedAt: "",
      authorName: "CyberShop Editorial",
    });
    setSections([createEmptySection()]);
  }

  function handleSelect(post: AdminBlogPost) {
    setSelectedId(post.id);
    setMediaError("");
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      image: post.image,
      readTime: post.readTime,
      status: post.status,
      publishedAt: post.publishedAt ? post.publishedAt.slice(0, 10) : "",
      authorName: post.authorName,
    });
    setSections(
      post.sections.length
        ? post.sections.map((section) => ({
            heading: section.heading,
            body: section.body.join("\n\n"),
          }))
        : [createEmptySection()]
    );
  }

  async function handleImageSelection(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMediaError("");
    setUploading(true);

    try {
      const [uploadedImage] = await uploadAdminImages([file], "blog");
      setForm((current) => ({ ...current, image: uploadedImage?.url || "" }));
    } catch (error) {
      setMediaError(error instanceof Error ? error.message : "Cover upload failed");
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

  function updateSection(index: number, patch: Partial<BlogSectionForm>) {
    setSections((current) =>
      current.map((section, currentIndex) =>
        currentIndex === index ? { ...section, ...patch } : section
      )
    );
  }

  function addSection() {
    setSections((current) => [...current, createEmptySection()]);
  }

  function removeSection(indexToRemove: number) {
    setSections((current) =>
      current.length === 1 ? [createEmptySection()] : current.filter((_, index) => index !== indexToRemove)
    );
  }

  function buildPayload() {
    return {
      ...form,
      publishedAt: form.publishedAt || null,
      sections: sections
        .map((section) => ({
          heading: section.heading,
          body: section.body
            .split(/\n\s*\n/g)
            .map((item) => item.trim())
            .filter(Boolean),
        }))
        .filter((section) => section.heading && section.body.length),
    };
  }

  async function handleSave() {
    setSaving(true);

    try {
      const payload = buildPayload();

      if (selectedId) {
        await updateAdminBlogPost(selectedId, payload);
      } else {
        await createAdminBlogPost(payload);
      }

      resetForm();
      await loadPosts();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(postId: string) {
    await deleteAdminBlogPost(postId);

    if (selectedId === postId) {
      resetForm();
    }

    await loadPosts();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium text-black/45">Content</p>
          <h1 className="mt-2 text-[2.2rem] font-semibold tracking-[-0.05em] text-black">
            Journal publishing
          </h1>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#1f1f1f]"
        >
          <PlusCircle className="h-4 w-4" />
          New article
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className={surface}>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="inline-flex rounded-full bg-[#f5f5f5] p-1 text-sm">
              {(["all", "draft", "published", "archived"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatus(value)}
                  className={[
                    "rounded-full px-4 py-2 font-medium capitalize transition",
                    status === value ? "bg-white text-black shadow-sm" : "text-black/45 hover:text-black",
                  ].join(" ")}
                >
                  {value}
                </button>
              ))}
            </div>

            <label className="flex h-12 min-w-[280px] items-center gap-3 rounded-2xl bg-[#f5f5f5] px-4 text-black/35">
              <Search className="h-4 w-4" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search article"
                className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/35"
              />
            </label>
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl border border-dashed border-black/10 px-6 py-12 text-center text-sm text-black/45">
              Loading articles...
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-[24px] border border-black/8">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#f7f7f8] text-black/48">
                  <tr>
                    <th className="px-5 py-4 font-medium">Article</th>
                    <th className="px-5 py-4 font-medium">Category</th>
                    <th className="px-5 py-4 font-medium">Published</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center text-sm text-black/45">
                        No articles match the current filter.
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id} className="border-t border-black/6">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f7f8]">
                              <img
                                src={resolveAssetUrl(post.image || "/assets/images/iphone-17.png")}
                                alt={post.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-black">{post.title}</p>
                              <p className="mt-1 text-sm text-black/42">{post.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-black/65">{post.category}</td>
                        <td className="px-5 py-4 text-black/42">{post.date || "Not published"}</td>
                        <td className="px-5 py-4">
                          <span
                            className={[
                              "inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize",
                              post.status === "published"
                                ? "bg-slate-900 text-white"
                                : post.status === "archived"
                                  ? "bg-slate-100 text-slate-600"
                                  : "bg-amber-100 text-amber-700",
                            ].join(" ")}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleSelect(post)}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black hover:text-white"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(post.id)}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 text-rose-500 transition hover:bg-rose-500 hover:text-white"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page <= 1}
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-black/10 px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white disabled:opacity-40"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </button>
            <p className="text-sm text-black/45">
              Page {page} of {totalPages}
            </p>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page >= totalPages}
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-black/10 px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white disabled:opacity-40"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </section>

        <section className={surface}>
          <p className="text-sm font-medium text-black/45">
            {selectedId ? "Edit article" : "Create article"}
          </p>
          <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">
            Article editor
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
              label="Title"
              value={form.title}
              onChange={(value) => setForm((current) => ({ ...current, title: value }))}
            />
            <Field
              label="Slug"
              value={form.slug}
              onChange={(value) => setForm((current) => ({ ...current, slug: value }))}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Category"
                value={form.category}
                onChange={(value) => setForm((current) => ({ ...current, category: value }))}
              />
              <Field
                label="Read time"
                value={form.readTime}
                onChange={(value) => setForm((current) => ({ ...current, readTime: value }))}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Author"
                value={form.authorName}
                onChange={(value) => setForm((current) => ({ ...current, authorName: value }))}
              />
              <label className="block space-y-2">
                <span className="text-sm font-medium text-black/58">Status</span>
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, status: event.target.value }))
                  }
                  className="h-12 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 text-sm outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-black/58">Published date</span>
              <input
                type="date"
                value={form.publishedAt}
                onChange={(event) =>
                  setForm((current) => ({ ...current, publishedAt: event.target.value }))
                }
                className="h-12 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 text-sm outline-none"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-black/58">Excerpt</span>
              <textarea
                value={form.excerpt}
                onChange={(event) =>
                  setForm((current) => ({ ...current, excerpt: event.target.value }))
                }
                className="min-h-24 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 py-3 text-sm outline-none"
              />
            </label>

            <div className="rounded-[24px] border border-dashed border-black/12 bg-[#f7f7f8] p-4">
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-white">
                {form.image ? (
                  <img
                    src={resolveAssetUrl(form.image)}
                    alt={form.title || "Preview"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center text-black/35">
                    <ImagePlus className="mx-auto h-8 w-8" />
                    <p className="mt-3 text-sm">
                      Upload a cover image for the article hero and list card.
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
                  <XCircle className="mr-2 h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>

            {mediaError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                {mediaError}
              </div>
            ) : null}

            <div className="space-y-3 rounded-[24px] border border-black/8 bg-[#fbfbfb] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-black/45">Story sections</p>
                  <p className="mt-1 text-sm text-black/42">
                    Separate paragraphs with a blank line in each section body.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSection}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                >
                  Add section
                </button>
              </div>

              {sections.map((section, index) => (
                <div key={`section-${index}`} className="rounded-[20px] border border-black/8 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-black">Section {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-200 text-rose-500 transition hover:bg-rose-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 space-y-4">
                    <Field
                      label="Section heading"
                      value={section.heading}
                      onChange={(value) => updateSection(index, { heading: value })}
                    />
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-black/58">Section body</span>
                      <textarea
                        value={section.body}
                        onChange={(event) => updateSection(index, { body: event.target.value })}
                        className="min-h-28 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 py-3 text-sm outline-none"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#1f1f1f] disabled:opacity-60"
              >
                {saving ? "Saving..." : selectedId ? "Update Article" : "Create Article"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-black/10 px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
              >
                Reset
              </button>
            </div>

            {selectedPost ? (
              <p className="text-sm text-black/42">
                Editing: <span className="font-medium text-black">{selectedPost.title}</span>
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
