import { useMemo, useState } from "react";
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

// Shrinks a picked image so it fits comfortably in browser storage.
function readAndShrinkImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Could not read the file."));

    reader.onload = () => {
      const image = new Image();

      image.onerror = () =>
        reject(new Error("This file is not a valid image."));

      image.onload = () => {
        const scale = Math.min(
          1,
          MAX_IMAGE_DIMENSION / Math.max(image.width, image.height)
        );

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        canvas
          .getContext("2d")
          .drawImage(image, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

function Projects({ projects = [], setProjects }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [imageError, setImageError] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    shortDescription: "",
    client: "",
    year: "",
    image: "",
    status: "Completed",
  });

  const filteredProjects = useMemo(() => {
    const term = search.toLowerCase();

    return projects.filter((project) =>
      [
        project.title,
        project.category,
        project.description,
        project.client,
        project.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [projects, search]);

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      description: "",
      shortDescription: "",
      client: "",
      year: "",
      image: "",
      status: "Completed",
    });
  };

  const openAddModal = () => {
    setEditingProject(null);
    setImageError("");
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setImageError("");

    setForm({
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
      shortDescription: project.shortDescription || "",
      client: project.client || "",
      year: project.year || "",
      image: project.image || "",
      status: project.status || "Completed",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    resetForm();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0];

    // Allow picking the same file again later.
    e.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file (JPG, PNG, WebP...).");
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      setImageError("That picture is too large. Please choose one under 10 MB.");
      return;
    }

    try {
      const dataUrl = await readAndShrinkImage(file);

      setForm((current) => ({ ...current, image: dataUrl }));
      setImageError("");
    } catch (error) {
      setImageError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProject) {
      setProjects(
        projects.map((project) =>
          project.id === editingProject.id
            ? { ...project, ...form }
            : project
        )
      );
    } else {
      setProjects([
        ...projects,
        {
          id: nextId(projects),
          ...form,
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this project?")) return;

    setProjects(
      projects.filter((project) => project.id !== id)
    );
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Projects
          </h1>

          <p className="mt-1 text-slate-500">
            Manage your agency portfolio projects.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Project
        </button>

      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
          />

        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-slate-50">
              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Project
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Client
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

              {filteredProjects.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No projects found.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-6 py-4 text-sm text-slate-500">
                      #{project.id}
                    </td>

                    <td className="px-6 py-4">

                      <p className="font-semibold text-slate-900">
                        {project.title}
                      </p>

                      <p className="mt-1 max-w-xs truncate text-sm text-slate-500">
                        {project.description}
                      </p>

                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {project.category || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {project.client || "-"}
                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                        {project.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            openEditModal(project)
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(project.id)
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">

            <div className="flex items-center justify-between border-b border-slate-200 p-6">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingProject
                    ? "Edit Project"
                    : "Add Project"}
                </h2>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              <Input
                label="Project Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="MarketHub"
                required
              />

              <Input
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Web Development"
                required
              />

              <Input
                label="Client"
                name="client"
                value={form.client}
                onChange={handleChange}
                placeholder="ABC Company"
              />

              <Input
                label="Year"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2026"
              />

              <Input
                label="Short Description"
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="One-line summary shown on project cards"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  rows="5"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Project Image
                </label>

                <div className="flex gap-4">

                  <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-slate-400">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImagePlus size={24} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-3">

                    <input
                      type="text"
                      name="image"
                      value={
                        form.image.startsWith("data:")
                          ? ""
                          : form.image
                      }
                      onChange={handleChange}
                      placeholder={
                        form.image.startsWith("data:")
                          ? "Uploaded from your device"
                          : "Paste image URL (https://...)"
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                    />

                    <div className="flex flex-wrap items-center gap-3">

                      <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                        <ImagePlus size={16} />
                        Choose from device
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFile}
                          className="hidden"
                        />
                      </label>

                      {form.image && (
                        <button
                          type="button"
                          onClick={() =>
                            setForm({ ...form, image: "" })
                          }
                          className="text-sm font-semibold text-red-600 hover:text-red-700"
                        >
                          Remove image
                        </button>
                      )}

                    </div>

                    {imageError && (
                      <p className="text-sm text-red-600">
                        {imageError}
                      </p>
                    )}

                  </div>

                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Paste a link, or pick a picture from your computer or phone gallery.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
                >
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Planning</option>
                </select>
              </div>

              <ModalButtons
                editing={editingProject}
                onCancel={closeModal}
              />

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
      />
    </div>
  );
}

function ModalButtons({ editing, onCancel }) {
  return (
    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

      <button
        type="button"
        onClick={onCancel}
        className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
      >
        {editing ? "Update Project" : "Create Project"}
      </button>

    </div>
  );
}

export default Projects;
