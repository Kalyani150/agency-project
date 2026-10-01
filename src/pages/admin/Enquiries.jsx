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

  // ======================================================
  // SEARCH
  // ======================================================

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

  // ======================================================
  // UPDATE STATUS
  // ======================================================

  const updateStatus = (id, status) => {
    setEnquiries(
      enquiries.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );
  };

  // ======================================================
  // DELETE ENQUIRY
  // ======================================================

  const deleteEnquiry = (id) => {
    const confirmed = window.confirm(
      "Delete this enquiry?"
    );

    if (!confirmed) return;

    setEnquiries(
      enquiries.filter((item) => item.id !== id)
    );

    // If deleted enquiry is currently open
    if (selected?.id === id) {
      setSelected(null);
    }
  };

  // ======================================================
  // CLOSE VIEW MODAL
  // ======================================================

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Enquiries
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage enquiries received from your website.
        </p>
      </div>

      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      {/* ==================================================
          TABLE
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Service
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Budget
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* NAME */}

                    <td className="px-6 py-4 font-medium text-slate-900">
                      {item.name}
                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.email}
                    </td>

                    {/* SERVICE */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.service || "-"}
                    </td>

                    {/* BUDGET */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.budget || "-"}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateStatus(
                            item.id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
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

                    {/* ACTIONS */}

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            setSelected(item)
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                          title="View enquiry"
                        >
                          <Eye size={17} />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            deleteEnquiry(item.id)
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete enquiry"
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
          VIEW ENQUIRY MODAL
      ================================================== */}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onMouseDown={(e) => {
            // Close ONLY when clicking the dark background
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          {/* ==================================================
              MODAL CONTENT
          ================================================== */}

          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onMouseDown={(e) => {
              // Prevent clicks inside the form from closing
              e.stopPropagation();
            }}
          >
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-5 sm:p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Enquiry Details
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  View the details submitted by the customer.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* ==================================================
                DETAILS
            ================================================== */}

            <div className="space-y-5 p-5 sm:p-6">
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

              {/* MESSAGE */}

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Message
                </p>

                <p className="mt-1 whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {selected.message || "-"}
                </p>
              </div>

              {/* CLOSE BUTTON */}

              <div className="border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
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

// ======================================================
// DETAIL COMPONENT
// ======================================================

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-700">
        {label}
      </p>

      <p className="mt-1 break-words text-sm text-slate-500">
        {value || "-"}
      </p>
    </div>
  );
}

export default Enquiries;