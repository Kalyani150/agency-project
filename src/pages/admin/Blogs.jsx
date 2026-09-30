import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { nextId } from "../../utils";

function Blogs({ blogs = [], setBlogs }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    author: "",
    date: "",
    readTime: "",
    excerpt: "",
    content: "",
    status: "Published",
  });

  const filteredBlogs = useMemo(() => {
    const term = search.toLowerCase();

    return blogs.filter((blog) =>
      [
        blog.title,
        blog.category,
        blog.author,
        blog.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [blogs, search]);

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      author: "",
      date: "",
      readTime: "",
      excerpt: "",
      content: "",
      status: "Published",
    });
  };

  const openAdd = () => {
    setEditingBlog(null);
    resetForm();
    setShowModal(true);
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);

    setForm({
      title: blog.title || "",
      category: blog.category || "",
      author: blog.author || "",
      date: blog.date || "",
      readTime: blog.readTime || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      status: blog.status || "Published",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBlog(null);
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

    if (editingBlog) {
      setBlogs(
        blogs.map((blog) =>
          blog.id === editingBlog.id
            ? { ...blog, ...form }
            : blog
        )
      );
    } else {
      setBlogs([
        ...blogs,
        {
          id: nextId(blogs),
          ...form,
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this blog post?")) return;

    setBlogs(
      blogs.filter((blog) => blog.id !== id)
    );
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Blogs
          </h1>

          <p className="mt-1 text-slate-500">
            Create and manage your blog posts.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Blog
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
            placeholder="Search blogs..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
          />

        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead className="bg-slate-50">
              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Blog
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Author
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Date
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

              {filteredBlogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No blogs found.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                      <p className="font-semibold text-slate-900">
                        {blog.title}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {blog.readTime || "-"}
                      </p>

                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {blog.category || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {blog.author || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {blog.date || "-"}
                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                        {blog.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() => openEdit(blog)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(blog.id)}
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

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">

            <div className="flex items-center justify-between border-b border-slate-200 p-6">

              <h2 className="text-xl font-bold text-slate-900">
                {editingBlog ? "Edit Blog" : "Add Blog"}
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
                label="Blog Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <div className="grid gap-5 sm:grid-cols-2">

                <Input
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                />

                <Input
                  label="Read Time"
                  name="readTime"
                  value={form.readTime}
                  onChange={handleChange}
                  placeholder="5 min read"
                />

              </div>

              <Textarea
                label="Excerpt"
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
              />

              <Textarea
                label="Content"
                name="content"
                value={form.content}
                onChange={handleChange}
                rows="8"
              />

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
                  <option>Draft</option>
                </select>

              </div>

              <ModalButtons
                editing={editingBlog}
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
  type = "text",
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
        type={type}
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

function Textarea({
  label,
  name,
  value,
  onChange,
  rows = 4,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
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
        {editing ? "Update Blog" : "Create Blog"}
      </button>

    </div>
  );
}

export default Blogs;