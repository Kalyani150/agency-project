import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
// BLOGS ADMIN
// ======================================================

function Blogs({
  blogs = [],
  setBlogs,
}) {
  // ====================================================
  // STATES
  // ====================================================

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [showForm, setShowForm] =
    useState(false);

  const [showView, setShowView] =
    useState(false);

  const [editingBlog, setEditingBlog] =
    useState(null);

  const [viewingBlog, setViewingBlog] =
    useState(null);

  const [formData, setFormData] =
    useState(EMPTY_FORM);

  const [imagePreview, setImagePreview] =
    useState("");

  const [imageError, setImageError] =
    useState("");

  const fileInputRef = useRef(null);

  // ====================================================
  // LOCK BACKGROUND SCROLL WHEN MODAL IS OPEN
  // ====================================================

  useEffect(() => {
    const modalOpen =
      showForm || showView;

    if (!modalOpen) {
      return;
    }

    const previousBodyOverflow =
      document.body.style.overflow;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";

    document.documentElement.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      document.documentElement.style.overflow =
        previousHtmlOverflow;
    };
  }, [showForm, showView]);

  // ====================================================
  // CATEGORIES
  // ====================================================

  const categories = useMemo(() => {
    return [
      ...new Set(
        blogs
          .map((blog) => blog.category)
          .filter(Boolean)
      ),
    ];
  }, [blogs]);

  // ====================================================
  // FILTER BLOGS
  // ====================================================

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        blog.title
          ?.toLowerCase()
          .includes(searchValue) ||
        blog.category
          ?.toLowerCase()
          .includes(searchValue) ||
        blog.author
          ?.toLowerCase()
          .includes(searchValue);

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

  // ====================================================
  // OPEN ADD FORM
  // ====================================================

  const handleAdd = () => {
    setEditingBlog(null);

    setFormData({
      ...EMPTY_FORM,

      date: new Date().toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      ),
    });

    setImagePreview("");
    setImageError("");

    setShowView(false);
    setViewingBlog(null);

    setShowForm(true);
  };

  // ====================================================
  // OPEN EDIT FORM
  // ====================================================

  const handleEdit = (blog) => {
    setEditingBlog(blog);

    setFormData({
      title: blog.title || "",

      category:
        blog.category || "",

      author:
        blog.author || "",

      date:
        blog.date || "",

      readTime:
        blog.readTime || "",

      excerpt:
        blog.shortDescription ||
        blog.excerpt ||
        "",

      longDescription:
        blog.longDescription ||
        blog.content ||
        "",

      image:
        blog.image || "",

      status:
        blog.status || "Draft",
    });

    setImagePreview(
      blog.image || ""
    );

    setImageError("");

    setShowView(false);
    setViewingBlog(null);

    setShowForm(true);
  };

  // ====================================================
  // VIEW BLOG
  // ====================================================

  const handleView = (blog) => {
    setViewingBlog(blog);

    setShowForm(false);
    setEditingBlog(null);

    setShowView(true);
  };

  // ====================================================
  // DELETE BLOG
  // ====================================================

  const handleDelete = (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this blog?"
      );

    if (!confirmed) {
      return;
    }

    setBlogs((currentBlogs) =>
      currentBlogs.filter(
        (blog) =>
          String(blog.id) !==
          String(id)
      )
    );
  };

  // ====================================================
  // FORM CHANGE
  // ====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ====================================================
  // IMAGE UPLOAD
  // ====================================================

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    setImageError("");

    // File size validation
    if (
      file.size >
      MAX_FILE_BYTES
    ) {
      setImageError(
        "Image size must be less than 10MB."
      );

      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }

      return;
    }

    // File type validation
    if (
      !file.type.startsWith("image/")
    ) {
      setImageError(
        "Please select a valid image file."
      );

      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }

      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      const result =
        reader.result;

      setImagePreview(result);

      setFormData(
        (previous) => ({
          ...previous,
          image: result,
        })
      );
    };

    reader.readAsDataURL(file);
  };

  // ====================================================
  // REMOVE IMAGE
  // ====================================================

  const handleRemoveImage = () => {
    setImagePreview("");

    setFormData(
      (previous) => ({
        ...previous,
        image: "",
      })
    );

    setImageError("");

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

  // ====================================================
  // CLOSE FORM
  // ====================================================

  const closeForm = () => {
    setShowForm(false);

    setEditingBlog(null);

    setFormData({
      ...EMPTY_FORM,
    });

    setImagePreview("");

    setImageError("");

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

  // ====================================================
  // CLOSE VIEW
  // ====================================================

  const closeView = () => {
    setShowView(false);

    setViewingBlog(null);
  };

  // ====================================================
  // CLICK OUTSIDE FORM
  // ====================================================

  const handleFormOverlayClick = (e) => {
    if (
      e.target ===
      e.currentTarget
    ) {
      closeForm();
    }
  };

  // ====================================================
  // CLICK OUTSIDE VIEW
  // ====================================================

  const handleViewOverlayClick = (e) => {
    if (
      e.target ===
      e.currentTarget
    ) {
      closeView();
    }
  };

  // ====================================================
  // SUBMIT
  // ====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      alert(
        "Please enter blog title."
      );
      return;
    }

    if (!formData.category.trim()) {
      alert(
        "Please enter blog category."
      );
      return;
    }

    if (!formData.author.trim()) {
      alert(
        "Please enter author name."
      );
      return;
    }

    if (!formData.excerpt.trim()) {
      alert(
        "Please enter short description."
      );
      return;
    }

    if (
      !formData.longDescription.trim()
    ) {
      alert(
        "Please enter long description."
      );
      return;
    }

    // ==================================================
    // CLEAN BLOG
    // ==================================================

    const cleanedBlog = {
      ...(editingBlog || {}),

      id:
        editingBlog?.id ??
        nextId(blogs),

      title:
        formData.title.trim(),

      category:
        formData.category.trim(),

      author:
        formData.author.trim(),

      date:
        formData.date.trim(),

      readTime:
        formData.readTime.trim(),

      shortDescription:
        formData.excerpt.trim(),

      excerpt:
        formData.excerpt.trim(),

      longDescription:
        formData.longDescription.trim(),

      image:
        formData.image || "",

      status:
        formData.status,
    };

    // ==================================================
    // UPDATE BLOG
    // ==================================================

    if (editingBlog) {
      setBlogs(
        (currentBlogs) =>
          currentBlogs.map(
            (blog) =>
              String(blog.id) ===
              String(
                editingBlog.id
              )
                ? cleanedBlog
                : blog
          )
      );
    }

    // ==================================================
    // ADD BLOG
    // ==================================================

    else {
      setBlogs(
        (currentBlogs) => [
          cleanedBlog,
          ...currentBlogs,
        ]
      );
    }

    closeForm();
  };

  // ====================================================
  // STATUS CLASS
  // ====================================================

  const getStatusClass = (status) => {
    if (status === "Published") {
      return "bg-emerald-50 text-emerald-600";
    }

    if (status === "Archived") {
      return "bg-slate-100 text-slate-600";
    }

    return "bg-amber-50 text-amber-600";
  };

  // ====================================================
  // UI
  // ====================================================

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 p-3 sm:p-6 lg:p-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">

          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
            Blogs
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Manage your website blogs and articles.
          </p>

        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 sm:w-auto"
        >
          <Plus size={18} />

          Add Blog
        </button>

      </div>

      {/* ==================================================
          FILTERS
      ================================================== */}

      <div className="mb-5 overflow-hidden rounded-2xl bg-white p-2.5 shadow-sm sm:mb-6 sm:p-4">

        <div className="scrollbar-hide flex w-full items-center gap-2 overflow-x-auto pb-1 sm:gap-3">

          {/* SEARCH */}

          <div className="relative min-w-[145px] flex-1 sm:min-w-0">

            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:h-11 sm:text-sm"
            />

          </div>

          {/* STATUS */}

          <div className="relative w-[105px] shrink-0 sm:w-[160px]">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-2.5 py-2 pr-7 text-[11px] font-medium text-slate-700 outline-none focus:border-indigo-500 sm:h-11 sm:px-4 sm:pr-9 sm:text-sm"
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
              size={14}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 sm:right-3"
            />

          </div>

          {/* CATEGORY */}

          <div className="relative w-[115px] shrink-0 sm:w-[180px]">

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
              className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-2.5 py-2 pr-7 text-[11px] font-medium text-slate-700 outline-none focus:border-indigo-500 sm:h-11 sm:px-4 sm:pr-9 sm:text-sm"
            >

              <option value="All">
                All Categories
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}

            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 sm:right-3"
            />

          </div>

        </div>

      </div>

      {/* ==================================================
          BLOG TABLE / MOBILE CARDS
      ================================================== */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        {/* ==================================================
            DESKTOP TABLE
        ================================================== */}

        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full min-w-[1000px]">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Image
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Blog
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Author
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredBlogs.map(
                (blog) => (
                  <tr
                    key={blog.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* IMAGE */}

                    <td className="px-5 py-4">

                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={
                            blog.title
                          }
                          className="h-14 w-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-100">
                          <ImagePlus
                            size={20}
                            className="text-slate-400"
                          />
                        </div>
                      )}

                    </td>

                    {/* BLOG */}

                    <td className="max-w-[280px] px-5 py-4">

                      <p className="font-bold text-slate-900">
                        {blog.title}
                      </p>

                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                        {blog.shortDescription ||
                          blog.excerpt}
                      </p>

                    </td>

                    {/* CATEGORY */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {blog.category ||
                        "-"}
                    </td>

                    {/* AUTHOR */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {blog.author ||
                        "-"}
                    </td>

                    {/* DATE */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {blog.date ||
                        "-"}
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                          blog.status
                        )}`}
                      >
                        {blog.status ||
                          "Draft"}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleView(
                              blog
                            )
                          }
                          className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                          title="View"
                        >
                          <Eye
                            size={17}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              blog
                            )
                          }
                          className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                          title="Edit"
                        >
                          <Pencil
                            size={17}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              blog.id
                            )
                          }
                          className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2
                            size={17}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

              {filteredBlogs.length ===
                0 && (
                <tr>

                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No blogs found.
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* ==================================================
            MOBILE BLOG CARDS
        ================================================== */}

        <div className="divide-y divide-slate-100 lg:hidden">

          {filteredBlogs.map(
            (blog) => (
              <div
                key={blog.id}
                className="p-3 sm:p-4"
              >

                <div className="flex gap-3">

                  {/* IMAGE */}

                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={
                        blog.title
                      }
                      className="h-20 w-24 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                      <ImagePlus
                        size={20}
                        className="text-slate-400"
                      />
                    </div>
                  )}

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <h3 className="line-clamp-2 min-w-0 text-sm font-bold leading-5 text-slate-900">
                        {blog.title}
                      </h3>

                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${getStatusClass(
                          blog.status
                        )}`}
                      >
                        {blog.status ||
                          "Draft"}
                      </span>

                    </div>

                    <p className="mt-1 truncate text-[11px] text-slate-500">

                      {blog.category ||
                        "-"}

                      {blog.author
                        ? ` • ${blog.author}`
                        : ""}

                    </p>

                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-slate-500">

                      {blog.shortDescription ||
                        blog.excerpt ||
                        "No description"}

                    </p>

                  </div>

                </div>

                {/* MOBILE ACTIONS */}

                <div className="mt-3 grid grid-cols-3 gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      handleView(
                        blog
                      )
                    }
                    className="cursor-pointer rounded-lg bg-slate-100 px-2 py-2 text-xs font-bold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Eye
                      size={14}
                      className="mr-1 inline"
                    />

                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(
                        blog
                      )
                    }
                    className="cursor-pointer rounded-lg bg-slate-100 px-2 py-2 text-xs font-bold text-slate-600 transition hover:bg-amber-50 hover:text-amber-600"
                  >
                    <Pencil
                      size={14}
                      className="mr-1 inline"
                    />

                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        blog.id
                      )
                    }
                    className="cursor-pointer rounded-lg bg-slate-100 px-2 py-2 text-xs font-bold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2
                      size={14}
                      className="mr-1 inline"
                    />

                    Delete
                  </button>

                </div>

              </div>
            )
          )}

          {filteredBlogs.length ===
            0 && (
            <div className="p-10 text-center text-sm text-slate-500">
              No blogs found.
            </div>
          )}

        </div>

      </div>

      {/* ==================================================
          ADD / EDIT MODAL
      ================================================== */}

      {showForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overscroll-contain bg-slate-900/60 p-2 sm:p-5"
          onMouseDown={
            handleFormOverlayClick
          }
        >

          <div
            className="my-auto flex max-h-[96vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4">

              <div className="min-w-0">

                <h2 className="truncate text-lg font-black text-slate-900 sm:text-xl">
                  {editingBlog
                    ? "Edit Blog"
                    : "Add Blog"}
                </h2>

                <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                  Add complete blog information.
                </p>

              </div>

              <button
                type="button"
                onClick={closeForm}
                className="ml-3 shrink-0 cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >

              <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">

                {/* TITLE */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Blog Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={
                      formData.title
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter blog title"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                </div>

                {/* CATEGORY + AUTHOR */}

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Category
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={
                        formData.category
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Web Development"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Author
                    </label>

                    <input
                      type="text"
                      name="author"
                      value={
                        formData.author
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Author name"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                </div>

                {/* DATE + READ TIME + STATUS */}

                <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Date
                    </label>

                    <input
                      type="text"
                      name="date"
                      value={
                        formData.date
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="September 20, 2026"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Read Time
                    </label>

                    <input
                      type="text"
                      name="readTime"
                      value={
                        formData.readTime
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="5 min read"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Status
                    </label>

                    <select
                      name="status"
                      value={
                        formData.status
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >

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

                  </div>

                </div>

                {/* IMAGE */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Blog Image
                  </label>

                  {imagePreview ? (
                    <div className="relative overflow-hidden rounded-xl border border-slate-200">

                      <img
                        src={
                          imagePreview
                        }
                        alt="Preview"
                        className="h-48 w-full object-cover bg-slate-50 sm:h-64 md:h-72"
                      />

                      <button
                        type="button"
                        onClick={
                          handleRemoveImage
                        }
                        className="absolute right-3 top-3 cursor-pointer rounded-lg bg-white p-2 text-red-500 shadow transition hover:bg-red-50"
                      >
                        <X size={17} />
                      </button>

                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 transition hover:border-indigo-300 hover:bg-indigo-50 sm:py-10"
                    >

                      <ImagePlus
                        size={30}
                        className="text-slate-400"
                      />

                      <span className="mt-3 text-sm font-bold text-slate-600">
                        Click to upload image
                      </span>

                      <span className="mt-1 text-center text-xs text-slate-400">
                        PNG, JPG, WEBP up to 10MB
                      </span>

                    </button>
                  )}

                  <input
                    ref={
                      fileInputRef
                    }
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />

                  {imageError && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {imageError}
                    </p>
                  )}

                </div>

                {/* SHORT DESCRIPTION */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Short Description
                  </label>

                  <textarea
                    name="excerpt"
                    value={
                      formData.excerpt
                    }
                    onChange={
                      handleChange
                    }
                    rows={4}
                    placeholder="Write a short description for the blog card..."
                    className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                </div>

                {/* LONG DESCRIPTION */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Long Description
                  </label>

                  <textarea
                    name="longDescription"
                    value={
                      formData.longDescription
                    }
                    onChange={
                      handleChange
                    }
                    rows={14}
                    placeholder="Write the complete blog content here..."
                    className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    This content will appear on the public Blog Details page.
                  </p>

                </div>

              </div>

              {/* MODAL FOOTER */}

              <div className="sticky bottom-0 flex shrink-0 justify-end gap-2 border-t border-slate-200 bg-white px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">

                <button
                  type="button"
                  onClick={closeForm}
                  className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 sm:px-5 sm:py-3 sm:text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700 sm:px-6 sm:py-3 sm:text-sm"
                >
                  {editingBlog
                    ? "Update Blog"
                    : "Save Blog"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ==================================================
          VIEW MODAL
      ================================================== */}

      {showView &&
        viewingBlog && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto overscroll-contain bg-slate-900/60 p-2 sm:p-5"
            onMouseDown={
              handleViewOverlayClick
            }
          >

            <div
              className="my-auto flex max-h-[96vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              onMouseDown={(e) =>
                e.stopPropagation()
              }
            >

              {/* HEADER */}

              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4">

                <div className="min-w-0">

                  <h2 className="truncate text-lg font-black text-slate-900 sm:text-xl">
                    Blog Preview
                  </h2>

                  <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                    Public blog content preview
                  </p>

                </div>

                <button
                  type="button"
                  onClick={
                    closeView
                  }
                  className="ml-3 shrink-0 cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>

              </div>

              {/* VIEW CONTENT */}

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">

                {/* IMAGE */}

                {viewingBlog.image && (
                  <img
                    src={
                      viewingBlog.image
                    }
                    alt={
                      viewingBlog.title
                    }
                    className="block h-48 w-full bg-slate-50 object-cover sm:h-72 lg:h-[400px]"
                  />
                )}

                {/* CONTENT */}

                <div className="p-4 sm:p-8">

                  {/* CATEGORY */}

                  {viewingBlog.category && (
                    <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                      {
                        viewingBlog.category
                      }
                    </span>
                  )}

                  {/* TITLE */}

                  <h1 className="mt-4 break-words text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
                    {
                      viewingBlog.title
                    }
                  </h1>

                  {/* META */}

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">

                    {viewingBlog.author && (
                      <span>
                        {
                          viewingBlog.author
                        }
                      </span>
                    )}

                    {viewingBlog.date && (
                      <span>
                        {
                          viewingBlog.date
                        }
                      </span>
                    )}

                    {viewingBlog.readTime && (
                      <span>
                        {
                          viewingBlog.readTime
                        }
                      </span>
                    )}

                  </div>

                  {/* SHORT DESCRIPTION */}

                  {(viewingBlog.shortDescription ||
                    viewingBlog.excerpt) && (
                    <div className="mt-6 rounded-xl bg-slate-50 p-4 sm:mt-7 sm:p-5">

                      <p className="text-sm leading-7 text-slate-600">
                        {viewingBlog.shortDescription ||
                          viewingBlog.excerpt}
                      </p>

                    </div>
                  )}

                  {/* LONG DESCRIPTION */}

                  <article className="mt-7 space-y-5 sm:mt-8">

                    {(
                      viewingBlog.longDescription ||
                      viewingBlog.content ||
                      ""
                    )
                      .split(
                        /\n\s*\n/
                      )
                      .map(
                        (
                          paragraph,
                          index
                        ) =>
                          paragraph.trim() && (
                            <p
                              key={
                                index
                              }
                              className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8"
                            >
                              {paragraph.trim()}
                            </p>
                          )
                      )}

                  </article>

                </div>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}

export default Blogs;