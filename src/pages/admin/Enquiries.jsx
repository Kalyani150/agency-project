import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  X,
} from "lucide-react";

function Enquiries({
  enquiries = [],
  setEnquiries,
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filteredEnquiries = useMemo(() => {
    const term = search.toLowerCase();

    return enquiries.filter((item) =>
      [
        item.name,
        item.email,
        item.phone,
        item.service,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [enquiries, search]);

  const updateStatus = (id, status) => {
    setEnquiries(
      enquiries.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );
  };

  const deleteEnquiry = (id) => {
    const confirmed = window.confirm(
      "Delete this enquiry?"
    );

    if (!confirmed) return;

    setEnquiries(
      enquiries.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Enquiries
        </h1>

        <p className="mt-1 text-slate-500">
          Manage enquiries received from your website.
        </p>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
          />
        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="bg-slate-50">

              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Service
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Budget
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

              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-6 py-4 font-medium text-slate-900">
                      {item.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.service || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.budget || "-"}
                    </td>

                    <td className="px-6 py-4">

                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateStatus(
                            item.id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                      >
                        <option value="New">
                          New
                        </option>

                        <option value="Contacted">
                          Contacted
                        </option>

                        <option value="Proposal Sent">
                          Proposal Sent
                        </option>

                        <option value="Won">
                          Won
                        </option>

                        <option value="Lost">
                          Lost
                        </option>
                      </select>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            setSelected(item)
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() =>
                            deleteEnquiry(item.id)
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

      {/* View Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white">

            <div className="flex items-center justify-between border-b border-slate-200 p-6">

              <h2 className="text-xl font-bold text-slate-900">
                Enquiry Details
              </h2>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="space-y-4 p-6">

              <Detail
                label="Name"
                value={selected.name}
              />

              <Detail
                label="Email"
                value={selected.email}
              />

              <Detail
                label="Phone"
                value={selected.phone}
              />

              <Detail
                label="Service"
                value={selected.service}
              />

              <Detail
                label="Budget"
                value={selected.budget}
              />

              <Detail
                label="Date"
                value={selected.date}
              />

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Message
                </p>

                <p className="mt-1 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  {selected.message}
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-700">
        {label}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {value || "-"}
      </p>
    </div>
  );
}

export default Enquiries;