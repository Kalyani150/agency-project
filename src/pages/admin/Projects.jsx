
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ImagePlus,
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

/* =========================================================
   IMAGE RESIZE / COMPRESSION
========================================================= */

function readAndShrinkImage(file) {
  return new Promise((resolve, reject) => {
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
              (height / width) *
              MAX_IMAGE_DIMENSION;
            width = MAX_IMAGE_DIMENSION;
          } else {
            width =
              (width / height) *
              MAX_IMAGE_DIMENSION;
            height = MAX_IMAGE_DIMENSION;
          }
        }

        const canvas =
          document.createElement("canvas");

        canvas.width = Math.round(width);
        canvas.height = Math.round(height);

        const context =
          canvas.getContext("2d");

        if (!context) {
          reject(
            new Error(
              "Unable to process image."
            )
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

        resolve(
          canvas.toDataURL(
            "image/jpeg",
            JPEG_QUALITY
          )
        );
      };

      image.onerror = () => {
        reject(
          new Error("Invalid image file.")
        );
      };

      image.src = reader.result;
    };

    reader.onerror = () => {
      reject(
        new Error("Unable to read image.")
      );
    };

    reader.readAsDataURL(file);
  });
}

/* =========================================================
   COMPONENT
========================================================= */

function Projects({
  projects = [],
  setProjects,
}) {
  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState(null);

  const [form, setForm] =
    useState(EMPTY_FORM);

  const [errors, setErrors] =
    useState({});

  const [imageError, setImageError] =
    useState("");

  const titleInputRef =
    useRef(null);

  /* =======================================================
     FILTER PROJECTS
  ======================================================= */

  const filteredProjects = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {
      return projects;
    }

    return projects.filter((project) => {
      return (
        String(project.title || "")
          .toLowerCase()
          .includes(keyword) ||
        String(project.category || "")
          .toLowerCase()
          .includes(keyword) ||
        String(project.client || "")
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [projects, search]);

  /* =======================================================
     MODAL FOCUS
  ======================================================= */

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [showModal]);

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (
        event.key === "Escape" &&
        showModal
      ) {
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
  }, [showModal]);

  /* =======================================================
     KEYBOARD VALIDATION
  ======================================================= */

  const handleTextKeyDown = (event) => {
    if (
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    if (
      navigationKeys.includes(event.key)
    ) {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      return;
    }

    if (
      !/^[a-zA-Z0-9 &.'-]$/.test(
        event.key
      )
    ) {
      event.preventDefault();
    }
  };

  const handleYearKeyDown = (event) => {
    if (
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    if (
      navigationKeys.includes(event.key)
    ) {
      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleDescriptionKeyDown = (
    event
  ) => {
    if (
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    if (
      navigationKeys.includes(event.key) ||
      event.key === "Enter"
    ) {
      return;
    }

    if (event.key.length === 1) {
      return;
    }

    event.preventDefault();
  };

  /* =======================================================
     OPEN ADD MODAL
  ======================================================= */

  const openAddModal = () => {
    setEditingProject(null);
    setForm({
      ...EMPTY_FORM,
    });
    setErrors({});
    setImageError("");
    setShowModal(true);
  };

  /* =======================================================
     OPEN EDIT MODAL
  ======================================================= */

  const openEditModal = (project) => {
    setEditingProject(project);

    setForm({
      title: project.title || "",
      category: project.category || "",
      description:
        project.description || "",
      shortDescription:
        project.shortDescription || "",
      client: project.client || "",
      year: project.year
        ? String(project.year)
        : "",
      image: project.image || "",
      status:
        project.status || "Completed",
    });

    setErrors({});
    setImageError("");
    setShowModal(true);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setForm({
      ...EMPTY_FORM,
    });
    setErrors({});
    setImageError("");
  };

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    let cleanValue = value;

    if (
      name === "title" ||
      name === "category" ||
      name === "client"
    ) {
      cleanValue = value
        .replace(
          /[^a-zA-Z0-9 &.'-]/g,
          ""
        )
        .replace(/^\s+/, "")
        .replace(/\s{2,}/g, " ");
    }

    if (name === "year") {
      cleanValue = value
        .replace(/\D/g, "")
        .slice(0, 4);
    }

    if (
      name === "description" ||
      name === "shortDescription"
    ) {
      cleanValue = value.replace(
        /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,
        ""
      );
    }

    setForm((current) => ({
      ...current,
      [name]: cleanValue,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  /* =======================================================
     IMAGE UPLOAD
  ======================================================= */

  const handleImageChange = async (
    event
  ) => {
    const file =
      event.target.files?.[0];

    setImageError("");

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith("image/")
    ) {
      setImageError(
        "Please select a valid image file."
      );
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      setImageError(
        "Image must be smaller than 10 MB."
      );
      return;
    }

    try {
      const imageData =
        await readAndShrinkImage(file);

      setForm((current) => ({
        ...current,
        image: imageData,
      }));
    } catch (error) {
      console.error(error);

      setImageError(
        "Unable to process this image."
      );
    }
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    const newErrors = {};

    const title =
      form.title.trim();

    const category =
      form.category.trim();

    const client =
      form.client.trim();

    const year =
      form.year.trim();

    const shortDescription =
      form.shortDescription.trim();

    const description =
      form.description.trim();

    if (!title) {
      newErrors.title =
        "Project title is required.";
    } else if (title.length < 3) {
      newErrors.title =
        "Title must contain at least 3 characters.";
    } else if (title.length > 100) {
      newErrors.title =
        "Title cannot exceed 100 characters.";
    }

    if (!category) {
      newErrors.category =
        "Category is required.";
    } else if (category.length < 2) {
      newErrors.category =
        "Category must contain at least 2 characters.";
    } else if (category.length > 50) {
      newErrors.category =
        "Category cannot exceed 50 characters.";
    }

    if (client.length > 100) {
      newErrors.client =
        "Client cannot exceed 100 characters.";
    }

    if (year) {
      if (!/^\d{4}$/.test(year)) {
        newErrors.year =
          "Year must contain exactly 4 digits.";
      } else {
        const numericYear =
          Number(year);

        if (
          numericYear < 1900 ||
          numericYear > 2100
        ) {
          newErrors.year =
            "Year must be between 1900 and 2100.";
        }
      }
    }

    if (
      shortDescription.length > 200
    ) {
      newErrors.shortDescription =
        "Short description cannot exceed 200 characters.";
    }

    if (!description) {
      newErrors.description =
        "Description is required.";
    } else if (
      description.length < 10
    ) {
      newErrors.description =
        "Description must contain at least 10 characters.";
    } else if (
      description.length > 1000
    ) {
      newErrors.description =
        "Description cannot exceed 1000 characters.";
    }

    if (
      !STATUS_OPTIONS.includes(
        form.status
      )
    ) {
      newErrors.status =
        "Please select a valid status.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length ===
      0
    );
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const cleanProject = {
      title: form.title.trim(),
      category:
        form.category.trim(),
      description:
        form.description.trim(),
      shortDescription:
        form.shortDescription.trim(),
      client:
        form.client.trim(),
      year: form.year.trim(),
      image: form.image,
      status: form.status,
    };

    if (editingProject) {
      setProjects(
        (currentProjects) =>
          currentProjects.map(
            (project) =>
              project.id ===
              editingProject.id
                ? {
                    ...project,
                    ...cleanProject,
                  }
                : project
          )
      );
    } else {
      const newProject = {
        id: nextId(projects),
        ...cleanProject,
      };

      setProjects(
        (currentProjects) => [
          ...currentProjects,
          newProject,
        ]
      );
    }

    closeModal();
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = (id) => {
    const project =
      projects.find(
        (item) => item.id === id
      );

    if (!project) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${project.title}"?`
      );

    if (!confirmed) {
      return;
    }

    setProjects(
      (currentProjects) =>
        currentProjects.filter(
          (item) => item.id !== id
        )
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="space-y-6">
      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-black">
            Projects
          </h1>

          <p className="mt-1 text-m text-slate-500">
            Manage projects displayed
            on your public website.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-500"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* ===================================================
          SEARCH
      =================================================== */}

      <div >
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search projects..."
            className="w-full rounded-xl border border-slate-700  py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* ===================================================
          TABLE
      =================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="px-5 py-4 text-s font-bold uppercase tracking-wider text-slate-300">
                  Project
                </th>

                <th className="px-5 py-4 text-s font-bold uppercase tracking-wider text-slate-300">
                  Category
                </th>

                <th className="px-5 py-4 text-s font-bold uppercase tracking-wider text-slate-300">
                  Client
                </th>

                <th className="px-5 py-4 text-s font-bold uppercase tracking-wider text-slate-300">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-s font-bold uppercase tracking-wider text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.length >
              0 ? (
                filteredProjects.map(
                  (project) => (
                    <tr
                      key={project.id}
                      className="border-b border-slate-800/70 transition hover:bg-slate-800/30"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                            {project.image ? (
                              <img
                                src={
                                  project.image
                                }
                                alt={
                                  project.title
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-slate-600">
                                <ImagePlus
                                  size={20}
                                />
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="font-bold text-white">
                              {
                                project.title
                              }
                            </p>

                            {project.year && (
                              <p className="mt-1 text-s text-slate-400">
                                {
                                  project.year
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-m text-slate-300">
                        {project.category ||
                          "-"}
                      </td>

                      <td className="px-5 py-4 text-m text-slate-300">
                        {project.client ||
                          "-"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full bg-indigo-500/10 px-3 py-1 text-s font-bold text-indigo-400">
                          {project.status ||
                            "Completed"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                project
                              )
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-500/10 hover:text-indigo-400"
                            title="Edit project"
                          >
                            <Pencil
                              size={17}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                project.id
                              )
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                            title="Delete project"
                          >
                            <Trash2
                              size={17}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-16 text-center"
                  >
                    <p className="font-semibold text-slate-400">
                      No projects found.
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      Add a project or
                      change your search.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===================================================
          ADD / EDIT MODAL
      =================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">

            {/* MODAL HEADER */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  {editingProject
                    ? "Edit Project"
                    : "Add Project"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Fill in the project
                  details below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-white p-6"
            >
              {/* =================================================
                  PROJECT TITLE
              ================================================= */}

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-400">
                  Project Title *
                </label>

                <input
                  ref={titleInputRef}
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  onKeyDown={
                    handleTextKeyDown
                  }
                  maxLength={100}
                  placeholder="Enter project title"
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                    errors.title
                      ? "border-red-500"
                      : "border-slate-300 focus:border-indigo-500"
                  }`}
                />

                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* =================================================
                  CATEGORY + CLIENT
              ================================================= */}

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Category *
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    onKeyDown={
                      handleTextKeyDown
                    }
                    maxLength={50}
                    placeholder="Web Development"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                      errors.category
                        ? "border-red-500"
                        : "border-slate-300 focus:border-indigo-500"
                    }`}
                  />

                  {errors.category && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Client
                  </label>

                  <input
                    type="text"
                    name="client"
                    value={form.client}
                    onChange={handleChange}
                    onKeyDown={
                      handleTextKeyDown
                    }
                    maxLength={100}
                    placeholder="Client name"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                      errors.client
                        ? "border-red-500"
                        : "border-slate-300 focus:border-indigo-500"
                    }`}
                  />

                  {errors.client && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.client}
                    </p>
                  )}
                </div>
              </div>

              {/* =================================================
                  YEAR + STATUS
              ================================================= */}

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Year
                  </label>

                  <input
                    type="text"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    onKeyDown={
                      handleYearKeyDown
                    }
                    maxLength={4}
                    inputMode="numeric"
                    placeholder="2026"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                      errors.year
                        ? "border-red-500"
                        : "border-slate-300 focus:border-indigo-500"
                    }`}
                  />

                  {errors.year && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.year}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500"
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

              {/* =================================================
                  SHORT DESCRIPTION
              ================================================= */}

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Short Description
                </label>

                <input
                  type="text"
                  name="shortDescription"
                  value={
                    form.shortDescription
                  }
                  onChange={handleChange}
                  maxLength={200}
                  placeholder="Short project summary"
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                    errors.shortDescription
                      ? "border-red-500"
                      : "border-slate-300 focus:border-indigo-500"
                  }`}
                />

                <div className="mt-1 flex justify-between">
                  {errors.shortDescription ? (
                    <p className="text-xs text-red-500">
                      {
                        errors.shortDescription
                      }
                    </p>
                  ) : (
                    <span />
                  )}

                  <span className="text-xs text-slate-400">
                    {
                      form
                        .shortDescription
                        .length
                    }
                    /200
                  </span>
                </div>
              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  onKeyDown={
                    handleDescriptionKeyDown
                  }
                  maxLength={1000}
                  rows={6}
                  placeholder="Describe the project..."
                  className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                    errors.description
                      ? "border-red-500"
                      : "border-slate-300 focus:border-indigo-500"
                  }`}
                />

                <div className="mt-1 flex justify-between">
                  {errors.description ? (
                    <p className="text-xs text-red-500">
                      {
                        errors.description
                      }
                    </p>
                  ) : (
                    <span />
                  )}

                  <span className="text-xs text-slate-400">
                    {
                      form.description
                        .length
                    }
                    /1000
                  </span>
                </div>
              </div>

              {/* =================================================
                  IMAGE UPLOAD
              ================================================= */}

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Project Image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-indigo-500 hover:bg-indigo-50/30">
                  <ImagePlus
                    size={30}
                    className="text-slate-400"
                  />

                  <span className="mt-2 text-sm font-semibold text-slate-700">
                    Click to upload image
                  </span>

                  <span className="mt-1 text-xs text-slate-400">
                    JPG, PNG, WEBP —
                    maximum 10 MB
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

                {imageError && (
                  <p className="mt-2 text-xs text-red-500">
                    {imageError}
                  </p>
                )}

                {/* IMAGE PREVIEW */}
                {form.image && (
                  <div className="relative mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <img
                      src={form.image}
                      alt="Project preview"
                      className="h-48 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setForm(
                          (current) => ({
                            ...current,
                            image: "",
                          })
                        )
                      }
                      className="absolute right-3 top-3 rounded-lg bg-black/70 p-2 text-white transition hover:bg-red-500"
                      aria-label="Remove image"
                    >
                      <X size={17} />
                    </button>
                  </div>
                )}
              </div>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-500"
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

