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
} from "lucide-react";

import { nextId } from "../../utils";

function Services({
  services = [],
  setServices,
}) {
  // ======================================================
  // STATE
  // ======================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [viewingService, setViewingService] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const titleInputRef = useRef(null);
  const [openFilter, setOpenFilter] = useState(null);

  // ======================================================
  // LOCK BODY SCROLL WHEN MODAL IS OPEN
  // ======================================================

  useEffect(() => {
    const modalIsOpen =
      showModal || Boolean(viewingService);

    if (!modalIsOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal, viewingService]);

  // ======================================================
  // KEYBOARD HELPERS
  // ======================================================

  const allowedControlKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
    "Tab",
  ];

  const isShortcutKey = (event) => {
    return (
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    );
  };

  const handleTextKeyDown = (event) => {
    if (isShortcutKey(event)) {
      return;
    }

    if (allowedControlKeys.includes(event.key)) {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      return;
    }

    const allowedPattern = /^[a-zA-Z &-]$/;

    if (!allowedPattern.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleDescriptionKeyDown = (event) => {
    if (isShortcutKey(event)) {
      return;
    }

    if (allowedControlKeys.includes(event.key)) {
      return;
    }

    if (event.key === "Enter") {
      return;
    }

    if (event.key.length === 1) {
      return;
    }
  };

  // ======================================================
  // CATEGORIES
  // ======================================================

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        services
          .map((service) =>
            service.category?.trim()
          )
          .filter(Boolean)
      )
    ).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [services]);

  // ======================================================
  // FILTER SERVICES
  // ======================================================

  const filteredServices = useMemo(() => {
    const term = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        !term ||
        [
          service.title,
          service.category,
          service.description,
          service.status,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(term);

      const matchesStatus =
        statusFilter === "All" ||
        (service.status || "Inactive") ===
          statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        (service.category || "") ===
          categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    services,
    search,
    statusFilter,
    categoryFilter,
  ]);

  const hasActiveFilters =
    Boolean(search.trim()) ||
    statusFilter !== "All" ||
    categoryFilter !== "All";

  // ======================================================
  // RESET FORM
  // ======================================================

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      description: "",
      status: "Active",
    });

    setErrors({});
  };

  // ======================================================
  // VALIDATION
  // ======================================================

  const validateForm = () => {
    const newErrors = {};

    const title = form.title.trim();
    const category = form.category.trim();
    const description = form.description.trim();

    if (!title) {
      newErrors.title =
        "Service title is required.";
    } else if (title.length < 3) {
      newErrors.title =
        "Service title must be at least 3 characters.";
    } else if (title.length > 100) {
      newErrors.title =
        "Service title cannot exceed 100 characters.";
    } else if (
      !/^[a-zA-Z0-9 &-]+$/.test(title)
    ) {
      newErrors.title =
        "Service title contains invalid characters.";
    }

    if (!category) {
      newErrors.category =
        "Category is required.";
    } else if (category.length < 2) {
      newErrors.category =
        "Category must be at least 2 characters.";
    } else if (category.length > 50) {
      newErrors.category =
        "Category cannot exceed 50 characters.";
    } else if (
      !/^[a-zA-Z0-9 &-]+$/.test(category)
    ) {
      newErrors.category =
        "Category contains invalid characters.";
    }

    if (!description) {
      newErrors.description =
        "Description is required.";
    } else if (description.length < 10) {
      newErrors.description =
        "Description must be at least 10 characters.";
    } else if (description.length > 500) {
      newErrors.description =
        "Description cannot exceed 500 characters.";
    }

    if (
      form.status !== "Active" &&
      form.status !== "Inactive"
    ) {
      newErrors.status =
        "Please select a valid status.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // OPEN ADD MODAL
  // ======================================================

  const openAddModal = () => {
    setEditingService(null);
    resetForm();
    setShowModal(true);
  };

  // ======================================================
  // OPEN EDIT MODAL
  // ======================================================

  const openEditModal = (service) => {
    setEditingService(service);

    setForm({
      title: service.title || "",
      category: service.category || "",
      description: service.description || "",
      status: service.status || "Active",
    });

    setErrors({});
    setShowModal(true);
  };

  // ======================================================
  // AUTO FOCUS TITLE
  // ======================================================

  useEffect(() => {
    if (!showModal) return;

    const timer = setTimeout(() => {
      titleInputRef.current?.focus();
    }, 50);

    return () => clearTimeout(timer);
  }, [showModal]);

  // ======================================================
  // ESCAPE KEY
  // ======================================================

  useEffect(() => {
    if (!showModal && !viewingService) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (viewingService) {
        closeViewModal();
      } else if (showModal) {
        closeModal();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [showModal, viewingService]);

  // ======================================================
  // HANDLE FORM CHANGE
  // ======================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    let updatedValue = value;

    // Remove leading spaces
    updatedValue = updatedValue.replace(
      /^\s+/,
      ""
    );

    // Prevent multiple spaces
    updatedValue = updatedValue.replace(
      /\s{2,}/g,
      " "
    );

    if (
      name === "title" ||
      name === "category"
    ) {
      updatedValue = updatedValue.replace(
        /[^a-zA-Z &-]/g,
        ""
      );
    }

    if (name === "description") {
      updatedValue = updatedValue.replace(
        /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,
        ""
      );
    }

    setForm((previous) => ({
      ...previous,
      [name]: updatedValue,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  // ======================================================
  // VIEW MODAL
  // ======================================================

  const openViewModal = (service) => {
    setViewingService(service);
  };

  const closeViewModal = () => {
    setViewingService(null);
  };

  // ======================================================
  // CLOSE FORM MODAL
  // ======================================================

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    resetForm();
  };

  // ======================================================
  // SUBMIT FORM
  // ======================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const title = form.title.trim();
    const category = form.category.trim();
    const description =
      form.description.trim();

    if (editingService) {
      setServices((currentServices) =>
        currentServices.map((service) =>
          service.id === editingService.id
            ? {
                ...service,
                title,
                category,
                description,
                status: form.status,
              }
            : service
        )
      );
    } else {
      setServices((currentServices) => {
        const newService = {
          id: nextId(currentServices),
          title,
          category,
          description,
          status: form.status,
        };

        return [
          ...currentServices,
          newService,
        ];
      });
    }

    closeModal();
  };

  // ======================================================
  // DELETE SERVICE
  // ======================================================

  const handleDelete = (id) => {
    const service = services.find(
      (item) => item.id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete "${service?.title || "this service"}"?`
    );

    if (!confirmed) {
      return;
    }

    setServices((currentServices) =>
      currentServices.filter(
        (item) => item.id !== id
      )
    );
  };

  // ======================================================
  // CLEAR FILTERS
  // ======================================================

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setOpenFilter(null);
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="space-y-6">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Services
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your company's services.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* ==================================================
          SEARCH + FILTERS
      ================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* SEARCH */}

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search services..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* STATUS FILTER */}

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:min-w-[160px]"
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>

          {/* CATEGORY FILTER */}

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:min-w-[180px]"
            >
              <option value="All">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* CLEAR */}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <X size={16} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ==================================================
          TABLE
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Service
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Description
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* SERVICE */}

                    <td className="whitespace-nowrap px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {service.title}
                      </p>
                    </td>

                    {/* CATEGORY */}

                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">
                        {service.category}
                      </span>
                    </td>

                    {/* DESCRIPTION */}

                    <td className="max-w-[350px] px-6 py-4">
                      <p className="truncate text-sm text-slate-500">
                        {service.description}
                      </p>
                    </td>

                    {/* STATUS */}

                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          service.status ===
                          "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {service.status ||
                          "Inactive"}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openViewModal(service)
                          }
                          title="View"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(service)
                          }
                          title="Edit"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              service.id
                            )
                          }
                          title="Delete"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
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
                    colSpan={5}
                    className="px-6 py-12 text-center"
                  >
                    <div className="mx-auto max-w-sm">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <Search
                          size={20}
                          className="text-slate-400"
                        />
                      </div>

                      <h3 className="font-semibold text-slate-900">
                        No services found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {hasActiveFilters
                          ? "Try changing your search or filters."
                          : "Add your first service to get started."}
                      </p>

                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================================================
          VIEW SERVICE MODAL
      ================================================== */}

      {viewingService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeViewModal();
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Service Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View service information
                </p>
              </div>

              <button
                type="button"
                onClick={closeViewModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}

            <div className="space-y-5 p-6">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Service Title
                </p>

                <p className="text-base font-semibold text-slate-900">
                  {viewingService.title}
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Category
                </p>

                <span className="inline-flex rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">
                  {viewingService.category}
                </span>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Description
                </p>

                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                  {viewingService.description}
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </p>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    viewingService.status ===
                    "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {viewingService.status ||
                    "Inactive"}
                </span>
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={closeViewModal}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          ADD / EDIT SERVICE MODAL
      ================================================== */}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingService
                    ? "Edit Service"
                    : "Add Service"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingService
                    ? "Update service information."
                    : "Add a new service to your website."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {/* ==================================================
                  SERVICE TITLE + CATEGORY
              ================================================== */}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* SERVICE TITLE */}

                <div>
                  <label
                    htmlFor="service-title"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Service Title
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    ref={titleInputRef}
                    id="service-title"
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    onKeyDown={handleTextKeyDown}
                    placeholder="Web Development"
                    maxLength={100}
                    autoComplete="off"
                    aria-invalid={Boolean(
                      errors.title
                    )}
                    aria-describedby={
                      errors.title
                        ? "service-title-error"
                        : undefined
                    }
                    className={`w-full rounded-xl border px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                      errors.title
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                  />

                  {errors.title && (
                    <p
                      id="service-title-error"
                      className="mt-1.5 text-sm text-red-600"
                    >
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* CATEGORY */}

                <div>
                  <label
                    htmlFor="service-category"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Category
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    id="service-category"
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    onKeyDown={handleTextKeyDown}
                    placeholder="Development"
                    maxLength={50}
                    autoComplete="off"
                    aria-invalid={Boolean(
                      errors.category
                    )}
                    aria-describedby={
                      errors.category
                        ? "service-category-error"
                        : undefined
                    }
                    className={`w-full rounded-xl border px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                      errors.category
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                  />

                  {errors.category && (
                    <p
                      id="service-category-error"
                      className="mt-1.5 text-sm text-red-600"
                    >
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              {/* ==================================================
                  DESCRIPTION
              ================================================== */}

              <div>
                <label
                  htmlFor="service-description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <textarea
                  id="service-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  onKeyDown={
                    handleDescriptionKeyDown
                  }
                  placeholder="Describe the service..."
                  rows={5}
                  maxLength={500}
                  aria-invalid={Boolean(
                    errors.description
                  )}
                  aria-describedby={
                    errors.description
                      ? "service-description-error"
                      : undefined
                  }
                  className={`w-full resize-none rounded-xl border px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                    errors.description
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />

                <div className="mt-1.5 flex items-center justify-between">
                  {errors.description ? (
                    <p
                      id="service-description-error"
                      className="text-sm text-red-600"
                    >
                      {errors.description}
                    </p>
                  ) : (
                    <span />
                  )}

                  <span className="text-xs text-slate-400">
                    {form.description.length}/500
                  </span>
                </div>
              </div>

              {/* ==================================================
                  STATUS
              ================================================== */}

              <div>
                <label
                  htmlFor="service-status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Status
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <select
                  id="service-status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:ring-2 ${
                    errors.status
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

                {errors.status && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.status}
                  </p>
                )}
              </div>

              {/* ==================================================
                  BUTTONS
              ================================================== */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  {editingService
                    ? "Update Service"
                    : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;