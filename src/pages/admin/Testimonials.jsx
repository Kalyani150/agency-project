import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Star,
} from "lucide-react";

import { nextId } from "../../utils";

function AdminTestimonials({
  testimonials = [],
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
}) {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    rating: "5",
    message: "",
    status: "Published",
  });

  // ======================================================
  // SANITIZE INPUT
  // ======================================================

  const sanitizeValue = (name, value) => {
    switch (name) {
      case "name":
        return value.replace(/[^a-zA-Z\s.'-]/g, "");

      case "company":
        return value.replace(/[^a-zA-Z0-9\s&./-]/g, "");

      case "role":
        return value.replace(/[^a-zA-Z0-9\s&./-]/g, "");

      case "rating":
        return ["1", "2", "3", "4", "5"].includes(value)
          ? value
          : "5";

      case "message":
        return value.replace(
          /[^a-zA-Z0-9\s.,!?'"()&:/@#$%*+\-]/g,
          ""
        );

      case "status":
        return value;

      default:
        return value;
    }
  };

  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    const sanitizedValue = sanitizeValue(name, value);

    setForm((previous) => ({
      ...previous,
      [name]: sanitizedValue,
    }));
  };

  // ======================================================
  // OPEN ADD MODAL
  // ======================================================

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      name: "",
      company: "",
      role: "",
      rating: "5",
      message: "",
      status: "Published",
    });

    setShowModal(true);
  };

  // ======================================================
  // OPEN EDIT MODAL
  // ======================================================

  const openEditModal = (testimonial) => {
    setEditingId(testimonial.id);

    setForm({
      name: testimonial.name || "",
      company: testimonial.company || "",
      role: testimonial.role || "",
      rating: String(testimonial.rating || "5"),
      message: testimonial.message || "",
      status: testimonial.status || "Published",
    });

    setShowModal(true);
  };

  // ======================================================
  // CLOSE MODAL
  // ======================================================

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);

    setForm({
      name: "",
      company: "",
      role: "",
      rating: "5",
      message: "",
      status: "Published",
    });
  };

  // ======================================================
  // HANDLE SUBMIT
  // ======================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanName = form.name.trim();
    const cleanCompany = form.company.trim();
    const cleanRole = form.role.trim();
    const cleanMessage = form.message.trim();

    if (!cleanName) {
      alert("Please enter the testimonial name.");
      return;
    }

    if (!cleanMessage) {
      alert("Please enter the testimonial message.");
      return;
    }

    const testimonialData = {
      name: cleanName,
      company: cleanCompany,
      role: cleanRole,
      rating: Number(form.rating) || 5,
      message: cleanMessage,
      status: form.status,
    };

    if (editingId !== null) {
      updateTestimonial(editingId, testimonialData);
    } else {
      addTestimonial({
        id: nextId(testimonials),
        ...testimonialData,
      });
    }

    closeModal();
  };

  // ======================================================
  // DELETE TESTIMONIAL
  // ======================================================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmed) return;

    deleteTestimonial(id);
  };

  // ======================================================
  // SEARCH
  // ======================================================

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return true;

    return (
      testimonial.name?.toLowerCase().includes(search) ||
      testimonial.company?.toLowerCase().includes(search) ||
      testimonial.role?.toLowerCase().includes(search) ||
      testimonial.message?.toLowerCase().includes(search)
    );
  });

  // ======================================================
  // RATING STARS
  // ======================================================

  const renderStars = (rating) => {
    const value = Number(rating) || 0;

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= value
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Testimonials
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage customer testimonials and reviews.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search testimonials..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* ==================================================
          TESTIMONIAL TABLE
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Customer
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Company
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Role
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Rating
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
              {filteredTestimonials.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No testimonials found.
                  </td>
                </tr>
              ) : (
                filteredTestimonials.map((testimonial) => (
                  <tr
                    key={testimonial.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    {/* CUSTOMER */}

                    <td className="px-5 py-4">
                      <div className="max-w-[220px]">
                        <p className="truncate font-semibold text-slate-900">
                          {testimonial.name}
                        </p>

                        <p className="mt-1 truncate text-sm text-slate-500">
                          {testimonial.message}
                        </p>
                      </div>
                    </td>

                    {/* COMPANY */}

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {testimonial.company || "-"}
                    </td>

                    {/* ROLE */}

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {testimonial.role || "-"}
                    </td>

                    {/* RATING */}

                    <td className="px-5 py-4">
                      {renderStars(testimonial.rating)}
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          testimonial.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {testimonial.status}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(testimonial)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(testimonial.id)
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
          onMouseDown={(e) => {
            // Close ONLY when clicking the background
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          {/* ==================================================
              MODAL FORM
          ================================================== */}

          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onMouseDown={(e) => {
              // Prevent clicks inside modal from closing it
              e.stopPropagation();
            }}
          >
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  {editingId !== null
                    ? "Edit Testimonial"
                    : "Add Testimonial"}
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  {editingId !== null
                    ? "Update testimonial information."
                    : "Add a new customer testimonial."}
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
              className="space-y-5 p-5 sm:p-6"
            >
              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </div>

              {/* COMPANY */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  autoComplete="organization"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* ROLE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="e.g. CEO, Founder, Manager"
                  autoComplete="organization-title"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* RATING */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Rating
                </label>

                <div className="flex items-center gap-3">
                  <select
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-40"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>

                  {renderStars(form.rating)}
                </div>
              </div>

              {/* MESSAGE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter customer testimonial..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
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
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
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
                  {editingId !== null
                    ? "Update Testimonial"
                    : "Add Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTestimonials;