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

// ======================================================
// CONSTANTS
// ======================================================

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 1200;
const JPEG_QUALITY = 0.8;

const EMPTY_FORM = {
  title: "",
  category: "",
  description: "",
  longDescription: "",
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

// ======================================================
// IMAGE PROCESSING
// ======================================================

const readAndShrinkImage = (file) =>
  new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No image selected."));
      return;
    }

    if (!file.type.startsWith("image/")) {
      reject(
        new Error("Please select a valid image file.")
      );
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      reject(
        new Error("Image size must be less than 10 MB.")
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        let { width, height } = image;

        const scale = Math.min(
          1,
          MAX_IMAGE_DIMENSION /
            Math.max(width, height)
        );

        width = Math.round(width * scale);
        height = Math.round(height * scale);

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          reject(
            new Error("Unable to process image.")
          );
          return;
        }

        context.drawImage(
          image,
          0,
          0,
          width,
          height
        );

        const dataUrl = canvas.toDataURL(
          "image/jpeg",
          JPEG_QUALITY
        );

        resolve(dataUrl);
      };

      image.onerror = () => {
        reject(
          new Error(
            "Unable to read the selected image."
          )
        );
      };

      image.src = reader.result;
    };

    reader.onerror = () => {
      reject(
        new Error(
          "Unable to read the selected file."
        )
      );
    };

    reader.readAsDataURL(file);
  });

// ======================================================
// COMPONENT
// ======================================================

function Projects({
  projects = [],
  setProjects,
}) {
  // ======================================================
  // STATE
  // ======================================================

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("");
  const [statusFilter, setStatusFilter] =
    useState("");
  const [openFilter, setOpenFilter] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState(null);

  const [viewingProject, setViewingProject] =
    useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] =
    useState("");

  // ======================================================
  // REFS
  // ======================================================

  const titleInputRef = useRef(null);
  const viewModalRef = useRef(null);
  const filterDropdownRef = useRef(null);

  // ======================================================
  // CATEGORY OPTIONS
  // ======================================================

  const categoryOptions = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.category)
          .filter(Boolean)
      ),
    ].sort();
  }, [projects]);

  // ======================================================
  // FILTER + SORT PROJECTS
  // NEWEST PROJECT FIRST
  // ======================================================

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase();

    return [...projects]
      .reverse()
      .filter((project) => {
        const matchesSearch =
          !term ||
          project.title
            ?.toLowerCase()
            .includes(term) ||
          project.category
            ?.toLowerCase()
            .includes(term) ||
          project.client
            ?.toLowerCase()
            .includes(term) ||
          project.description
            ?.toLowerCase()
            .includes(term) ||
          project.longDescription
            ?.toLowerCase()
            .includes(term) ||
          project.status
            ?.toLowerCase()
            .includes(term);

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

  // ======================================================
  // CLOSE FILTER ON OUTSIDE CLICK
  // ======================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(
          event.target
        )
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

  // ======================================================
  // ESCAPE KEY
  // ======================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;

      if (openFilter) {
        setOpenFilter(null);
        return;
      }

      if (viewingProject) {
        setViewingProject(null);
        return;
      }

      if (showModal) {
        closeModal();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    openFilter,
    viewingProject,
    showModal,
  ]);

  // ======================================================
  // AUTO FOCUS
  // ======================================================

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [showModal]);

  // ======================================================
  // LOCK BACKGROUND SCROLL WHEN MODAL IS OPEN
  // ======================================================

  useEffect(() => {
    if (showModal || viewingProject) {
      const originalOverflow =
        document.body.style.overflow;

      const originalPaddingRight =
        document.body.style.paddingRight;

      const scrollbarWidth =
        window.innerWidth -
        document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight =
          `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow =
          originalOverflow;

        document.body.style.paddingRight =
          originalPaddingRight;
      };
    }
  }, [showModal, viewingProject]);

  // ======================================================
  // KEYBOARD HELPERS
  // ======================================================

  const isShortcutKey = (event) => {
    return (
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    );
  };

  // ======================================================
  // TEXT INPUT KEYDOWN
  // ======================================================

  const handleTextKeyDown = (event) => {
    if (isShortcutKey(event)) {
      return;
    }

    if (navigationKeys.includes(event.key)) {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      return;
    }

    const allowedPattern =
      /^[a-zA-Z &'.,-]$/;

    if (!allowedPattern.test(event.key)) {
      event.preventDefault();
    }
  };

  // ======================================================
  // YEAR KEYDOWN
  // ======================================================

  const handleYearKeyDown = (event) => {
    if (isShortcutKey(event)) {
      return;
    }

    if (navigationKeys.includes(event.key)) {
      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  // ======================================================
  // FORM CHANGE
  // ======================================================

  const handleChange = (field, value) => {
    let cleanedValue = value;

    if (
      field === "title" ||
      field === "category" ||
      field === "client"
    ) {
      cleanedValue = value.replace(
        /[^a-zA-Z &'.,-]/g,
        ""
      );
    }

    if (field === "year") {
      cleanedValue = value
        .replace(/[^0-9]/g, "")
        .slice(0, 4);
    }

    setForm((prev) => ({
      ...prev,
      [field]: cleanedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // ======================================================
  // ADD PROJECT
  // ======================================================

  const handleAdd = () => {
    setEditingProject(null);
    setForm({ ...EMPTY_FORM });
    setErrors({});
    setImageError("");
    setShowModal(true);
  };

  // ======================================================
  // EDIT PROJECT
  // ======================================================

  const handleEdit = (project) => {
    setEditingProject(project);

    setForm({
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
      longDescription:
        project.longDescription || "",
      client: project.client || "",
      year: project.year
        ? String(project.year)
        : "",
      image: project.image || "",
      status: project.status || "Completed",
    });

    setErrors({});
    setImageError("");
    setShowModal(true);
  };

  // ======================================================
  // CLOSE MODAL
  // ======================================================

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setForm({ ...EMPTY_FORM });
    setErrors({});
    setImageError("");
  };

  // ======================================================
  // CLOSE FORM WHEN CLICKING OUTSIDE
  // ======================================================

  const handleFormModalClick = (event) => {
    if (
      event.target === event.currentTarget
    ) {
      closeModal();
    }
  };

  // ======================================================
  // VALIDATE FORM
  // ======================================================

  const validateForm = () => {
    const newErrors = {};

    const title = form.title.trim();
    const category = form.category.trim();
    const client = form.client.trim();
    const year = form.year.trim();
    const description =
      form.description.trim();

    if (!title) {
      newErrors.title =
        "Project title is required.";
    } else if (
      !/^[a-zA-Z &'.,-]+$/.test(title)
    ) {
      newErrors.title =
        "Project title can contain only letters and valid characters.";
    }

    if (!category) {
      newErrors.category =
        "Category is required.";
    } else if (
      !/^[a-zA-Z &'.,-]+$/.test(category)
    ) {
      newErrors.category =
        "Category can contain only letters and valid characters.";
    }

    if (!client) {
      newErrors.client =
        "Client name is required.";
    } else if (
      !/^[a-zA-Z &'.,-]+$/.test(client)
    ) {
      newErrors.client =
        "Client name can contain only letters and valid characters.";
    }

    if (!year) {
      newErrors.year =
        "Year is required.";
    } else if (!/^\d{4}$/.test(year)) {
      newErrors.year =
        "Year must contain exactly 4 numbers.";
    }

    if (!description) {
      newErrors.description =
        "Project description is required.";
    }

    if (!form.image) {
      newErrors.image =
        "Project image is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ======================================================
  // IMAGE CHANGE
  // ======================================================

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageError("");

    try {
      const image =
        await readAndShrinkImage(file);

      setForm((prev) => ({
        ...prev,
        image,
      }));

      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    } catch (error) {
      setImageError(
        error.message ||
          "Unable to process image."
      );
    }

    event.target.value = "";
  };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const projectData = {
      id: editingProject
        ? editingProject.id
        : nextId(projects),

      title: form.title.trim(),

      category: form.category.trim(),

      description:
        form.description.trim(),

      longDescription:
        form.longDescription.trim(),

      client: form.client.trim(),

      year: form.year.trim(),

      image: form.image,

      status: form.status,

      isAdminCreated: editingProject
        ? editingProject.isAdminCreated === true
        : true,
    };

    // ====================================================
    // EDIT EXISTING PROJECT
    // ====================================================

    if (editingProject) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id
            ? projectData
            : project
        )
      );
    }

    // ====================================================
    // ADD NEW PROJECT
    // ====================================================

    else {
      setProjects((prev) => [
        ...prev,
        projectData,
      ]);
    }

    closeModal();
  };

  // ======================================================
  // DELETE PROJECT
  // ======================================================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    setProjects((prev) =>
      prev.filter(
        (project) => project.id !== id
      )
    );

    if (
      viewingProject &&
      viewingProject.id === id
    ) {
      setViewingProject(null);
    }
  };

  // ======================================================
  // VIEW MODAL OUTSIDE CLICK
  // ======================================================

  const handleViewModalClick = (event) => {
    if (
      event.target === viewModalRef.current
    ) {
      setViewingProject(null);
    }
  };

  // ======================================================
  // STATUS CLASS
  // ======================================================

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "bg-emerald-50 text-emerald-600";
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-600";
    }

    return "bg-amber-50 text-amber-600";
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="min-h-full space-y-6">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Manage your projects and portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <Plus size={18} />
          Add Project
        </button>

      </div>

      {/* ==================================================
          SEARCH + FILTERS
      ================================================== */}

      <div>

        <div
          ref={filterDropdownRef}
          className="flex flex-col gap-3 lg:flex-row"
        >

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
              placeholder="Search projects..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />

          </div>

          {/* CATEGORY FILTER */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setOpenFilter(
                  openFilter === "category"
                    ? null
                    : "category"
                )
              }
              className="flex w-full min-w-[180px] items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <span>
                {categoryFilter ||
                  "All Categories"}
              </span>

              <ChevronDown
                size={16}
                className="text-slate-400"
              />
            </button>

            {openFilter === "category" && (
              <div className="absolute right-0 z-30 mt-2 max-h-64 w-full min-w-[220px] overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">

                <button
                  type="button"
                  onClick={() => {
                    setCategoryFilter("");
                    setOpenFilter(null);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                >
                  All Categories
                </button>

                {categoryOptions.map(
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
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                    >
                      {category}
                    </button>
                  )
                )}

              </div>
            )}

          </div>

          {/* STATUS FILTER */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setOpenFilter(
                  openFilter === "status"
                    ? null
                    : "status"
                )
              }
              className="flex w-full min-w-[180px] items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <span>
                {statusFilter ||
                  "All Status"}
              </span>

              <ChevronDown
                size={16}
                className="text-slate-400"
              />
            </button>

            {openFilter === "status" && (
              <div className="absolute right-0 z-30 mt-2 w-full min-w-[220px] rounded-xl border border-slate-200 bg-white p-1 shadow-xl">

                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter("");
                    setOpenFilter(null);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                >
                  All Status
                </button>

                {STATUS_OPTIONS.map(
                  (status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        setStatusFilter(
                          status
                        );
                        setOpenFilter(null);
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                    >
                      {status}
                    </button>
                  )
                )}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ==================================================
          PROJECT TABLE
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Project
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Client
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Year
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredProjects.length === 0 ? (

                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No projects found.
                  </td>
                </tr>

              ) : (

                filteredProjects.map(
                  (project) => (

                    <tr
                      key={project.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >

                      {/* PROJECT */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          {project.image ? (

                            <img
                              src={project.image}
                              alt={project.title}
                              className="h-12 w-16 rounded-lg object-cover"
                            />

                          ) : (

                            <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-slate-100">

                              <ImagePlus
                                size={18}
                                className="text-slate-400"
                              />

                            </div>

                          )}

                          <div className="min-w-0">

                            <p className="truncate font-semibold text-slate-900">
                              {project.title}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-5 py-4 text-sm text-slate-700">
                        {project.category}
                      </td>

                      {/* CLIENT */}

                      <td className="px-5 py-4 text-sm text-slate-700">
                        {project.client}
                      </td>

                      {/* YEAR */}

                      <td className="px-5 py-4 text-sm text-slate-700">
                        {project.year}
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            title="View"
                            onClick={() =>
                              setViewingProject(
                                project
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            type="button"
                            title="Edit"
                            onClick={() =>
                              handleEdit(
                                project
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            title="Delete"
                            onClick={() =>
                              handleDelete(
                                project.id
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
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
          ADD / EDIT MODAL
      ================================================== */}

      {showModal && (

        <div
          onMouseDown={handleFormModalClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
        >

          <div
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  {editingProject
                    ? "Edit Project"
                    : "Add Project"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingProject
                    ? "Update project information."
                    : "Add a new project to your portfolio."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >

              {/* TITLE / CATEGORY */}

              <div className="grid grid-cols-2 gap-5 max-[449px]:grid-cols-1">

                {/* TITLE */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Project Title
                    <span className="ml-1 text-red-500">
                      *
                    </span>
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
                    onKeyDown={
                      handleTextKeyDown
                    }
                    placeholder="Enter project title"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                      errors.title
                        ? "border-red-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    }`}
                  />

                  {errors.title && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.title}
                    </p>
                  )}

                </div>

                {/* CATEGORY */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Category
                    <span className="ml-1 text-red-500">
                      *
                    </span>
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
                    onKeyDown={
                      handleTextKeyDown
                    }
                    placeholder="e.g. Web Development"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                      errors.category
                        ? "border-red-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    }`}
                  />

                  {errors.category && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.category}
                    </p>
                  )}

                </div>

              </div>

              {/* CLIENT / YEAR */}

              <div className="grid grid-cols-2 gap-5 max-[449px]:grid-cols-1">

                {/* CLIENT */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Client
                    <span className="ml-1 text-red-500">
                      *
                    </span>
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
                    onKeyDown={
                      handleTextKeyDown
                    }
                    placeholder="Enter client name"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                      errors.client
                        ? "border-red-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    }`}
                  />

                  {errors.client && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.client}
                    </p>
                  )}

                </div>

                {/* YEAR */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Year
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={form.year}
                    onChange={(event) =>
                      handleChange(
                        "year",
                        event.target.value
                      )
                    }
                    onKeyDown={
                      handleYearKeyDown
                    }
                    placeholder="e.g. 2026"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                      errors.year
                        ? "border-red-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    }`}
                  />

                  {errors.year && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.year}
                    </p>
                  )}

                </div>

              </div>

              {/* STATUS */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
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
                  className="w-full rounded-xl cursor-pointer border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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

              {/* PROJECT DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Project Description
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(event) =>
                    handleChange(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Enter detailed project description"
                  className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                    errors.description
                      ? "border-red-500"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  }`}
                />

                {errors.description && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.description}
                  </p>
                )}

              </div>

              {/* LONG DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Long Description
                </label>

                <textarea
                  rows={12}
                  value={form.longDescription}
                  onChange={(event) =>
                    handleChange(
                      "longDescription",
                      event.target.value
                    )
                  }
                  placeholder="Enter detailed project description..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />

                <p className="mt-1.5 text-xs text-slate-500">
                  Add the complete project details.
                  You can use blank lines between
                  paragraphs.
                </p>

              </div>

              {/* PROJECT IMAGE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Project Image
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 transition hover:border-indigo-500 hover:bg-slate-100">

                  {form.image ? (

                    <div className="relative h-full min-h-[180px] w-full">

                      <img
                        src={form.image}
                        alt="Project preview"
                        className="h-[220px] w-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100">

                        <span className="rounded-lg bg-white/90 px-4 py-2 text-sm font-medium text-slate-900">
                          Change Image
                        </span>

                      </div>

                    </div>

                  ) : (

                    <>

                      <ImagePlus
                        size={32}
                        className="mb-3 text-slate-400"
                      />

                      <span className="text-sm font-medium text-slate-700">
                        Upload project image
                      </span>

                      <span className="mt-1 text-xs text-slate-500">
                        PNG, JPG, JPEG up to 10 MB
                      </span>

                    </>

                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />

                </label>

                {imageError && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {imageError}
                  </p>
                )}

                {errors.image &&
                  !imageError && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.image}
                    </p>
                  )}

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
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

      {/* ==================================================
          VIEW PROJECT MODAL
      ================================================== */}

      {viewingProject && (

        <div
          ref={viewModalRef}
          onMouseDown={handleViewModalClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
        >

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Project Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View project information
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setViewingProject(null)
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>

            </div>

            {/* CONTENT */}

            <div className="space-y-6 p-6">

              {viewingProject.image && (

                <img
                  src={viewingProject.image}
                  alt={viewingProject.title}
                  className="h-[260px] w-full rounded-2xl object-cover sm:h-[340px]"
                />

              )}

              {/* TITLE */}

              <div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <h3 className="text-2xl font-bold text-slate-900">
                      {viewingProject.title}
                    </h3>

                    <p className="mt-1 text-sm text-indigo-600">
                      {viewingProject.category}
                    </p>

                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                      viewingProject.status
                    )}`}
                  >
                    {viewingProject.status}
                  </span>

                </div>

              </div>

              {/* PROJECT INFO */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Client
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {viewingProject.client}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Year
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {viewingProject.year}
                  </p>

                </div>

              </div>

              {/* PROJECT DESCRIPTION */}

              {viewingProject.description && (

                <div>

                  <h4 className="mb-2 text-sm font-semibold text-slate-900">
                    Project Description
                  </h4>

                  <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                    {viewingProject.description}
                  </p>

                </div>

              )}

              {/* LONG DESCRIPTION */}

              {viewingProject.longDescription && (

                <div>

                  <h4 className="mb-2 text-sm font-semibold text-slate-900">
                    Long Description
                  </h4>

                  <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                    {
                      viewingProject.longDescription
                    }
                  </p>

                </div>

              )}

            </div>

            {/* FOOTER */}

            <div className="border-t border-slate-200 px-6 py-4">

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Projects;