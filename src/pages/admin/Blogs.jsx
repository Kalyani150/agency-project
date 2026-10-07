import { useEffect, useMemo, useRef, useState } from "react";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  ImagePlus,
  ChevronDown,
} from "lucide-react";

import { nextId } from "../../utils";

// ======================================================
// CONSTANTS
// ======================================================

const MAX_FILE_BYTES = 10 * 1024 * 1024;

const EMPTY_FORM = {
  title: "",
  category: "",
  author: "",
  date: "",
  readTime: "",
  excerpt: "",
  longDescription: "",
  image: "",
  status: "Draft",
};

// ======================================================
// BLOGS
// ======================================================

function Blogs({ blogs = [], setBlogs }) {
  // ======================================================
  // STATES
  // ======================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);

  const [editingBlog, setEditingBlog] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");

  const fileInputRef = useRef(null);

  // ======================================================
  // BODY SCROLL LOCK WHEN MODAL IS OPEN
  // ======================================================

  useEffect(() => {
    const isModalOpen = showForm || showView;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showForm, showView]);

  // ======================================================
  // CATEGORIES
  // ======================================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        blogs
          .map((blog) => blog.category)
          .filter(Boolean)
      ),
    ];

    return uniqueCategories;
  }, [blogs]);

  // ======================================================
  // FILTER BLOGS
  // ======================================================

  const filteredBlogs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesSearch =
        !searchValue ||
        blog.title?.toLowerCase().includes(searchValue) ||
        blog.category?.toLowerCase().includes(searchValue) ||
        blog.author?.toLowerCase().includes(searchValue) ||
        blog.shortDescription
          ?.toLowerCase()
          .includes(searchValue) ||
        blog.excerpt?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        blog.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        blog.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    blogs,
    search,
    statusFilter,
    categoryFilter,
  ]);

  // ======================================================
  // ADD BLOG
  // ======================================================

  const handleAdd = () => {
    const today = new Date().toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

    setEditingBlog(null);

    setFormData({
      ...EMPTY_FORM,
      date: today,
    });

    setImagePreview("");
    setImageError("");
    setShowForm(true);
  };

  // ======================================================
  // EDIT BLOG
  // ======================================================

  const handleEdit = (blog) => {
    setEditingBlog(blog);

    setFormData({
      title: blog.title || "",
      category: blog.category || "",
      author: blog.author || "",
      date: blog.date || "",
      readTime: blog.readTime || "",
      excerpt:
        blog.excerpt ||
        blog.shortDescription ||
        "",
      longDescription:
        blog.longDescription ||
        blog.content ||
        "",
      image: blog.image || "",
      status: blog.status || "Draft",
    });

    setImagePreview(blog.image || "");
    setImageError("");
    setShowForm(true);
  };

  // ======================================================
  // VIEW BLOG
  // ======================================================

  const handleView = (blog) => {
    setViewingBlog(blog);
    setShowView(true);
  };

  // ======================================================
  // DELETE BLOG
  // ======================================================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => blog.id !== id)
    );
  };

  // ======================================================
  // FORM CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================================================
  // IMAGE UPLOAD
  // ======================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      setImageError("Image size must be less than 10MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;

      setImagePreview(result);

      setFormData((prev) => ({
        ...prev,
        image: result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // ======================================================
  // REMOVE IMAGE
  // ======================================================

  const handleRemoveImage = () => {
    setImagePreview("");

    setFormData((prev) => ({
      ...prev,
      image: "",
    }));

    setImageError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ======================================================
  // CLOSE FORM
  // ======================================================

  const closeForm = () => {
    setShowForm(false);
    setEditingBlog(null);
    setFormData(EMPTY_FORM);
    setImagePreview("");
    setImageError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ======================================================
  // CLOSE VIEW
  // ======================================================

  const closeView = () => {
    setShowView(false);
    setViewingBlog(null);
  };

  // ======================================================
  // OVERLAY CLICK
  // ======================================================

  const handleFormOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeForm();
    }
  };

  const handleViewOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeView();
    }
  };

  // ======================================================
  // SUBMIT FORM
  // ======================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter blog title.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please enter category.");
      return;
    }

    if (!formData.author.trim()) {
      alert("Please enter author.");
      return;
    }

    if (!formData.excerpt.trim()) {
      alert("Please enter short description.");
      return;
    }

    if (!formData.longDescription.trim()) {
      alert("Please enter long description.");
      return;
    }

    const cleanedBlog = {
      ...(editingBlog || {}),

      id: editingBlog?.id || nextId(blogs),

      title: formData.title.trim(),

      category: formData.category.trim(),

      author: formData.author.trim(),

      date: formData.date.trim(),

      readTime: formData.readTime.trim(),

      shortDescription:
        formData.excerpt.trim(),

      excerpt:
        formData.excerpt.trim(),

      longDescription:
        formData.longDescription.trim(),

      image: formData.image || "",

      status: formData.status,
    };

    if (editingBlog) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === editingBlog.id
            ? cleanedBlog
            : blog
        )
      );
    } else {
      setBlogs((prevBlogs) => [
        cleanedBlog,
        ...prevBlogs,
      ]);
    }

    closeForm();
  };

  // ======================================================
  // STATUS STYLE
  // ======================================================

  const getStatusClass = (status) => {
    if (status === "Published") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (status === "Archived") {
      return "bg-slate-100 text-slate-600";
    }

    return "bg-amber-50 text-amber-700";
  };

  // ======================================================
  // EMPTY STATE
  // ======================================================

  const hasBlogs = filteredBlogs.length > 0;

  // ======================================================
  // JSX
  // ======================================================

  return (
    <div>

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-5 flex w-full min-w-0 flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
            Blogs
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Manage your blog articles and content.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] sm:w-auto"
        >
          <Plus size={18} />
          Add Blog
        </button>
      </div>

      {/* ==================================================
    FILTERS
================================================== */}

<div className="mb-5">

  <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center">

    {/* SEARCH */}

    <div className="relative w-full min-w-0 lg:flex-1">
      <Search
        size={17}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search blogs..."
        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>

    {/* STATUS + CATEGORY */}

    <div className="grid w-full grid-cols-1 gap-3 min-[350px]:grid-cols-2 lg:flex lg:w-auto">

      {/* STATUS */}

      <div className="relative min-w-0 lg:w-44">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-xs text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:text-sm"
        >
          <option value="All">
            All Status
          </option>

          <option value="Published">
            Published
          </option>

          <option value="Draft">
            Draft
          </option>

          <option value="Archived">
            Archived
          </option>
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>

      {/* CATEGORY */}

      <div className="relative min-w-0 lg:w-48">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-xs text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:text-sm"
        >
          <option value="All">
            All Categories
          </option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>

    </div>
  </div>
</div>

      {/* ==================================================
          DESKTOP TABLE
      ================================================== */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">

        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                {/* IMAGE */}

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Image
                </th>

                {/* BLOG COLUMN REMOVED */}

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Author
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {hasBlogs ? (
                filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70"
                  >

                    {/* IMAGE */}

                    <td className="px-5 py-4">
                      <div className="h-14 w-20 overflow-hidden rounded-lg bg-slate-100">

                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ImagePlus
                              size={20}
                              className="text-slate-400"
                            />
                          </div>
                        )}

                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                        {blog.category || "-"}
                      </span>
                    </td>

                    {/* AUTHOR */}

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {blog.author || "-"}
                    </td>

                    {/* DATE */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {blog.date || "-"}
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          blog.status
                        )}`}
                      >
                        {blog.status || "Draft"}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleView(blog)
                          }
                          title="View"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(blog)
                          }
                          title="Edit"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(blog.id)
                          }
                          title="Delete"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">

                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <Search
                          size={21}
                          className="text-slate-400"
                        />
                      </div>

                      <h3 className="text-sm font-semibold text-slate-700">
                        No blogs found
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Try changing your search or filters.
                      </p>

                    </div>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* ==================================================
          MOBILE BLOG CARDS
      ================================================== */}

      <div className="space-y-3 lg:hidden">

        {hasBlogs ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm min-[350px]:p-4"
            >

              {/* TOP CONTENT */}

              <div className="flex min-w-0 gap-3">

                {/* IMAGE */}

                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 min-[350px]:h-20 min-[350px]:w-24">

                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImagePlus
                        size={19}
                        className="text-slate-400"
                      />
                    </div>
                  )}

                </div>

                {/* CONTENT */}

                <div className="min-w-0 flex-1">

                  <div className="flex min-w-0 items-start justify-between gap-2">

                    <h3 className="min-w-0 flex-1 break-words text-sm font-semibold leading-5 text-slate-900 min-[350px]:text-base">
                      {blog.title || "Untitled Blog"}
                    </h3>

                    <span
                      className={`max-w-[75px] shrink-0 rounded-full px-2 py-1 text-center text-[9px] font-semibold leading-3 min-[350px]:max-w-[85px] min-[350px]:text-[10px] ${getStatusClass(
                        blog.status
                      )}`}
                    >
                      {blog.status || "Draft"}
                    </span>

                  </div>

                  <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-slate-500 min-[350px]:text-xs">

                    <span className="max-w-full truncate">
                      {blog.category || "No category"}
                    </span>

                    <span className="text-slate-300">
                      •
                    </span>

                    <span className="max-w-full truncate">
                      {blog.author || "Unknown author"}
                    </span>

                  </div>

                  <p className="mt-2 line-clamp-2 break-words text-[11px] leading-4 text-slate-500 min-[350px]:text-xs">
                    {blog.shortDescription ||
                      blog.excerpt ||
                      "No description available."}
                  </p>

                </div>
              </div>

              {/* DATE */}

              <div className="mt-3 border-t border-slate-100 pt-3 text-[10px] text-slate-400 min-[350px]:text-xs">
                {blog.date || "No date"}
                {blog.readTime
                  ? ` • ${blog.readTime}`
                  : ""}
              </div>

              {/* ACTIONS */}


  <div className="flex justify-end gap-2">

    {/* VIEW */}

    <button
      type="button"
      onClick={() => handleView(blog)}
      title="View"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
    >
      <Eye size={17} />
    </button>

    {/* EDIT */}

    <button
      type="button"
      onClick={() => handleEdit(blog)}
      title="Edit"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
    >
      <Pencil size={17} />
    </button>

    {/* DELETE */}

    <button
      type="button"
      onClick={() => handleDelete(blog.id)}
      title="Delete"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600"
    >
      <Trash2 size={17} />
    </button>

  </div>

            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-12 text-center shadow-sm">

            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <Search
                size={21}
                className="text-slate-400"
              />
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
              No blogs found
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Try changing your search or filters.
            </p>

          </div>
        )}

      </div>

      {/* ==================================================
          ADD / EDIT MODAL
      ================================================== */}

      {showForm && (
        <div
          onMouseDown={handleFormOverlayClick}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-slate-900/60 p-2 sm:items-center sm:p-5"
        >

          <div className="my-2 flex max-h-[96dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:my-auto">

            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">

              <div className="min-w-0 pr-3">
                <h2 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                  {editingBlog
                    ? "Edit Blog"
                    : "Add Blog"}
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  {editingBlog
                    ? "Update blog information."
                    : "Create a new blog article."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">

                <div className="space-y-5">

                  {/* TITLE */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Blog Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter blog title"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* CATEGORY + AUTHOR */}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Category
                      </label>

                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="e.g. Technology"
                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Author
                      </label>

                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Enter author name"
                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                  </div>

                  {/* DATE + READ TIME + STATUS */}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Date
                      </label>

                      <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="October 7, 2026"
                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Read Time
                      </label>

                      <input
                        type="text"
                        name="readTime"
                        value={formData.readTime}
                        onChange={handleChange}
                        placeholder="5 min read"
                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Status
                      </label>

                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="h-11 w-full rounded-xl cursor-pointer border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      >
                        <option value="Draft">
                          Draft
                        </option>

                        <option value="Published">
                          Published
                        </option>

                        <option value="Archived">
                          Archived
                        </option>
                      </select>
                    </div>

                  </div>

                  {/* IMAGE */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Blog Image
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    {imagePreview ? (
                      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                        <img
                          src={imagePreview}
                          alt="Blog preview"
                          className="h-48 w-full object-contain sm:h-64 lg:h-72"
                        />

                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/95 text-red-500 shadow-md transition hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        className="flex min-h-36 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center transition hover:border-indigo-300 hover:bg-indigo-50/30"
                      >
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50">
                          <ImagePlus
                            size={21}
                            className="text-indigo-600"
                          />
                        </div>

                        <span className="text-sm font-semibold text-slate-700">
                          Click to upload image
                        </span>

                        <span className="mt-1 text-xs text-slate-400">
                          JPG, PNG, WEBP up to 10MB
                        </span>
                      </button>
                    )}

                    {imageError && (
                      <p className="mt-2 text-xs font-medium text-red-500">
                        {imageError}
                      </p>
                    )}
                  </div>

                  {/* SHORT DESCRIPTION */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Short Description
                    </label>

                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Enter a short description..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* LONG DESCRIPTION */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Long Description
                    </label>

                    <textarea
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleChange}
                      rows={8}
                      placeholder="Write the full blog content..."
                      className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                </div>
              </div>

              {/* FORM FOOTER */}

              <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-white p-4 sm:flex-row sm:justify-end sm:px-6">

                <button
                  type="button"
                  onClick={closeForm}
                  className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
                >
                  {editingBlog
                    ? "Update Blog"
                    : "Add Blog"}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================
          VIEW BLOG MODAL
      ================================================== */}

      {showView && viewingBlog && (
        <div
          onMouseDown={handleViewOverlayClick}
          className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto overscroll-contain bg-slate-900/60 p-2 sm:items-center sm:p-5"
        >

          <div className="my-2 flex max-h-[96dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:my-auto">

            {/* HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">

              <div className="min-w-0 pr-3">
                <h2 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                  Blog Details
                </h2>
              </div>

              <button
                type="button"
                onClick={closeView}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* CONTENT */}

            <div className="overflow-y-auto">

              {/* IMAGE */}

              {viewingBlog.image && (
                <div className="bg-slate-100">

                  <img
                    src={viewingBlog.image}
                    alt={viewingBlog.title}
                    className="h-48 w-full object-contain sm:h-72 lg:h-96"
                  />

                </div>
              )}

              {/* BLOG DETAILS */}

              <div className="p-4 sm:p-6 lg:p-8">

                <div className="mb-4 flex flex-wrap items-center gap-2">

                  <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                    {viewingBlog.category ||
                      "Uncategorized"}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                      viewingBlog.status
                    )}`}
                  >
                    {viewingBlog.status ||
                      "Draft"}
                  </span>

                </div>

                <h1 className="break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                  {viewingBlog.title ||
                    "Untitled Blog"}
                </h1>

                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 sm:text-sm">

                  <span>
                    By{" "}
                    <span className="font-medium text-slate-700">
                      {viewingBlog.author ||
                        "Unknown"}
                    </span>
                  </span>

                  <span className="text-slate-300">
                    •
                  </span>

                  <span>
                    {viewingBlog.date ||
                      "No date"}
                  </span>

                  {viewingBlog.readTime && (
                    <>
                      <span className="text-slate-300">
                        •
                      </span>

                      <span>
                        {viewingBlog.readTime}
                      </span>
                    </>
                  )}

                </div>

                {/* EXCERPT */}

                {(viewingBlog.excerpt ||
                  viewingBlog.shortDescription) && (
                  <div className="mt-6 rounded-xl bg-slate-50 p-4 sm:p-5">

                    <p className="break-words text-sm font-medium leading-6 text-slate-700 sm:text-base">
                      {viewingBlog.excerpt ||
                        viewingBlog.shortDescription}
                    </p>

                  </div>
                )}

                {/* LONG DESCRIPTION */}

                {viewingBlog.longDescription && (
                  <div className="mt-6">

                    <h3 className="mb-3 text-base font-bold text-slate-900">
                      Content
                    </h3>

                    <div className="whitespace-pre-line break-words text-sm leading-7 text-slate-600 sm:text-base">
                      {viewingBlog.longDescription}
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* FOOTER */}

            <div className="flex shrink-0 justify-end border-t border-slate-200 bg-white p-4 sm:px-6">

              

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Blogs;