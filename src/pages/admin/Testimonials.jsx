import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { nextId } from "../../utils";

function Testimonials({
  testimonials = [],
  setTestimonials,
}) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    rating: "5",
    message: "",
    status: "Published",
  });

  const filteredTestimonials = useMemo(() => {
    const term = search.toLowerCase();

    return testimonials.filter((testimonial) =>
      [
        testimonial.name,
        testimonial.company,
        testimonial.role,
        testimonial.message,
        testimonial.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [testimonials, search]);

  const resetForm = () => {
    setForm({
      name: "",
      company: "",
      role: "",
      rating: "5",
      message: "",
      status: "Published",
    });
  };

  const openAdd = () => {
    setEditingTestimonial(null);
    resetForm();
    setShowModal(true);
  };

  const openEdit = (testimonial) => {
    setEditingTestimonial(testimonial);

    setForm({
      name: testimonial.name || "",
      company: testimonial.company || "",
      role: testimonial.role || "",
      rating: testimonial.rating || "5",
      message: testimonial.message || "",
      status: testimonial.status || "Published",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTestimonial(null);
    resetForm();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTestimonial) {
      setTestimonials(
        testimonials.map((testimonial) =>
          testimonial.id === editingTestimonial.id
            ? {
                ...testimonial,
                ...form,
              }
            : testimonial
        )
      );
    } else {
      setTestimonials([
        ...testimonials,
        {
          id: nextId(testimonials),
          ...form,
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this testimonial?")) {
      return;
    }

    setTestimonials(
      testimonials.filter(
        (testimonial) => testimonial.id !== id
      )
    );
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Testimonials
          </h1>

          <p className="mt-1 text-slate-500">
            Manage customer testimonials.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Testimonial
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
            placeholder="Search testimonials..."
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
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Company
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Rating
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

              {filteredTestimonials.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No testimonials found.
                  </td>
                </tr>
              ) : (
                filteredTestimonials.map((testimonial) => (
                  <tr
                    key={testimonial.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                      <p className="font-semibold text-slate-900">
                        {testimonial.name}
                      </p>

                      <p className="mt-1 max-w-xs truncate text-sm text-slate-500">
                        {testimonial.message}
                      </p>

                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {testimonial.company || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {testimonial.role || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-yellow-600">
                      ★ {testimonial.rating}
                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                        {testimonial.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            openEdit(testimonial)
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(testimonial.id)
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

              <h2 className="text-xl font-bold text-slate-900">
                {editingTestimonial
                  ? "Edit Testimonial"
                  : "Add Testimonial"}
              </h2>

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
                label="Customer Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <div className="grid gap-5 sm:grid-cols-2">

                <Input
                  label="Company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                />

                <Input
                  label="Role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Rating
                </label>

                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                >
                  <option>Published</option>
                  <option>Hidden</option>
                </select>

              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
                >
                  {editingTestimonial
                    ? "Update Testimonial"
                    : "Create Testimonial"}
                </button>

              </div>

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
        required={required}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
      />
    </div>
  );
}

export default Testimonials;