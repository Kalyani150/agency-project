import {
  Briefcase,
  Layers,
  FileText,
  Mail,
  Users,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard({
  services = [],
  projects = [],
  blogs = [],
  team = [],
  enquiries = [],
}) {
  const stats = [
    {
      title: "Services",
      value: services.length,
      icon: Layers,
      link: "/admin/services",
    },
    {
      title: "Projects",
      value: projects.length,
      icon: Briefcase,
      link: "/admin/projects",
    },
    {
      title: "Blogs",
      value: blogs.length,
      icon: FileText,
      link: "/admin/blogs",
    },
    {
      title: "Enquiries",
      value: enquiries.length,
      icon: Mail,
      link: "/admin/enquiries",
    },
  ];

  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div className="w-full min-w-0 space-y-6 sm:space-y-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Welcome back! Here's what's happening with your agency.
        </p>
      </div>

      {/* ==================================================
          STATISTICS
      ================================================== */}
<div className="grid min-[400px]:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-12 sm:w-12">
                  <Icon
                    size={21}
                    strokeWidth={2}
                  />
                </div>

                <ArrowUpRight
                  size={19}
                  className="shrink-0 text-slate-400 transition group-hover:text-indigo-600"
                />
              </div>

              <p className="mt-4 text-sm font-medium text-slate-600 sm:mt-5 sm:text-base">
                {stat.title}
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                {stat.value}
              </h2>
            </Link>
          );
        })}
      </div>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="grid min-w-0 gap-5 lg:grid-cols-3 lg:gap-6">

        {/* ==================================================
            RECENT ENQUIRIES
        ================================================== */}

        <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white lg:col-span-2">

          {/* Header */}

          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">

            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Recent Enquiries
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
                Latest messages from your website.
              </p>
            </div>

            <Link
              to="/admin/enquiries"
              className="w-fit shrink-0 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 sm:text-base"
            >
              View All
            </Link>
          </div>

          {/* Enquiries */}

          <div className="divide-y divide-slate-100">

            {recentEnquiries.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500 sm:p-8 sm:text-base">
                No enquiries yet.
              </div>
            ) : (
              recentEnquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="flex min-w-0 flex-col gap-3 p-4 sm:p-5 md:flex-row md:items-center md:justify-between"
                >

                  {/* User information */}

                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-slate-900 sm:text-lg">
                      {enquiry.name || "Unknown"}
                    </p>

                    <p className="mt-1 truncate text-sm text-slate-500 sm:text-base">
                      {enquiry.email || "No email"}
                    </p>
                  </div>

                  {/* Status */}

                  <span className="w-fit shrink-0 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 sm:text-sm">
                    {enquiry.status || "New"}
                  </span>

                </div>
              ))
            )}

          </div>
        </div>

        {/* ==================================================
            QUICK OVERVIEW
        ================================================== */}

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">

          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Agency Overview
          </h2>

          <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">

            {/* Team */}

            <div className="flex items-center justify-between gap-4">
              <span className="flex min-w-0 items-center gap-2 text-sm text-slate-500 sm:text-base">
                <Users
                  size={18}
                  className="shrink-0"
                />

                <span className="truncate">
                  Team Members
                </span>
              </span>

              <span className="shrink-0 text-sm font-bold text-slate-900 sm:text-base">
                {team.length}
              </span>
            </div>

            {/* Services */}

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-500 sm:text-base">
                Services
              </span>

              <span className="shrink-0 text-sm font-bold text-slate-900 sm:text-base">
                {services.length}
              </span>
            </div>

            {/* Projects */}

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-500 sm:text-base">
                Projects
              </span>

              <span className="shrink-0 text-sm font-bold text-slate-900 sm:text-base">
                {projects.length}
              </span>
            </div>

            {/* Blogs */}

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-500 sm:text-base">
                Blog Posts
              </span>

              <span className="shrink-0 text-sm font-bold text-slate-900 sm:text-base">
                {blogs.length}
              </span>
            </div>

          </div>

          {/* Website button */}

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99] sm:mt-8 sm:text-base"
          >
            View Website

            <ExternalLink
              size={16}
              className="shrink-0"
            />
          </a>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;