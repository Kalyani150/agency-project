
import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Eye,
  ChevronDown,
} from "lucide-react";

import { nextId } from "../../utils";

function Blogs({ blogs = [], setBlogs }) {
  // ======================================================
  // STATE
  // ======================================================

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [openFilter, setOpenFilter] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);

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

  // ======================================================
  // LOCK BACKGROUND SCROLL WHEN MODAL IS OPEN
  // ======================================================

  useEffect(() => {
    const modalOpen = showModal || Boolean(viewingBlog);

    if (!modalOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow =
        originalHtmlOverflow;
    };
  }, [showModal, viewingBlog]);

  // ======================================================
  // CATEGORY OPTIONS
  // ======================================================

  const categoryOptions = useMemo(() => {
    return [
      ...new Set(
        blogs
          .map((blog) => blog.category)
          .filter(Boolean)
      ),
    ].sort();
  }, [blogs]);

  // ======================================================
  // FILTER BLOGS
  // ======================================================

  const filteredBlogs = useMemo(() => {
    const term = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesSearch =
        !term ||
        [
          blog.title,
          blog.category,
          blog.author,
          blog.status,
          blog.excerpt,
        ]
          .join(" ")
          .toLowerCase()
          .includes(term);

      const matchesCategory =
        !categoryFilter ||
        blog.category === categoryFilter;

      const matchesStatus =
        !statusFilter ||
        blog.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    blogs,
    search,
    categoryFilter,
    statusFilter,
  ]);

  // ======================================================
  // RESET FORM
  // ======================================================

  const resetForm = () => {
    setForm({
      ...emptyForm,
    });
  };

  // ======================================================
  // OPEN ADD
  // ======================================================

  const openAdd = () => {
    setEditingBlog(null);
    resetForm();
    setOpenFilter(null);
    setShowModal(true);
  };

  // ======================================================
  // OPEN EDIT
  // ======================================================

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

    setOpenFilter(null);
    setShowModal(true);
  };

  // ======================================================
  // CLOSE ADD / EDIT MODAL
  // ======================================================

  const closeModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    resetForm();
  };

  // ======================================================
  // CLOSE VIEW MODAL
  // ======================================================

  const closeViewModal = () => {
    setViewingBlog(null);
  };

  // ======================================================
  // ALLOWED CHARACTER HELPERS
  // ======================================================

  const allowTitleCharacters = (value) => {
    return value.replace(
      /[^a-zA-Z\s.,!?'"()&:/\-]/g,
      ""
    );
  };

  const allowCategoryCharacters = (value) => {
    return value.replace(
      /[^a-zA-Z\s&/\-]/g,
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

  // ======================================================
  // PREVENT NUMBER KEYS
  // ======================================================

  const handleTextKeyDown = (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Enter",
      "Escape",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];

    if (allowedKeys.includes(e.key)) {
      return;
    }

    if (e.ctrlKey || e.metaKey) {
      return;
    }

    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // ======================================================
  // HANDLE CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    let cleanedValue = value;

    switch (name) {
      case "title":
        cleanedValue = allowTitleCharacters(value);
        break;

      case "category":
        cleanedValue = allowCategoryCharacters(value);
        break;

      case "author":
        cleanedValue = allowAuthorCharacters(value);
        break;

      case "readTime":
        cleanedValue = allowReadTimeCharacters(value);
        break;

      case "excerpt":
      case "content":
        cleanedValue = allowTextCharacters(value);
        break;

      default:
        cleanedValue = value;
    }

    setForm((previous) => ({
      ...previous,
      [name]: cleanedValue,
    }));
  };

  // ======================================================
  // SUBMIT
  // ======================================================

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
      content: form.content.trim(),
      status: form.status,
    };

    if (editingBlog) {
      setBlogs((previousBlogs) =>
        previousBlogs.map((blog) =>
          String(blog.id) === String(editingBlog.id)
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

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = (id) => {
    if (
      !window.confirm(
        "Delete this blog post?"
      )
    ) {
      return;
    }

    setBlogs((previousBlogs) =>
      previousBlogs.filter(
        (blog) =>
          String(blog.id) !== String(id)
      )
    );

    if (
      viewingBlog &&
      String(viewingBlog.id) === String(id)
    ) {
      setViewingBlog(null);
    }
  };

  // ======================================================
  // FILTER STATE
  // ======================================================

  const hasFilters =
    Boolean(search) ||
    Boolean(categoryFilter) ||
    Boolean(statusFilter);

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div
      className="w-full min-w-0 space-y-6"
      onClick={(e) => {
        if (
          !e.target.closest(
            "[data-filter-dropdown]"
          )
        ) {
          setOpenFilter(null);
        }
      }}
    >
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
          SEARCH + FILTERS
      ================================================== */}

      <div>
        <div className="grid grid-cols-1 gap-3 min-[351px]:grid-cols-2 lg:grid-cols-6">

          {/* SEARCH */}

          <div className="relative lg:col-span-4">
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
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-base"
            />
          </div>

          {/* ==================================================
              CATEGORY FILTER
          ================================================== */}

          <div
            className="relative w-full min-w-0"
            data-filter-dropdown
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                setOpenFilter(
                  openFilter === "category"
                    ? null
                    : "category"
                );
              }}
              className="flex w-full min-w-0 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-base"
            >
              <span className="min-w-0 truncate">
                {categoryFilter ||
                  "All Categories"}
              </span>

              <ChevronDown
                size={17}
                className={`ml-2 shrink-0 transition-transform ${
                  openFilter === "category"
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {openFilter === "category" && (
              <div
                className="absolute left-0 right-0 top-full z-[100] mt-2 max-h-60 overflow-y-auto overscroll-contain rounded-xl border border-slate-200 bg-white p-1 shadow-xl"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                <button
                  type="button"
                  onClick={() => {
                    setCategoryFilter("");
                    setOpenFilter(null);
                  }}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-indigo-50 hover:text-indigo-600 sm:text-base ${
                    !categoryFilter
                      ? "bg-indigo-50 font-semibold text-indigo-600"
                      : "text-slate-700"
                  }`}
                >
                  All Categories
                </button>

                {categoryOptions.length > 0 ? (
                  categoryOptions.map(
                    (category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setCategoryFilter(
                            category
                          );
                          setOpenFilter(null);
                        }}
                        className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-indigo-50 hover:text-indigo-600 sm:text-base ${
                          categoryFilter ===
                          category
                            ? "bg-indigo-50 font-semibold text-indigo-600"
                            : "text-slate-700"
                        }`}
                      >
                        <span className="block break-words">
                          {category}
                        </span>
                      </button>
                    )
                  )
                ) : (
                  <div className="px-3 py-3 text-sm text-slate-400">
                    No categories available
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ==================================================
              STATUS FILTER
          ================================================== */}

          <div
            className="relative w-full min-w-0"
            data-filter-dropdown
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                setOpenFilter(
                  openFilter === "status"
                    ? null
                    : "status"
                );
              }}
              className="flex w-full min-w-0 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-base"
            >
              <span className="min-w-0 truncate">
                {statusFilter ||
                  "All Statuses"}
              </span>

              <ChevronDown
                size={17}
                className={`ml-2 shrink-0 transition-transform ${
                  openFilter === "status"
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {openFilter === "status" && (
              <div
                className="absolute left-0 right-0 top-full z-[100] mt-2 max-h-60 overflow-y-auto overscroll-contain rounded-xl border border-slate-200 bg-white p-1 shadow-xl"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                {[
                  {
                    label: "All Statuses",
                    value: "",
                  },
                  {
                    label: "Published",
                    value: "Published",
                  },
                  {
                    label: "Draft",
                    value: "Draft",
                  },
                ].map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setStatusFilter(
                        option.value
                      );

                      setOpenFilter(null);
                    }}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-indigo-50 hover:text-indigo-600 sm:text-base ${
                      statusFilter ===
                      option.value
                        ? "bg-indigo-50 font-semibold text-indigo-600"
                        : "text-slate-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FILTER INFO */}

        {hasFilters && (
          <div className="mt-3 flex flex-col gap-2 min-[351px]:flex-row min-[351px]:items-center min-[351px]:justify-between">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredBlogs.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {blogs.length}
              </span>{" "}
              blogs
            </p>
          </div>
        )}
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
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Search
                        size={28}
                        className="mb-3 text-slate-300"
                      />

                      <p className="text-sm font-medium text-slate-600">
                        No blogs found.
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Try changing your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* BLOG */}

                    <td className="max-w-[350px] px-6 py-4">
                      <p className="truncate font-semibold text-slate-900">
                        {blog.title}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {blog.readTime || "-"}
                      </p>
                    </td>

                    {/* CATEGORY */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {blog.category || "-"}
                    </td>

                    {/* AUTHOR */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {blog.author || "-"}
                    </td>

                    {/* DATE */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {blog.date || "-"}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          blog.status ===
                          "Published"
                            ? "bg-green-50 text-green-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {blog.status || "Draft"}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            setViewingBlog(blog)
                          }
                          aria-label={`View ${blog.title}`}
                          title="View blog"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Eye size={17} />
                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            openEdit(blog)
                          }
                          aria-label={`Edit ${blog.title}`}
                          title="Edit blog"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Pencil size={17} />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(blog.id)
                          }
                          aria-label={`Delete ${blog.title}`}
                          title="Delete blog"
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
          ADD / EDIT MODAL
      ================================================== */}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-4"
          onMouseDown={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <div
            className="flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[90vh]"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >
            {/* MODAL HEADER */}

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

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="min-h-0 overflow-y-auto overscroll-contain"
            >
              <div className="space-y-5 p-4 sm:p-6">
                {/* BLOG TITLE */}

                <Input
                  label="Blog Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  onKeyDown={handleTextKeyDown}
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
                    onKeyDown={handleTextKeyDown}
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

                {/* CONTENT */}

                <Textarea
                  label="Content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={7}
                  placeholder="Enter the full blog content..."
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

              {/* MODAL FOOTER */}

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

      {/* ==================================================
          VIEW BLOG MODAL
      ================================================== */}

      {viewingBlog && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-4"
          onMouseDown={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              closeViewModal();
            }
          }}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >
            {/* VIEW HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white p-4 sm:p-6">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                  Blog Details
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  View your blog post details.
                </p>
              </div>

              <button
                type="button"
                onClick={closeViewModal}
                aria-label="Close blog details"
                className="ml-3 shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* VIEW CONTENT */}

            <div className="min-h-0 overflow-y-auto overscroll-contain">
              <div className="space-y-6 p-5 sm:p-6">
                {/* TITLE */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Title
                  </p>

                  <h3 className="mt-1 break-words text-xl font-bold text-slate-900 sm:text-2xl">
                    {viewingBlog.title ||
                      "-"}
                  </h3>
                </div>

                {/* META */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Detail
                    label="Category"
                    value={
                      viewingBlog.category
                    }
                  />

                  <Detail
                    label="Author"
                    value={
                      viewingBlog.author
                    }
                  />

                  <Detail
                    label="Date"
                    value={
                      viewingBlog.date
                    }
                  />

                  <Detail
                    label="Read Time"
                    value={
                      viewingBlog.readTime
                    }
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Status
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        viewingBlog.status ===
                        "Published"
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {viewingBlog.status ||
                        "Draft"}
                    </span>
                  </div>
                </div>

                {/* EXCERPT */}

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Excerpt
                  </p>

                  <p className="mt-1 whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    {viewingBlog.excerpt ||
                      "-"}
                  </p>
                </div>

                {/* CONTENT */}

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Content
                  </p>

                  <div className="mt-1 whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                    {viewingBlog.content ||
                      "No content available."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================================================
   DETAIL COMPONENT
====================================================== */

function Detail({
  label,
  value,
}) {
  return (
    <div className="min-w-0">
      <p className="text-sm font-semibold text-slate-700">
        {label}
      </p>

      <p className="mt-1 break-words text-sm text-slate-500">
        {value || "-"}
      </p>
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
  onKeyDown,
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
        onKeyDown={onKeyDown}
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
