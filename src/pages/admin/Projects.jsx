import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ImagePlus,
  Eye,
  ChevronDown,
} from "lucide-react";

import { nextId } from "../../utils";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 1200;
const JPEG_QUALITY = 0.8;

const EMPTY_FORM = {
  title: "",
  category: "",
  description: "",
  shortDescription: "",
  client: "",
  year: "",
  image: "",
  status: "Completed",
};

const STATUS_OPTIONS = [
  "Completed",
  "In Progress",
  "Planning",
];

const navigationKeys = [
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

const readAndShrinkImage = (file) =>
  new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No image selected."));
      return;
    }

    if (!file.type.startsWith("image/")) {
      reject(new Error("Please select a valid image file."));
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      reject(new Error("Image size must be 10MB or smaller."));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        const scale = Math.min(
          1,
          MAX_IMAGE_DIMENSION / Math.max(width, height)
        );

        width = Math.round(width * scale);
        height = Math.round(height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Unable to process image."));
          return;
        }

        context.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(
          "image/jpeg",
          JPEG_QUALITY
        );

        resolve(dataUrl);
      };

      img.onerror = () => {
        reject(new Error("Unable to read the selected image."));
      };

      img.src = reader.result;
    };

    reader.onerror = () => {
      reject(new Error("Unable to read the selected file."));
    };

    reader.readAsDataURL(file);
  });

function Projects({
  projects = [],
  setProjects,
}) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [openFilter, setOpenFilter] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState("");

  const titleInputRef = useRef(null);
  const viewModalRef = useRef(null);
  const filterDropdownRef = useRef(null);

  /* =========================================================
     CATEGORY OPTIONS
  ========================================================= */

  const categoryOptions = useMemo(() => {
    return Array.from(
      new Set(
        projects
          .map((project) => project.category)
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  /* =========================================================
     FILTERED PROJECTS
  ========================================================= */

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        String(project.title || "")
          .toLowerCase()
          .includes(query) ||
        String(project.category || "")
          .toLowerCase()
          .includes(query) ||
        String(project.client || "")
          .toLowerCase()
          .includes(query) ||
        String(project.description || "")
          .toLowerCase()
          .includes(query) ||
        String(project.shortDescription || "")
          .toLowerCase()
          .includes(query) ||
        String(project.status || "")
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        !categoryFilter ||
        project.category === categoryFilter;

      const matchesStatus =
        !statusFilter ||
        project.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    projects,
    search,
    categoryFilter,
    statusFilter,
  ]);

  /* =========================================================
     OUTSIDE CLICK FOR FILTER DROPDOWNS
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setOpenFilter(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =========================================================
     ESC KEY
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (openFilter) {
          setOpenFilter(null);
          return;
        }

        if (viewingProject) {
          setViewingProject(null);
          return;
        }

        if (showModal) {
          setShowModal(false);
        }
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
    openFilter,
    viewingProject,
    showModal,
  ]);

  /* =========================================================
     VIEW MODAL OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        viewingProject &&
        viewModalRef.current &&
        !viewModalRef.current.contains(event.target)
      ) {
        setViewingProject(null);
      }
    };

    if (viewingProject) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [viewingProject]);

  /* =========================================================
     AUTO FOCUS
  ========================================================= */

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [showModal]);

  /* =========================================================
     OPEN ADD MODAL
  ========================================================= */

  const handleAdd = () => {
    setEditingProject(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setImageError("");
    setShowModal(true);
  };

  /* =========================================================
     OPEN EDIT MODAL
  ========================================================= */

  const handleEdit = (project) => {
    setEditingProject(project);

    setForm({
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
      shortDescription:
        project.shortDescription || "",
      client: project.client || "",
      year: project.year || "",
      image: project.image || "",
      status: project.status || "Completed",
    });

    setErrors({});
    setImageError("");
    setShowModal(true);
  };

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /* =========================================================
     IMAGE CHANGE
  ========================================================= */

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageError("");

    try {
      const image = await readAndShrinkImage(file);

      setForm((prev) => ({
        ...prev,
        image,
      }));
    } catch (error) {
      setImageError(
        error.message || "Unable to process image."
      );
    }

    event.target.value = "";
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Project title is required.";
    }

    if (!form.category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!form.client.trim()) {
      newErrors.client = "Client name is required.";
    }

    if (!form.year.trim()) {
      newErrors.year = "Year is required.";
    }

    if (!form.shortDescription.trim()) {
      newErrors.shortDescription =
        "Short description is required.";
    }

    if (!form.description.trim()) {
      newErrors.description =
        "Project description is required.";
    }

    if (!form.image) {
      newErrors.image = "Project image is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const cleanProject = {
      ...form,
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      shortDescription:
        form.shortDescription.trim(),
      client: form.client.trim(),
      year: String(form.year).trim(),
      image: form.image,
      status: form.status,
    };

    if (editingProject) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                ...cleanProject,
              }
            : project
        )
      );
    } else {
      setProjects((prev) => [
        {
          id: nextId(prev),
          ...cleanProject,
        },
        ...prev,
      ]);
    }

    setShowModal(false);
    setEditingProject(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setImageError("");
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setProjects((prev) =>
      prev.filter(
        (item) => item.id !== project.id
      )
    );

    if (
      viewingProject &&
      viewingProject.id === project.id
    ) {
      setViewingProject(null);
    }
  };

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setStatusFilter("");
    setOpenFilter(null);
  };

  const hasFilters =
    search ||
    categoryFilter ||
    statusFilter;

  /* =========================================================
     STATUS STYLING
  ========================================================= */

  const getStatusClasses = (status) => {
    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Planning") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="w-full min-w-0">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">
            Projects
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your projects and portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="mb-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-7">
          {/* SEARCH */}

          <div className="relative lg:col-span-5">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search projects..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          

{/* CATEGORY + STATUS CUSTOM DROPDOWNS */}

<div
  ref={filterDropdownRef}
  className="grid grid-cols-1 min-[351px]:grid-cols-2 gap-2 sm:gap-3 lg:col-span-2"
>
  {/* CATEGORY */}

  <div className="relative min-w-0">
    <button
      type="button"
      onClick={() =>
        setOpenFilter(
          openFilter === "category"
            ? null
            : "category"
        )
      }
      aria-haspopup="listbox"
      aria-expanded={openFilter === "category"}
      className="flex h-11 w-full min-w-0 items-center justify-between gap-1.5 rounded-xl border border-gray-200 bg-white px-2.5 text-left text-sm text-gray-700 outline-none transition hover:border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:gap-2 sm:px-3"
    >
      <span className="min-w-0 truncate">
        {categoryFilter || "All Categories"}
      </span>

      <ChevronDown
        size={17}
        className={`shrink-0 text-gray-500 transition-transform ${
          openFilter === "category"
            ? "rotate-180"
            : ""
        }`}
      />
    </button>

    {openFilter === "category" && (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
        <button
          type="button"
          onClick={() => {
            setCategoryFilter("");
            setOpenFilter(null);
          }}
          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
            categoryFilter === ""
              ? "bg-indigo-50 font-semibold text-indigo-600"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          All Categories
        </button>

        {categoryOptions.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setCategoryFilter(category);
              setOpenFilter(null);
            }}
            className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
              categoryFilter === category
                ? "bg-indigo-50 font-semibold text-indigo-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="block truncate">
              {category}
            </span>
          </button>
        ))}
      </div>
    )}
  </div>

  {/* STATUS */}

  <div className="relative min-w-0">
    <button
      type="button"
      onClick={() =>
        setOpenFilter(
          openFilter === "status"
            ? null
            : "status"
        )
      }
      aria-haspopup="listbox"
      aria-expanded={openFilter === "status"}
      className="flex h-11 w-full min-w-0 items-center justify-between gap-1.5 rounded-xl border border-gray-200 bg-white px-2.5 text-left text-sm text-gray-700 outline-none transition hover:border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:gap-2 sm:px-3"
    >
      <span className="min-w-0 truncate">
        {statusFilter || "All Statuses"}
      </span>

      <ChevronDown
        size={17}
        className={`shrink-0 text-gray-500 transition-transform ${
          openFilter === "status"
            ? "rotate-180"
            : ""
        }`}
      />
    </button>

    {openFilter === "status" && (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
        <button
          type="button"
          onClick={() => {
            setStatusFilter("");
            setOpenFilter(null);
          }}
          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
            statusFilter === ""
              ? "bg-indigo-50 font-semibold text-indigo-600"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          All Statuses
        </button>

        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => {
              setStatusFilter(status);
              setOpenFilter(null);
            }}
            className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
              statusFilter === status
                ? "bg-indigo-50 font-semibold text-indigo-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    )}
  </div>
</div>



        {/* CLEAR FILTERS */}

        {hasFilters && (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      </div>

      {/* =====================================================
          PROJECT TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Project
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Client
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Year
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <Search
                          size={20}
                          className="text-gray-400"
                        />
                      </div>

                      <p className="text-sm font-medium text-gray-700">
                        No projects found
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProjects.map(
                  (project) => (
                    <tr
                      key={project.id}
                      className="border-b border-gray-100 transition hover:bg-gray-50"
                    >
                      {/* PROJECT */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={
                                  project.title ||
                                  "Project"
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <ImagePlus
                                  size={18}
                                  className="text-gray-400"
                                />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {project.title}
                            </p>

                            {project.shortDescription && (
                              <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                                {
                                  project.shortDescription
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-700">
                          {project.category ||
                            "—"}
                        </span>
                      </td>

                      {/* CLIENT */}

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-700">
                          {project.client || "—"}
                        </span>
                      </td>

                      {/* YEAR */}

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-700">
                          {project.year || "—"}
                        </span>
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                            project.status
                          )}`}
                        >
                          {project.status ||
                            "—"}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setViewingProject(
                                project
                              )
                            }
                            title="View project"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(project)
                            }
                            title="Edit project"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(project)
                            }
                            title="Delete project"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
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

      {/* =====================================================
          VIEW PROJECT MODAL
      ===================================================== */}

      {viewingProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setViewingProject(null);
            }
          }}
        >
          <div
            ref={viewModalRef}
            className="custom-modal-scrollbar max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
              <div className="min-w-0 pr-4">
                <h2 className="truncate text-lg font-bold text-gray-900">
                  Project Details
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setViewingProject(null)
                }
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={19} />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="space-y-6 p-5">
              {/* IMAGE */}

              {viewingProject.image && (
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={viewingProject.image}
                    alt={
                      viewingProject.title ||
                      "Project"
                    }
                    className="max-h-80 w-full object-cover"
                  />
                </div>
              )}

              {/* TITLE */}

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {viewingProject.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {viewingProject.category && (
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                      {viewingProject.category}
                    </span>
                  )}

                  {viewingProject.status && (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                        viewingProject.status
                      )}`}
                    >
                      {viewingProject.status}
                    </span>
                  )}
                </div>
              </div>

              {/* DETAILS GRID */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Client
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {viewingProject.client ||
                      "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Year
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {viewingProject.year ||
                      "—"}
                  </p>
                </div>
              </div>

              {/* SHORT DESCRIPTION */}

              {viewingProject.shortDescription && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Short Description
                  </h4>

                  <p className="text-sm leading-6 text-gray-600">
                    {
                      viewingProject.shortDescription
                    }
                  </p>
                </div>
              )}

              {/* DESCRIPTION */}

              {viewingProject.description && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Description
                  </h4>

                  <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
                    {viewingProject.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ADD / EDIT PROJECT MODAL
      ===================================================== */}

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setShowModal(false);
            }
          }}
        >
          <div className="custom-modal-scrollbar max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editingProject
                    ? "Edit Project"
                    : "Add Project"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {editingProject
                    ? "Update project information."
                    : "Add a new project to your portfolio."}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={19} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >
              {/* TITLE */}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Project Title
                </label>

                <input
                  ref={titleInputRef}
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    handleChange(
                      "title",
                      event.target.value
                    )
                  }
                  placeholder="Enter project title"
                  className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-gray-900 outline-none transition focus:ring-2 ${
                    errors.title
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />

                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* CATEGORY + CLIENT */}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Category
                  </label>

                  <input
                    type="text"
                    value={form.category}
                    onChange={(event) =>
                      handleChange(
                        "category",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Web Development"
                    className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-gray-900 outline-none transition focus:ring-2 ${
                      errors.category
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                  />

                  {errors.category && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Client
                  </label>

                  <input
                    type="text"
                    value={form.client}
                    onChange={(event) =>
                      handleChange(
                        "client",
                        event.target.value
                      )
                    }
                    placeholder="Enter client name"
                    className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-gray-900 outline-none transition focus:ring-2 ${
                      errors.client
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                  />

                  {errors.client && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.client}
                    </p>
                  )}
                </div>
              </div>

              {/* YEAR + STATUS */}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Year
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.year}
                    onChange={(event) =>
                      handleChange(
                        "year",
                        event.target.value
                      )
                    }
                    placeholder="2026"
                    className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-gray-900 outline-none transition focus:ring-2 ${
                      errors.year
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                  />

                  {errors.year && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.year}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      handleChange(
                        "status",
                        event.target.value
                      )
                    }
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    {STATUS_OPTIONS.map(
                      (status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* SHORT DESCRIPTION */}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Short Description
                </label>

                <textarea
                  value={form.shortDescription}
                  onChange={(event) =>
                    handleChange(
                      "shortDescription",
                      event.target.value
                    )
                  }
                  placeholder="Enter a short description"
                  rows={3}
                  className={`w-full resize-none rounded-xl border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2 ${
                    errors.shortDescription
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />

                {errors.shortDescription && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.shortDescription}
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    handleChange(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Enter project description"
                  rows={6}
                  className={`w-full resize-none rounded-xl border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2 ${
                    errors.description
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />

                {errors.description && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* IMAGE */}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Project Image
                </label>

                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
                  {form.image ? (
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={form.image}
                        alt="Project preview"
                        className="h-48 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            image: "",
                          }))
                        }
                        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                      >
                        <X size={17} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-8 text-center transition hover:border-indigo-300 hover:bg-indigo-50/30">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50">
                        <ImagePlus
                          size={21}
                          className="text-indigo-600"
                        />
                      </div>

                      <span className="text-sm font-semibold text-gray-700">
                        Choose project image
                      </span>

                      <span className="mt-1 text-xs text-gray-500">
                        JPG, PNG, WEBP up to 10MB
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={
                          handleImageChange
                        }
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {imageError && (
                  <p className="mt-1 text-xs text-red-500">
                    {imageError}
                  </p>
                )}

                {errors.image && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.image}
                  </p>
                )}
              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="w-full rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
                >
                  {editingProject
                    ? "Update Project"
                    : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;