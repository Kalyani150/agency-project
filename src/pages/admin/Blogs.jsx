import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { nextId } from "../../utils";

function Blogs({ blogs = [], setBlogs }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const emptyForm = {
    title: "",
    category: "",
    author: "",
    date: "",
    readTime: "",
    excerpt: "",
    content: "",
    status: "Published",
  };

  const [form, setForm] = useState(emptyForm);

  const filteredBlogs = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return blogs;

    return blogs.filter((blog) =>
      [
        blog.title,
        blog.category,
        blog.author,
        blog.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [blogs, search]);

  const resetForm = () => {
    setForm(emptyForm);
  };

  const openAdd = () => {
    setEditingBlog(null);
    resetForm();
    setShowModal(true);
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);

    setForm({
      title: blog.title || "",
      category: blog.category || "",
      author: blog.author || "",
      date: blog.date || "",
      readTime: blog.readTime || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      status: blog.status || "Published",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    resetForm();
  };

  /* ======================================================
     ALLOWED CHARACTER HELPERS
  ====================================================== */

  const allowTitleCharacters = (value) => {
    return value.replace(
      /[^a-zA-Z0-9\s.,!?'"()&:/\-]/g,
      ""
    );
  };

  const allowCategoryCharacters = (value) => {
    return value.replace(
      /[^a-zA-Z0-9\s&/\-]/g,
      ""
    );
  };

  const allowAuthorCharacters = (value) => {
    return value.replace(
      /[^a-zA-Z\s.'\-]/g,
      ""
    );
  };

  const allowReadTimeCharacters = (value) => {
    return value.replace(
      /[^a-zA-Z0-9\s]/g,
      ""
    );
  };

  const allowTextCharacters = (value) => {
    return value.replace(
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,
      ""
    );
  };

  /* ======================================================
     HANDLE CHANGE
  ====================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    let cleanedValue = value;

    switch (name) {
      case "title":
        cleanedValue =
          allowTitleCharacters(value);
        break;

      case "category":
        cleanedValue =
          allowCategoryCharacters(value);
        break;

      case "author":
        cleanedValue =
          allowAuthorCharacters(value);
        break;

      case "readTime":
        cleanedValue =
          allowReadTimeCharacters(value);
        break;

      case "excerpt":
        cleanedValue =
          allowTextCharacters(value);
        break;

      default:
        cleanedValue = value;
    }

    setForm((previous) => ({
      ...previous,
      [name]: cleanedValue,
    }));
  };

  /* ======================================================
     SUBMIT
  ====================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter a blog title.");
      return;
    }

    if (!form.category.trim()) {
      alert("Please enter a category.");
      return;
    }

    if (!form.author.trim()) {
      alert("Please enter an author.");
      return;
    }

    const cleanBlog = {
      title: form.title.trim(),
      category: form.category.trim(),
      author: form.author.trim(),
      date: form.date,
      readTime: form.readTime.trim(),
      excerpt: form.excerpt.trim(),
      status: form.status,
    };

    if (editingBlog) {
      setBlogs((previousBlogs) =>
        previousBlogs.map((blog) =>
          String(blog.id) ===
          String(editingBlog.id)
            ? {
                ...blog,
                ...cleanBlog,
              }
            : blog
        )
      );
    } else {
      setBlogs((previousBlogs) => [
        ...previousBlogs,
        {
          id: nextId(previousBlogs),
          ...cleanBlog,
        },
      ]);
    }

    closeModal();
  };

  /* ======================================================
     DELETE
  ====================================================== */

  const handleDelete = (id) => {
    if (!window.confirm("Delete this blog post?")) {
      return;
    }

    setBlogs((previousBlogs) =>
      previousBlogs.filter(
        (blog) =>
          String(blog.id) !== String(id)
      )
    );
  };

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Blogs
          </h1>

          <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
            Create and manage your blog posts.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="flex min-h-[46px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto sm:text-base"
        >
          <Plus size={18} />
          Add Blog
        </button>
      </div>

      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search blogs..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 sm:text-base"
          />
        </div>
      </div>

      {/* ==================================================
          TABLE
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Blog
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Author
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No blogs found.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="max-w-[350px] px-6 py-4">
                      <p className="truncate font-semibold text-slate-900">
                        {blog.title}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {blog.readTime || "-"}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {blog.category || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {blog.author || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {blog.date || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          blog.status === "Published"
                            ? "bg-green-50 text-green-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {blog.status || "Draft"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEdit(blog)
                          }
                          aria-label={`Edit ${blog.title}`}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(blog.id)
                          }
                          aria-label={`Delete ${blog.title}`}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================================================
          MODAL
      ================================================== */}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[90vh]">
            {/* Modal Header */}

            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 p-4 sm:p-6">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                  {editingBlog
                    ? "Edit Blog"
                    : "Add Blog"}
                </h2>

                <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                  {editingBlog
                    ? "Update your blog post details."
                    : "Create a new blog post."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="ml-3 shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* ==================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="min-h-0 overflow-y-auto"
            >
              <div className="space-y-5 p-4 sm:p-6">
                {/* BLOG TITLE */}

                <Input
                  label="Blog Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  required
                />

                {/* CATEGORY + AUTHOR + DATE + READ TIME */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Technology"
                    required
                  />

                  <Input
                    label="Author"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author name"
                    required
                  />

                  <Input
                    label="Date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                  />

                  <Input
                    label="Read Time"
                    name="readTime"
                    value={form.readTime}
                    onChange={handleChange}
                    placeholder="5 min read"
                  />
                </div>

                {/* EXCERPT */}

                <Textarea
                  label="Excerpt"
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter a short description for the blog..."
                />

                {/* STATUS */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 sm:text-base"
                  >
                    <option value="Published">
                      Published
                    </option>

                    <option value="Draft">
                      Draft
                    </option>
                  </select>
                </div>
              </div>

              {/* ==================================================
                  MODAL FOOTER
              ================================================== */}

              <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-slate-200 bg-white p-4 sm:flex-row sm:justify-end sm:p-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto sm:text-base"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto sm:text-base"
                >
                  {editingBlog
                    ? "Update Blog"
                    : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================================================
   INPUT COMPONENT
====================================================== */

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:text-base"
      />
    </div>
  );
}

/* ======================================================
   TEXTAREA COMPONENT
====================================================== */

function Textarea({
  label,
  name,
  value,
  onChange,
  rows = 4,
  placeholder,
  required = false,
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:text-base"
      />
    </div>
  );
}

export default Blogs;