
import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  X,
  ChevronDown,
} from "lucide-react";

function Enquiries({
  enquiries = [],
  setEnquiries,
}) {
  // ======================================================
  // STATE
  // ======================================================

  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [openFilter, setOpenFilter] = useState(null);

  // ======================================================
  // SERVICE OPTIONS
  // Automatically creates dropdown options from enquiries
  // ======================================================

  const serviceOptions = useMemo(() => {
    return [
      ...new Set(
        enquiries
          .map((item) => item.service)
          .filter(Boolean)
      ),
    ].sort();
  }, [enquiries]);

  // ======================================================
  // SEARCH + FILTER
  // ======================================================

  const filteredEnquiries = useMemo(() => {
    const term = search.toLowerCase().trim();

    return enquiries.filter((item) => {
      // Search
      const matchesSearch = [
        item.name,
        item.email,
        item.phone,
        item.service,
        item.status,
        item.budget,
        item.message,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term);

      // Service
      const matchesService =
        !serviceFilter ||
        item.service === serviceFilter;

      // Status
      const matchesStatus =
        !statusFilter ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesService &&
        matchesStatus
      );
    });
  }, [
    enquiries,
    search,
    serviceFilter,
    statusFilter,
  ]);

  // ======================================================
  // UPDATE STATUS
  // ======================================================

  const updateStatus = (id, status) => {
    setEnquiries(
      enquiries.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item
      )
    );

    // Also update the currently opened enquiry
    if (selected?.id === id) {
      setSelected((prev) =>
        prev
          ? {
              ...prev,
              status,
            }
          : null
      );
    }
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
      enquiries.filter(
        (item) => item.id !== id
      )
    );

    // Close modal if deleted enquiry is open
    if (selected?.id === id) {
      setSelected(null);
    }
  };

  // ======================================================
  // CLOSE MODAL
  // ======================================================

  const closeModal = () => {
    setSelected(null);
  };

  // ======================================================
  // CLEAR FILTERS
  // ======================================================

  const clearFilters = () => {
    setSearch("");
    setServiceFilter("");
    setStatusFilter("");
    setOpenFilter(null);
  };

  const hasFilters =
    search ||
    serviceFilter ||
    statusFilter;

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div
      className="w-full min-w-0 space-y-6"
      onClick={(e) => {
        // Close dropdown when clicking outside
        if (
          e.target.closest(
            "[data-filter-dropdown]"
          ) === null
        ) {
          setOpenFilter(null);
        }
      }}
    >
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
          SEARCH + FILTERS
      ================================================== */}

      <div>
        <div className="grid grid-cols-1 gap-3 min-[351px]:grid-cols-2 lg:grid-cols-5">

          {/* ==================================================
              SEARCH
          ================================================== */}

          <div className="relative lg:col-span-3">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search enquiries..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* ==================================================
              SERVICE FILTER
          ================================================== */}

          <div
            className="relative w-full"
            data-filter-dropdown
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                setOpenFilter(
                  openFilter === "service"
                    ? null
                    : "service"
                );
              }}
              className="flex w-full min-w-0 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            >
              <span className="min-w-0 truncate">
                {serviceFilter || "All Services"}
              </span>

              <ChevronDown
                size={17}
                className={`ml-2 shrink-0 transition-transform ${
                  openFilter === "service"
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {openFilter === "service" && (
              <div
                className="absolute left-0 right-0 top-full z-[100] mt-2 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                {/* ALL SERVICES */}

                <button
                  type="button"
                  onClick={() => {
                    setServiceFilter("");
                    setOpenFilter(null);
                  }}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-indigo-50 hover:text-indigo-600 ${
                    !serviceFilter
                      ? "bg-indigo-50 font-semibold text-indigo-600"
                      : "text-slate-700"
                  }`}
                >
                  All Services
                </button>

                {/* SERVICE OPTIONS */}

                {serviceOptions.map(
                  (service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => {
                        setServiceFilter(
                          service
                        );
                        setOpenFilter(null);
                      }}
                      className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-indigo-50 hover:text-indigo-600 ${
                        serviceFilter === service
                          ? "bg-indigo-50 font-semibold text-indigo-600"
                          : "text-slate-700"
                      }`}
                    >
                      <span className="block truncate">
                        {service}
                      </span>
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* ==================================================
              STATUS FILTER
          ================================================== */}

          <div
            className="relative w-full"
            data-filter-dropdown
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                setOpenFilter(
                  openFilter === "status"
                    ? null
                    : "status"
                );
              }}
              className="flex w-full min-w-0 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            >
              <span className="min-w-0 truncate">
                {statusFilter || "All Statuses"}
              </span>

              <ChevronDown
                size={17}
                className={`ml-2 shrink-0 transition-transform ${
                  openFilter === "status"
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {openFilter === "status" && (
              <div
                className="absolute left-0 right-0 top-full z-[100] mt-2 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                {[
                  {
                    label: "All Statuses",
                    value: "",
                  },
                  {
                    label: "New",
                    value: "New",
                  },
                  {
                    label: "Contacted",
                    value: "Contacted",
                  },
                  {
                    label: "Proposal Sent",
                    value: "Proposal Sent",
                  },
                  {
                    label: "Won",
                    value: "Won",
                  },
                  {
                    label: "Lost",
                    value: "Lost",
                  },
                ].map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => {
                      setStatusFilter(
                        option.value
                      );
                      setOpenFilter(null);
                    }}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-indigo-50 hover:text-indigo-600 ${
                      statusFilter ===
                      option.value
                        ? "bg-indigo-50 font-semibold text-indigo-600"
                        : "text-slate-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================================================
          TABLE
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">

            {/* TABLE HEADER */}

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

            {/* TABLE BODY */}

            <tbody className="divide-y divide-slate-100">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Search
                        size={28}
                        className="mb-3 text-slate-300"
                      />

                      <p className="text-sm font-medium text-slate-600">
                        No enquiries found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Try changing your search or filters.
                      </p>

                      {hasFilters && (
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* NAME */}

                      <td className="px-6 py-4 font-medium text-slate-900">
                        {item.name || "-"}
                      </td>

                      {/* EMAIL */}

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {item.email || "-"}
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
                          value={
                            item.status ||
                            "New"
                          }
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
                              deleteEnquiry(
                                item.id
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete enquiry"
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
          VIEW ENQUIRY MODAL
      ================================================== */}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            // Close only when clicking
            // the dark background

            if (
              e.target ===
              e.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          {/* ==================================================
              MODAL CONTENT
          ================================================== */}

          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-5 sm:p-6">
              <div className="min-w-0 pr-3">
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
                className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

        
{/* ==================================================
    DETAILS
================================================== */}

<div className="space-y-5 p-5 sm:p-6">

  {/* NAME + EMAIL */}

  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

    <Detail
      label="Name"
      value={selected.name}
    />

    <Detail
      label="Email"
      value={selected.email}
    />

  </div>


  {/* PHONE + SERVICE */}

  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

    <Detail
      label="Phone"
      value={selected.phone}
    />

    <Detail
      label="Service"
      value={selected.service}
    />

  </div>


  {/* BUDGET + DATE */}

  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

    <Detail
      label="Budget"
      value={selected.budget}
    />

    <Detail
      label="Date"
      value={selected.date}
    />

  </div>


  {/* STATUS */}

  <Detail
    label="Status"
    value={selected.status}
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

function Detail({
  label,
  value,
}) {
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
