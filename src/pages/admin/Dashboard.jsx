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
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Welcome back! Here's what's happening with your agency.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon size={22} />
                </div>

                <ArrowUpRight
                  size={20}
                  className="text-slate-400 transition group-hover:text-indigo-600"
                />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                {stat.title}
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {stat.value}
              </h2>
            </Link>
          );
        })}

      </div>

      {/* Two columns */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Recent enquiries */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white">

          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div>
              <h2 className="font-bold text-slate-900">
                Recent Enquiries
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest messages from your website.
              </p>
            </div>

            <Link
              to="/admin/enquiries"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-100">

            {recentEnquiries.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                No enquiries yet.
              </div>
            ) : (
              recentEnquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {enquiry.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {enquiry.email}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                    {enquiry.status}
                  </span>
                </div>
              ))
            )}

          </div>
        </div>

        {/* Quick overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="font-bold text-slate-900">
            Agency Overview
          </h2>

          <div className="mt-6 space-y-5">

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-500">
                <Users size={18} />
                Team Members
              </span>

              <span className="font-bold text-slate-900">
                {team.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Services
              </span>

              <span className="font-bold text-slate-900">
                {services.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Projects
              </span>

              <span className="font-bold text-slate-900">
                {projects.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Blog Posts
              </span>

              <span className="font-bold text-slate-900">
                {blogs.length}
              </span>
            </div>

          </div>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            View Website
            <ExternalLink size={16} />
          </a>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;