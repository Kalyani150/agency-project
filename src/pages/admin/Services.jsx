
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
  // LOCK BACKGROUND PAGE WHEN MODAL IS OPEN
  // ======================================================

  useEffect(() => {
    const modalIsOpen =
      showModal || Boolean(viewingService);

    if (!modalIsOpen) {
      document.body.style.overflow = "";
      return;
    }

    // Prevent the page behind the modal from scrolling.
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal, viewingService]);

  // ======================================================
  // KEYBOARD CONTROL
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

  // ======================================================
  // TITLE / CATEGORY KEYBOARD VALIDATION
  // ======================================================

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

    const allowedPattern = /^[a-zA-Z0-9 &-]$/;

    if (!allowedPattern.test(event.key)) {
      event.preventDefault();
    }
  };

  // ======================================================
  // DESCRIPTION KEYBOARD VALIDATION
  // ======================================================

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
  // FILTER SERVICES
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

  const filteredServices = useMemo(() => {
    const term = search
      .trim()
      .toLowerCase();

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
    const description =
      form.description.trim();

    // ----------------------------------------------------
    // SERVICE TITLE
    // ----------------------------------------------------

    if (!title) {
      newErrors.title =
        "Service title is required.";
    } else if (title.length < 3) {
      newErrors.title =
        "Service title must be at least 3 characters.";
    } else if (title.length > 100) {
      newErrors.title =
        "Service title must not exceed 100 characters.";
    } else if (
      !/^[a-zA-Z0-9 &-]+$/.test(title)
    ) {
      newErrors.title =
        "Service title contains invalid characters.";
    }

    // ----------------------------------------------------
    // CATEGORY
    // ----------------------------------------------------

    if (!category) {
      newErrors.category =
        "Category is required.";
    } else if (category.length < 2) {
      newErrors.category =
        "Category must be at least 2 characters.";
    } else if (category.length > 50) {
      newErrors.category =
        "Category must not exceed 50 characters.";
    } else if (
      !/^[a-zA-Z0-9 &-]+$/.test(category)
    ) {
      newErrors.category =
        "Category contains invalid characters.";
    }

    // ----------------------------------------------------
    // DESCRIPTION
    // ----------------------------------------------------

    if (!description) {
      newErrors.description =
        "Description is required.";
    } else if (description.length < 10) {
      newErrors.description =
        "Description must be at least 10 characters.";
    } else if (description.length > 500) {
      newErrors.description =
        "Description must not exceed 500 characters.";
    }

    // ----------------------------------------------------
    // STATUS
    // ----------------------------------------------------

    if (
      form.status !== "Active" &&
      form.status !== "Inactive"
    ) {
      newErrors.status =
        "Please select a valid status.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
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
      description:
        service.description || "",
      status:
        service.status || "Active",
    });

    setErrors({});
    setShowModal(true);
  };

  // ======================================================
  // AUTO FOCUS
  // ======================================================

  useEffect(() => {
    if (!showModal) {
      return;
    }

    const timer = setTimeout(() => {
      titleInputRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [showModal]);

  // ======================================================
  // ESCAPE KEY
  // ======================================================

  useEffect(() => {
    if (
      !showModal &&
      !viewingService
    ) {
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
  }, [
    showModal,
    viewingService,
  ]);

  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    let cleanedValue = value;

    // Remove leading spaces
    cleanedValue = cleanedValue.replace(
      /^\s+/,
      ""
    );

    // Replace multiple spaces
    cleanedValue = cleanedValue.replace(
      /\s{2,}/g,
      " "
    );

    // Title
    if (name === "title") {
      cleanedValue =
        cleanedValue.replace(
          /[^a-zA-Z0-9 &-]/g,
          ""
        );
    }

    // Category
    if (name === "category") {
      cleanedValue =
        cleanedValue.replace(
          /[^a-zA-Z0-9 &-]/g,
          ""
        );
    }

    // Description
    if (name === "description") {
      cleanedValue =
        cleanedValue.replace(
          /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
          ""
        );
    }

    setForm((previousForm) => ({
      ...previousForm,
      [name]: cleanedValue,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // ======================================================
  // VIEW SERVICE
  // ======================================================

  const openViewModal = (service) => {
    setViewingService(service);
  };

  const closeViewModal = () => {
    setViewingService(null);
  };

  // ======================================================
  // CLOSE MODAL
  // ======================================================

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    resetForm();
  };

  // ======================================================
  // FORM SUBMIT
  // ======================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const title = form.title.trim();
    const category =
      form.category.trim();
    const description =
      form.description.trim();

    // ====================================================
    // UPDATE EXISTING SERVICE
    // ====================================================

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

      closeModal();
      return;
    }

    // ====================================================
    // CREATE NEW SERVICE
    // ====================================================

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
      `Are you sure you want to delete "${
        service?.title || "this service"
      }"?`
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
  // RENDER
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

          <p className="mt-1 text-slate-500">
            Manage the services displayed on your website.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus size={18} />
          Add Service
        </button>

      </div>

      {/* ==================================================
    SEARCH + FILTERS
================================================== */}

<div>
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

    {/* SEARCH */}

    <div className="relative w-full sm:flex-1">

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
        className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />

    </div>

    {/* FILTERS */}

    <div className="grid w-full grid-cols-2 gap-3 min-[351px]:grid min-[351px]:grid-cols-2 sm:flex sm:w-auto">

      {/* ==================================================
          STATUS DROPDOWN
      ================================================== */}

      <div className="relative w-full sm:w-36">

        <button
          type="button"
          onClick={() =>
            setOpenFilter(
              openFilter === "status"
                ? null
                : "status"
            )
          }
          className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <span className="truncate">
            {statusFilter === "All"
              ? "All Status"
              : statusFilter}
          </span>

          <span
            className={`shrink-0 text-slate-400 transition-transform ${
              openFilter === "status"
                ? "rotate-180"
                : ""
            }`}
          >
            ▼
          </span>
        </button>

        {openFilter === "status" && (
          <div className="absolute left-0 right-0 top-full z-[100] mt-2 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">

            {[
              {
                value: "All",
                label: "All Status",
              },
              {
                value: "Active",
                label: "Active",
              },
              {
                value: "Inactive",
                label: "Inactive",
              },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setStatusFilter(option.value);
                  setOpenFilter(null);
                }}
                className={`w-full rounded-lg px-3 py-3 text-left text-sm transition ${
                  statusFilter === option.value
                    ? "bg-indigo-50 font-semibold text-indigo-600"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {option.label}
              </button>
            ))}

          </div>
        )}

      </div>

      {/* ==================================================
          CATEGORY DROPDOWN
      ================================================== */}

      <div className="relative w-full sm:w-40">

        <button
          type="button"
          onClick={() =>
            setOpenFilter(
              openFilter === "category"
                ? null
                : "category"
            )
          }
          className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <span className="truncate">
            {categoryFilter === "All"
              ? "All Categories"
              : categoryFilter}
          </span>

          <span
            className={`shrink-0 text-slate-400 transition-transform ${
              openFilter === "category"
                ? "rotate-180"
                : ""
            }`}
          >
            ▼
          </span>
        </button>

        {openFilter === "category" && (
          <div className="absolute left-0 right-0 top-full z-[100] mt-2 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">

            {/* ALL CATEGORIES */}

            <button
              type="button"
              onClick={() => {
                setCategoryFilter("All");
                setOpenFilter(null);
              }}
              className={`w-full rounded-lg px-3 py-3 text-left text-sm transition ${
                categoryFilter === "All"
                  ? "bg-indigo-50 font-semibold text-indigo-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              All Categories
            </button>

            {/* CATEGORIES */}

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setCategoryFilter(category);
                  setOpenFilter(null);
                }}
                className={`w-full rounded-lg px-3 py-3 text-left text-sm transition ${
                  categoryFilter === category
                    ? "bg-indigo-50 font-semibold text-indigo-600"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {category}
              </button>
            ))}

          </div>
        )}

      </div>

    </div>

  </div>

  {/* CLEAR FILTERS */}

  {hasActiveFilters && (
    <div className="mt-3 flex justify-end">

      <button
        type="button"
        onClick={() => {
          setSearch("");
          setStatusFilter("All");
          setCategoryFilter("All");
          setOpenFilter(null);
        }}
        className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
      >
        Clear filters
      </button>

    </div>
  )}

</div>
      {/* ==================================================
          SERVICES TABLE
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Service
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
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

              {filteredServices.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    {hasActiveFilters
                      ? "No services match the selected filters."
                      : "No services found."}
                  </td>

                </tr>

              ) : (

                filteredServices.map(
                  (service) => (

                    <tr
                      key={service.id}
                      className="transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-4 text-sm text-slate-500">
                        #{service.id}
                      </td>

                      <td className="px-6 py-4">

                        <p className="font-semibold text-slate-900">
                          {service.title}
                        </p>

                        <p className="mt-1 max-w-md truncate text-sm text-slate-500">
                          {service.description}
                        </p>

                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {service.category || "-"}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            service.status === "Active"
                              ? "bg-green-50 text-green-600"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {service.status ||
                            "Inactive"}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          {/* VIEW */}

                          <button
                            type="button"
                            onClick={() =>
                              openViewModal(
                                service
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            title="View service"
                            aria-label={`View ${service.title}`}
                          >
                            <Eye size={17} />
                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                service
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            title="Edit service"
                            aria-label={`Edit ${service.title}`}
                          >
                            <Pencil size={17} />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                service.id
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            title="Delete service"
                            aria-label={`Delete ${service.title}`}
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/60 p-4"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeViewModal();
            }
          }}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-service-modal-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 p-6">

              <div>

                <h2
                  id="view-service-modal-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Service Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View the complete service information.
                </p>

              </div>

              <button
                type="button"
                onClick={closeViewModal}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Close service details"
                title="Close"
              >
                <X size={20} />
              </button>

            </div>

            {/* SERVICE DETAILS */}

            <div className="space-y-5 p-6">

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Service ID
                  </p>

                  <p className="mt-1 text-base font-semibold text-slate-900">
                    #{viewingService.id}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      viewingService.status ===
                      "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {viewingService.status ||
                      "Inactive"}
                  </span>

                </div>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Service Title
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {viewingService.title ||
                    "-"}
                </p>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </p>

                <p className="mt-1 text-base text-slate-700">
                  {viewingService.category ||
                    "-"}
                </p>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Description
                </p>

                <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {viewingService.description ||
                      "-"}
                  </p>

                </div>

              </div>

              {/* VIEW BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeViewModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const service =
                      viewingService;

                    closeViewModal();
                    openEditModal(
                      service
                    );
                  }}
                  className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Edit Service
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ==================================================
          ADD / EDIT MODAL
      ================================================== */}

      {showModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/60 p-4"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 p-6">

              <div>

                <h2
                  id="service-modal-title"
                  className="text-xl font-bold text-slate-900"
                >
                  {editingService
                    ? "Edit Service"
                    : "Add Service"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingService
                    ? "Update the service information below."
                    : "Add service information below."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Close modal"
                title="Close"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
              noValidate
            >

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
                  onKeyDown={
                    handleTextKeyDown
                  }
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
                  onKeyDown={
                    handleTextKeyDown
                  }
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

              {/* DESCRIPTION */}

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
                  rows={5}
                  value={form.description}
                  onChange={handleChange}
                  onKeyDown={
                    handleDescriptionKeyDown
                  }
                  placeholder="Describe this service..."
                  maxLength={500}
                  aria-invalid={Boolean(
                    errors.description
                  )}
                  aria-describedby={
                    errors.description
                      ? "service-description-error"
                      : undefined
                  }
                  className={`w-full resize-y rounded-xl border px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                    errors.description
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />

                {errors.description && (
                  <p
                    id="service-description-error"
                    className="mt-1.5 text-sm text-red-600"
                  >
                    {errors.description}
                  </p>
                )}

              </div>

              {/* STATUS */}

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
                  aria-invalid={Boolean(
                    errors.status
                  )}
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

              {/* FORM BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {editingService
                    ? "Update Service"
                    : "Create Service"}
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
