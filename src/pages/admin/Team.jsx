
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { nextId } from "../../utils";

function Team({ team = [], setTeam }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const filteredTeam = useMemo(() => {
    const term = search.toLowerCase();

    return team.filter((member) =>
      [
        member.name,
        member.role,
        member.email,
        member.phone,
        member.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [team, search]);

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      email: "",
      phone: "",
      status: "Active",
    });
  };

  const openAdd = () => {
    setEditingMember(null);
    resetForm();
    setShowModal(true);
  };

  const openEdit = (member) => {
    setEditingMember(member);

    setForm({
      name: member.name || "",
      role: member.role || "",
      email: member.email || "",
      phone: member.phone || "",
      status: member.status || "Active",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
    resetForm();
  };

  /*
   * Allow only specific characters for each field.
   *
   * Normal keyboard controls such as:
   * Backspace, Delete, Tab, Arrow keys,
   * Ctrl+A, Ctrl+C, Ctrl+V, Home, End
   * continue to work normally.
   */
  const sanitizeValue = (name, value) => {
    switch (name) {
      // Name:
      // Letters, spaces, apostrophe, dot and hyphen
      case "name":
        return value.replace(/[^a-zA-Z\s.'-]/g, "");

      // Role:
      // Letters, numbers, spaces, slash, &, dot and hyphen
      case "role":
        return value.replace(/[^a-zA-Z0-9\s/&.-]/g, "");

      // Email:
      // Standard email characters
      case "email":
        return value.replace(/[^a-zA-Z0-9@._%+-]/g, "");

      // Phone:
      // Numbers and common phone symbols
      case "phone":
        return value.replace(/[^0-9+\-()\s]/g, "");

      // Status comes from select
      case "status":
        return value;

      default:
        return value;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const sanitizedValue = sanitizeValue(name, value);

    setForm((previous) => ({
      ...previous,
      [name]: sanitizedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter team member name.");
      return;
    }

    if (!form.role.trim()) {
      alert("Please enter team member role.");
      return;
    }

    if (form.email.trim()) {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(form.email.trim())) {
        alert("Please enter a valid email address.");
        return;
      }
    }

    if (form.phone.trim()) {
      const phoneDigits = form.phone.replace(/\D/g, "");

      if (
        phoneDigits.length < 7 ||
        phoneDigits.length > 15
      ) {
        alert("Please enter a valid phone number.");
        return;
      }
    }

    const cleanMember = {
      ...form,
      name: form.name.trim(),
      role: form.role.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    if (editingMember) {
      setTeam(
        team.map((member) =>
          String(member.id) === String(editingMember.id)
            ? {
                ...member,
                ...cleanMember,
              }
            : member
        )
      );
    } else {
      setTeam([
        ...team,
        {
          id: nextId(team),
          ...cleanMember,
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this team member?")) {
      return;
    }

    setTeam(
      team.filter(
        (member) =>
          String(member.id) !== String(id)
      )
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Team
          </h1>

          <p className="mt-1 text-slate-500">
            Manage your agency team members.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Member
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
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search team members..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
          />

        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Email
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

              {filteredTeam.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No team members found.
                  </td>

                </tr>

              ) : (

                filteredTeam.map((member) => (

                  <tr
                    key={member.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                      <p className="font-semibold text-slate-900">
                        {member.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {member.phone || "-"}
                      </p>

                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {member.role || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {member.email || "-"}
                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                        {member.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            openEdit(member)
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(member.id)
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

          <div className="w-full max-w-2xl rounded-2xl bg-white">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-6">

              <h2 className="text-xl font-bold text-slate-900">
                {editingMember
                  ? "Edit Team Member"
                  : "Add Team Member"}
              </h2>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              <Input
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />

              <Input
                label="Role"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="UI/UX Designer"
                required
              />

              <div className="grid gap-5 sm:grid-cols-2">

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />

                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                />

              </div>

              {/* Status */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                  {editingMember
                    ? "Update Member"
                    : "Create Member"}
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

export default Team;
