import { useMemo, useState } from "react";
import { MoreHorizontal, PlusCircle, Search, Trash2 } from "lucide-react";
import { resolveAssetUrl } from "@/utils/assets";

type BlogPostSection = {
  heading: string;
  body: string[];
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
  sections: BlogPostSection[];
};

/* =========================
   SAMPLE DATA
========================= */

const blogPostsData: BlogPost[] = [
  {
    slug: "device-ai-everyday-utility",
    category: "AI Devices",
    title:
      "Why device AI is shifting from headline feature to everyday utility",
    excerpt:
      "The most interesting change is not louder marketing. It is the move toward practical, embedded intelligence inside familiar hardware.",
    date: "March 11, 2026",
    image: "/assets/images/iphone-14-front.png",
    readTime: "5 min read",
    sections: [],
  },
  {
    slug: "premium-laptop-story-2026",
    category: "Computing",
    title:
      "The premium laptop story now includes battery, silence, and on-device AI",
    excerpt:
      "Thin machines are no longer judged on weight alone. Battery and AI now matter.",
    date: "March 8, 2026",
    image: "/assets/images/macbook-air-main.png",
    readTime: "4 min read",
    sections: [],
  },
  {
    slug: "wearable-audio-more-ambient",
    category: "Audio",
    title: "Wearable audio is becoming less visible and more ambient",
    excerpt: "People increasingly want devices that disappear into routine.",
    date: "March 4, 2026",
    image: "/assets/images/airpods-max-silver.png",
    readTime: "4 min read",
    sections: [],
  },
];

const surface =
  "rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)]";

/* =========================
   PAGE
========================= */

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPostsData);

  const [search, setSearch] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    image: "",
    date: "",
    readTime: "",
  });

  const filteredPosts = useMemo(
    () =>
      posts.filter((item) =>
        `${item.title} ${item.category}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [posts, search],
  );

  function resetForm() {
    setSelectedSlug("");

    setForm({
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      image: "",
      date: "",
      readTime: "",
    });
  }

  function handleSelect(post: BlogPost) {
    setSelectedSlug(post.slug);

    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      image: post.image,
      date: post.date,
      readTime: post.readTime,
    });
  }

  function handleDelete(slug: string) {
    setPosts((prev) => prev.filter((p) => p.slug !== slug));

    if (selectedSlug === slug) resetForm();
  }

  function handleSubmit() {
    if (selectedSlug) {
      setPosts((prev) =>
        prev.map((p) => (p.slug === selectedSlug ? { ...p, ...form } : p)),
      );
    } else {
      setPosts((prev) => [...prev, { ...form, sections: [] }]);
    }

    resetForm();
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-black/45">Content</p>
          <h1 className="text-[2.2rem] font-semibold">Blog list</h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetForm}
            className="flex h-11 items-center gap-2 rounded-full bg-black px-5 text-white"
          >
            <PlusCircle size={16} />
            Add Blog
          </button>

          <button className="flex h-11 items-center gap-2 rounded-full border px-5">
            More Action
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* SEARCH */}

      {/* TABLE */}
      <div className="flex gap-6 items-start">
        <section className={`${surface} border border-black/8 flex-1`}>
          <label className="mb-6 flex h-12 w-[30%] items-center gap-3 rounded-2xl bg-[#f5f5f5] px-4">
            <Search size={16} />

            <input
              placeholder="Search blog"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </label>
          <table className="min-w-full text-sm">
            <thead className="bg-[#f7f7f8] text-black/50">
              <tr>
                <th className="px-5 py-4">Post</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Read</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.slug} className="border-t border-black/6">
                  <td className="px-5 py-4 flex gap-3">
                    <img
                      src={resolveAssetUrl(post.image)}
                      className="h-12 w-12 rounded-xl object-cover"
                    />

                    <div>
                      <p className="font-semibold">{post.title}</p>
                      <p className="text-black/40 text-sm">{post.excerpt}</p>
                    </div>
                  </td>

                  <td className="px-5 py-4">{post.category}</td>

                  <td className="px-5 py-4">{post.date}</td>

                  <td className="px-5 py-4">{post.readTime}</td>

                  <td className="px-5 py-4 flex gap-2">
                    <button
                      onClick={() => handleSelect(post)}
                      className="px-4 h-9 border border-black/10 rounded-full hover:bg-black hover:text-white transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="px-4 h-9 border border-black/10 rounded-full hover:bg-black hover:text-white transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* FORM */}

        <section className={`${surface} w-[420px]`}>
          <h2 className="text-xl font-semibold">
            {selectedSlug ? "Edit Blog" : "Create Blog"}
          </h2>

          <div className="mt-4 space-y-4">
            <Field
              label="Title"
              value={form.title}
              onChange={(v) => setForm({ ...form, title: v })}
            />

            <Field
              label="Slug"
              value={form.slug}
              onChange={(v) => setForm({ ...form, slug: v })}
            />

            <Field
              label="Category"
              value={form.category}
              onChange={(v) => setForm({ ...form, category: v })}
            />

            <Field
              label="Image"
              value={form.image}
              onChange={(v) => setForm({ ...form, image: v })}
            />

            <Field
              label="Date"
              value={form.date}
              onChange={(v) => setForm({ ...form, date: v })}
            />

            <Field
              label="Read Time"
              value={form.readTime}
              onChange={(v) => setForm({ ...form, readTime: v })}
            />

            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full rounded-xl border border-black/10 bg-[#f7f7f8] p-3 outline-none"
              placeholder="Excerpt"
            />

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 h-12 bg-black text-white rounded-xl"
              >
                {selectedSlug ? "Update" : "Create"}
              </button>

              <button
                onClick={resetForm}
                className="h-12 px-6 border border-black/10 rounded-xl hover:bg-black hover:text-white transition"
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
      <span className="text-sm text-black/60">{label}</span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-black/10 bg-[#f7f7f8] px-4 outline-none"
      />
    </label>
  );
}
