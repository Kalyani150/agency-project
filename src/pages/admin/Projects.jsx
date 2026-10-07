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
  status: "Planning",
};

const STATUS_OPTIONS = [
  "Completed",
  "In Progress",
  "Planning",
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
        let width = image.width;
        let height = image.height;

        if (
          width > MAX_IMAGE_DIMENSION ||
          height > MAX_IMAGE_DIMENSION
        ) {
          if (width > height) {
            height =
              (height / width) * MAX_IMAGE_DIMENSION;

            width = MAX_IMAGE_DIMENSION;
          } else {
            width =
              (width / height) * MAX_IMAGE_DIMENSION;

            height = MAX_IMAGE_DIMENSION;
          }
        }

        const canvas =
          document.createElement("canvas");

        canvas.width = Math.round(width);
        canvas.height = Math.round(height);

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
          canvas.width,
          canvas.height
        );

        const dataUrl = canvas.toDataURL(
          "image/jpeg",
          JPEG_QUALITY
        );

        resolve(dataUrl);
      };

      image.onerror = () => {
        reject(
          new Error("Unable to read the image.")
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
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [openFilter, setOpenFilter] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState(null);

  const [viewingProject, setViewingProject] =
    useState(null);

  const [form, setForm] =
    useState(EMPTY_FORM);

  const [errors, setErrors] =
    useState({});

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
    const categories = projects
      .map((project) => project.category)
      .filter(Boolean);

    return ["All", ...new Set(categories)];
  }, [projects]);

  // ======================================================
  // FILTER PROJECTS
  // ======================================================

  const filteredProjects = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return [...projects]
      .reverse()
      .filter((project) => {
        const matchesSearch =
          !searchValue ||
          project.title
            ?.toLowerCase()
            .includes(searchValue) ||
          project.category
            ?.toLowerCase()
            .includes(searchValue) ||
          project.client
            ?.toLowerCase()
            .includes(searchValue) ||
          project.description
            ?.toLowerCase()
            .includes(searchValue);

        const matchesCategory =
          categoryFilter === "All" ||
          project.category === categoryFilter;

        const matchesStatus =
          statusFilter === "All" ||
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
  // CLOSE FILTER WHEN CLICKING OUTSIDE
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
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

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

  // ======================================================
  // AUTO FOCUS
  // ======================================================

  useEffect(() => {
    if (!showModal) {
      return;
    }

    const timer = setTimeout(() => {
      titleInputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [showModal]);

  // ======================================================
  // LOCK BODY SCROLL
  // ======================================================

  useEffect(() => {
    if (showModal || viewingProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal, viewingProject]);

  // ======================================================
  // ADD PROJECT
  // ======================================================

  const handleAdd = () => {
    setEditingProject(null);

    setForm({
      ...EMPTY_FORM,
    });

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
      status: project.status || "Planning",
    });

    setErrors({});

    setImageError("");

    setShowModal(true);
  };

  // ======================================================
  // CLOSE FORM MODAL
  // ======================================================

  const closeModal = () => {
    setShowModal(false);

    setEditingProject(null);

    setForm({
      ...EMPTY_FORM,
    });

    setErrors({});

    setImageError("");
  };

  // ======================================================
  // HANDLE FORM CHANGE
  // ======================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    let newValue = value;

    if (
      ["title", "category", "client"].includes(
        name
      )
    ) {
      newValue = value.replace(
        /[^a-zA-Z\s&.,'-]/g,
        ""
      );
    }

    if (name === "year") {
      newValue = value
        .replace(/\D/g, "")
        .slice(0, 4);
    }

    setForm((previous) => ({
      ...previous,
      [name]: newValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // ======================================================
  // VALIDATION
  // ======================================================

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title =
        "Project title is required.";
    }

    if (!form.category.trim()) {
      newErrors.category =
        "Project category is required.";
    }

    if (!form.client.trim()) {
      newErrors.client =
        "Client name is required.";
    }

    if (!/^\d{4}$/.test(form.year)) {
      newErrors.year =
        "Enter a valid 4-digit year.";
    } else {
      const year = Number(form.year);

      if (year < 1900 || year > 2100) {
        newErrors.year =
          "Enter a valid year.";
      }
    }

    if (!form.description.trim()) {
      newErrors.description =
        "Description is required.";
    }

    if (!form.longDescription.trim()) {
      newErrors.longDescription =
        "Long description is required.";
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

    if (!file) {
      return;
    }

    try {
      setImageError("");

      const imageData =
        await readAndShrinkImage(file);

      setForm((previous) => ({
        ...previous,
        image: imageData,
      }));

      setErrors((previous) => ({
        ...previous,
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

    if (editingProject) {
      setProjects((previousProjects) =>
        previousProjects.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                title: form.title.trim(),
                category:
                  form.category.trim(),
                description:
                  form.description.trim(),
                longDescription:
                  form.longDescription.trim(),
                client: form.client.trim(),
                year: form.year,
                image: form.image,
                status: form.status,
              }
            : project
        )
      );
    } else {
      const newProject = {
        id: nextId(projects),
        title: form.title.trim(),
        category: form.category.trim(),
        description:
          form.description.trim(),
        longDescription:
          form.longDescription.trim(),
        client: form.client.trim(),
        year: form.year,
        image: form.image,
        status: form.status,
        isAdminCreated: true,
      };

      setProjects((previousProjects) => [
        ...previousProjects,
        newProject,
      ]);
    }

    closeModal();
  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setProjects((previousProjects) =>
      previousProjects.filter(
        (item) => item.id !== project.id
      )
    );
  };

  // ======================================================
  // FORM MODAL CLICK
  // ======================================================

  const handleFormModalClick = (event) => {
    if (
      event.target === event.currentTarget
    ) {
      closeModal();
    }
  };

  // ======================================================
  // VIEW MODAL CLICK
  // ======================================================

  const handleViewModalClick = (event) => {
    if (
      event.target === event.currentTarget
    ) {
      setViewingProject(null);
    }
  };

  // ======================================================
  // STATUS CLASS
  // ======================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Planning":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // ======================================================
  // RETURN
  // ======================================================

  return (
    <div className="w-full min-w-0">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all your projects from here.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:w-auto"
        >
          <Plus size={18} />

          Add Project
        </button>
      </div>

      {/* ==================================================
    SEARCH + FILTERS
================================================== */}

<div className="mb-5 w-full min-w-0">
  <div className="flex w-full min-w-0 flex-col gap-3 lg:flex-row">

    {/* SEARCH */}

    <div className="relative min-w-0 flex-1">
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
        className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
      />
    </div>

    {/* FILTERS */}

    <div
      ref={filterDropdownRef}
      className="grid w-full min-w-0 grid-cols-1 gap-3 min-[350px]:grid-cols-2 lg:w-auto lg:flex"
    >

      {/* CATEGORY FILTER */}

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
          className="flex w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 min-[400px]:px-4 lg:min-w-[180px]"
        >
          <span className="min-w-0 truncate">
            Category: {categoryFilter}
          </span>

          <ChevronDown
            size={17}
            className={`shrink-0 transition ${
              openFilter === "category"
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        {openFilter === "category" && (
          <div className="absolute left-0 top-full z-30 mt-2 max-h-60 w-full min-w-0 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl lg:min-w-[180px]">
            {categoryOptions.map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setCategoryFilter(category);
                    setOpenFilter(null);
                  }}
                  className={`block w-full px-3 py-2.5 text-left text-sm transition hover:bg-slate-50 min-[400px]:px-4 ${
                    categoryFilter === category
                      ? "bg-indigo-50 font-semibold text-indigo-600"
                      : "text-slate-700"
                  }`}
                >
                  <span className="block truncate">
                    {category}
                  </span>
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* STATUS FILTER */}

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
          className="flex w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 min-[400px]:px-4 lg:min-w-[180px]"
        >
          <span className="min-w-0 truncate">
            Status: {statusFilter}
          </span>

          <ChevronDown
            size={17}
            className={`shrink-0 transition ${
              openFilter === "status"
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        {openFilter === "status" && (
          <div className="absolute right-0 top-full z-30 mt-2 w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl lg:min-w-[180px]">
            {[
              "All",
              ...STATUS_OPTIONS,
            ].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => {
                  setStatusFilter(status);
                  setOpenFilter(null);
                }}
                className={`block w-full px-3 py-2.5 text-left text-sm transition hover:bg-slate-50 min-[400px]:px-4 ${
                  statusFilter === status
                    ? "bg-indigo-50 font-semibold text-indigo-600"
                    : "text-slate-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  </div>

      </div>

      {/* ==================================================
          PROJECT TABLE
      ================================================== */}

      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Project
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Client
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Year
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <ImagePlus
                                size={18}
                                className="text-slate-400"
                              />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">
                            {project.title}
                          </p>

                          <p className="text-xs text-slate-400">
                            {project.id}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {project.category}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {project.client}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {project.year}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            setViewingProject(project)
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                          title="View"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(project)
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(project)
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
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
                    className="px-5 py-12 text-center"
                  >
                    <Search
                      size={26}
                      className="mx-auto text-slate-400"
                    />

                    <p className="mt-3 font-semibold text-slate-700">
                      No projects found
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Try changing your search or
                      filters.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}

        <div className="divide-y divide-slate-100 md:hidden">

          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-4"
              >

                <div className="flex min-w-0 gap-3">

                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
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

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <div className="min-w-0 flex-1">
                        <h3 className="break-words font-semibold text-slate-900">
                          {project.title}
                        </h3>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {project.id}
                        </p>
                      </div>

                      <span
                        className={`max-w-[100px] shrink-0 rounded-full px-2.5 py-1 text-center text-[10px] font-semibold ${getStatusClass(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>

                    </div>

                    <p className="mt-2 break-words text-sm text-slate-500">
                      {project.category}
                    </p>

                    <p className="break-words text-sm text-slate-500">
                      {project.client} •{" "}
                      {project.year}
                    </p>

                  </div>

                </div>

                <div className="mt-4 flex justify-end gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setViewingProject(project)
                    }
                    className="rounded-lg bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(project)
                    }
                    className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(project)
                    }
                    className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>
            ))
          ) : (
            <div className="px-5 py-12 text-center">
              <Search
                size={26}
                className="mx-auto text-slate-400"
              />

              <p className="mt-3 font-semibold text-slate-700">
                No projects found
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Try changing your search or filters.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* ==================================================
          ADD / EDIT PROJECT MODAL
          MOBILE RESPONSIVE
      ================================================== */}

      {showModal && (
        <div
          onMouseDown={handleFormModalClick}
          className="fixed inset-0 z-[9999] overflow-y-auto bg-black/40 p-0 backdrop-blur-sm"
        >

          <div
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            className="mx-auto flex min-h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl sm:min-h-0 sm:max-h-[95vh] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-slate-200"
          >

            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">

              <div className="min-w-0 pr-3">
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  {editingProject
                    ? "Edit Project"
                    : "Add Project"}
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  {editingProject
                    ? "Update project information."
                    : "Add a new project to your portfolio."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >

              {/* FORM BODY */}

              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  {/* TITLE */}

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Project Title
                    </label>

                    <input
                      ref={titleInputRef}
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter project title"
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                        errors.title
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
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

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Category
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="Residential"
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                        errors.category
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                    />

                    {errors.category && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.category}
                      </p>
                    )}

                  </div>

                  {/* CLIENT */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Client
                    </label>

                    <input
                      type="text"
                      name="client"
                      value={form.client}
                      onChange={handleChange}
                      placeholder="Client name"
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                        errors.client
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
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

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Completion Year
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      placeholder="2026"
                      maxLength={4}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                        errors.year
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                    />

                    {errors.year && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.year}
                      </p>
                    )}

                  </div>

                  {/* STATUS */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Status
                    </label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full rounded-xl cursor-pointer border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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

                  {/* DESCRIPTION */}

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Enter short project description"
                      className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                        errors.description
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                    />

                    {errors.description && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.description}
                      </p>
                    )}

                  </div>

                  {/* LONG DESCRIPTION */}

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Long Description
                    </label>

                    <textarea
                      name="longDescription"
                      value={form.longDescription}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Enter detailed project description"
                      className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                        errors.longDescription
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                    />

                    {errors.longDescription && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.longDescription}
                      </p>
                    )}

                  </div>

                  {/* IMAGE */}

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Project Image
                    </label>

                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30">

                      <ImagePlus
                        size={28}
                        className="text-slate-400"
                      />

                      <span className="mt-2 text-sm font-medium text-slate-600">
                        Click to upload image
                      </span>

                      <span className="mt-1 text-xs text-slate-400">
                        JPG, PNG or WEBP • Max 10 MB
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />

                    </label>

                    {form.image && (
                      <div className="relative mt-4 overflow-hidden rounded-xl border border-slate-200">

                        <img
                          src={form.image}
                          alt="Project preview"
                          className="h-40 w-full bg-slate-50 object-contain sm:h-48"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setForm((previous) => ({
                              ...previous,
                              image: "",
                            }))
                          }
                          className="absolute right-2 top-2 rounded-lg bg-black/60 p-2 text-white transition hover:bg-black/80"
                        >
                          <X size={16} />
                        </button>

                      </div>
                    )}

                    {(errors.image ||
                      imageError) && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.image ||
                          imageError}
                      </p>
                    )}

                  </div>

                </div>
              </div>

              {/* MODAL FOOTER */}

              <div className="flex shrink-0 flex-col gap-3 border-t border-slate-200 bg-white px-4 py-4 sm:flex-row sm:justify-end sm:px-6">

                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
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
          className="fixed inset-0 z-[9999] overflow-y-auto bg-black/40 p-0 backdrop-blur-sm"
        >

          <div
            className="mx-auto min-h-[100dvh] w-full overflow-y-auto bg-white shadow-2xl sm:min-h-0 sm:max-h-[90vh] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-slate-200"
          >

            {/* VIEW HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">

              <div className="min-w-0 pr-3">
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Project Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {viewingProject.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setViewingProject(null)
                }
                className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* VIEW CONTENT */}

            <div className="p-4 sm:p-6">

              {/* IMAGE */}

              {viewingProject.image && (
                <div className="mb-6 overflow-hidden rounded-2xl bg-slate-100">

                  <img
                    src={viewingProject.image}
                    alt={viewingProject.title}
                    className="max-h-[300px] w-full object-contain sm:max-h-[420px]"
                  />

                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* TITLE */}

                <div className="sm:col-span-2">

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Project Name
                  </p>

                  <h3 className="mt-1 break-words text-xl font-bold text-slate-900 sm:text-2xl">
                    {viewingProject.title}
                  </h3>

                </div>

                {/* CATEGORY */}

                <div className="min-w-0">

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Category
                  </p>

                  <p className="mt-1 break-words text-sm font-medium text-slate-700">
                    {viewingProject.category}
                  </p>

                </div>

                {/* CLIENT */}

                <div className="min-w-0">

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Client
                  </p>

                  <p className="mt-1 break-words text-sm font-medium text-slate-700">
                    {viewingProject.client}
                  </p>

                </div>

                {/* YEAR */}

                <div>

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Year
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {viewingProject.year}
                  </p>

                </div>

                {/* STATUS */}

                <div>

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      viewingProject.status
                    )}`}
                  >
                    {viewingProject.status}
                  </span>

                </div>

                {/* DESCRIPTION */}

                <div className="sm:col-span-2">

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Description
                  </p>

                  <p className="mt-2 whitespace-pre-line break-words text-sm leading-7 text-slate-600">
                    {viewingProject.description}
                  </p>

                </div>

                {/* LONG DESCRIPTION */}

                {viewingProject.longDescription && (
                  <div className="sm:col-span-2">

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Detailed Description
                    </p>

                    <p className="mt-2 whitespace-pre-line break-words text-sm leading-7 text-slate-600">
                      {
                        viewingProject.longDescription
                      }
                    </p>

                  </div>
                )}

              </div>
            </div>

            {/* VIEW FOOTER */}

            <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6">

              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setViewingProject(null)
                  }
                  className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Projects;