
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
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  const titleInputRef = useRef(null);

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
    // Allow Ctrl/Cmd shortcuts:
    // Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, etc.
    if (isShortcutKey(event)) {
      return;
    }

    // Allow editing and navigation keys
    if (allowedControlKeys.includes(event.key)) {
      return;
    }

    // Prevent Enter in title/category
    if (event.key === "Enter") {
      event.preventDefault();
      return;
    }

    // Allow:
    // letters
    // numbers
    // spaces
    // &
    // -
    const allowedPattern = /^[a-zA-Z0-9 &-]$/;

    if (!allowedPattern.test(event.key)) {
      event.preventDefault();
    }
  };

  // ======================================================
  // DESCRIPTION KEYBOARD VALIDATION
  // ======================================================

  const handleDescriptionKeyDown = (event) => {
    // Allow Ctrl/Cmd shortcuts
    if (isShortcutKey(event)) {
      return;
    }

    // Allow navigation/editing keys
    if (allowedControlKeys.includes(event.key)) {
      return;
    }

    // Allow Enter in textarea
    if (event.key === "Enter") {
      return;
    }

    // Allow normal printable characters
    if (event.key.length === 1) {
      return;
    }
  };

  // ======================================================
  // FILTER SERVICES
  // ======================================================

  const filteredServices = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return services;
    }

    return services.filter((service) =>
      [
        service.title,
        service.category,
        service.description,
        service.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [services, search]);

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
    } else if (!/^[a-zA-Z0-9 &-]+$/.test(title)) {
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
    if (!showModal) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
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
  }, [showModal]);

  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    let cleanedValue = value;

    // ----------------------------------------------------
    // REMOVE LEADING SPACES
    // ----------------------------------------------------

    cleanedValue = cleanedValue.replace(
      /^\s+/,
      ""
    );

    // ----------------------------------------------------
    // REPLACE MULTIPLE SPACES
    // ----------------------------------------------------

    cleanedValue = cleanedValue.replace(
      /\s{2,}/g,
      " "
    );

    // ----------------------------------------------------
    // TITLE
    // ----------------------------------------------------

    if (name === "title") {
      cleanedValue = cleanedValue.replace(
        /[^a-zA-Z0-9 &-]/g,
        ""
      );
    }

    // ----------------------------------------------------
    // CATEGORY
    // ----------------------------------------------------

    if (name === "category") {
      cleanedValue = cleanedValue.replace(
        /[^a-zA-Z0-9 &-]/g,
        ""
      );
    }

    // ----------------------------------------------------
    // DESCRIPTION
    // ----------------------------------------------------

    if (name === "description") {
      // Remove control characters but keep normal
      // punctuation, numbers, spaces and new lines.
      cleanedValue = cleanedValue.replace(
        /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
        ""
      );
    }

    setForm((previousForm) => ({
      ...previousForm,
      [name]: cleanedValue,
    }));

    // Remove current field error
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
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
    const category = form.category.trim();
    const description = form.description.trim();

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
          SEARCH
      ================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">

        <div className="relative">

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
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:text-base"
          />

        </div>

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
                    {search
                      ? "No services match your search."
                      : "No services found."}
                  </td>

                </tr>

              ) : (

                filteredServices.map((service) => (

                  <tr
                    key={service.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* ID */}

                    <td className="px-6 py-4 text-sm text-slate-500">
                      #{service.id}
                    </td>

                    {/* SERVICE */}

                    <td className="px-6 py-4">

                      <p className="font-semibold text-slate-900">
                        {service.title}
                      </p>

                      <p className="mt-1 max-w-md truncate text-sm text-slate-500">
                        {service.description}
                      </p>

                    </td>

                    {/* CATEGORY */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {service.category || "-"}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          service.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {service.status || "Inactive"}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(service)
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          title="Edit service"
                          aria-label={`Edit ${service.title}`}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(service.id)
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
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

            {/* ==================================================
                MODAL HEADER
            ================================================== */}

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

            {/* ==================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
              noValidate
            >

              {/* ==================================================
                  SERVICE TITLE
              ================================================== */}

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
                  aria-invalid={Boolean(errors.title)}
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

              {/* ==================================================
                  CATEGORY
              ================================================== */}

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
                  aria-invalid={Boolean(errors.category)}
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
                  rows={5}
                  value={form.description}
                  onChange={handleChange}
                  onKeyDown={handleDescriptionKeyDown}
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


              {/* ==================================================
                  FORM BUTTONS
              ================================================== */}

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
