
import { useState } from "react";

import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  FolderKanban,
  MessageSquare,
  FileText,
  Menu,
  X,
  LogOut,
  AlertTriangle,
} from "lucide-react";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Logout popup state
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: BriefcaseBusiness,
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: FolderKanban,
    },
    {
      name: "Enquiries",
      path: "/admin/enquiries",
      icon: MessageSquare,
    },
    {
      name: "Blogs",
      path: "/admin/blogs",
      icon: FileText,
    },
  ];

  // Open logout confirmation popup
  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  // Confirm logout
  const handleConfirmLogout = () => {
    localStorage.removeItem("agency_admin_logged_in");
    localStorage.removeItem("adminLoggedIn");

    setShowLogoutPopup(false);

    navigate("/login", { replace: true });
  };

  // Cancel logout
  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  // Admin user click
  const handleUserClick = () => {
    navigate("/admin/settings");
  };

  const navLinkClasses = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-950 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* Logo */}

        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

          <Link
            to="/admin"
            className="flex items-center gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
              N
            </div>

            <div>
              <p className="font-bold text-white">
                Nova Admin
              </p>

              <p className="text-xs text-slate-300">
                Digital Agency
              </p>
            </div>
          </Link>

          {/* Close mobile sidebar */}

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <div className="space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClasses}
                >
                  <Icon
                    size={19}
                    className="shrink-0"
                  />

                  <span>
                    {item.name}
                  </span>
                </NavLink>
              );
            })}

          </div>

        </nav>

        {/* ==================================================
            SIDEBAR BOTTOM
        ================================================== */}

        <div className="border-t border-white/10 p-4">

          <button
            type="button"
            onClick={handleLogoutClick}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={18} />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* ==================================================
          MAIN AREA
      ================================================== */}

      <div className="lg:pl-72">

        {/* ==================================================
            TOPBAR
        ================================================== */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

            {/* Left */}

            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              >
                <Menu size={24} />
              </button>

              <div>
                <p className="text-sm text-slate-500">
                  Welcome back
                </p>

                <h1 className="text-lg font-bold text-slate-900">
                  Admin Dashboard
                </h1>
              </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-3">

              {/* Divider */}

              <div className="hidden h-8 w-px bg-slate-200 sm:block" />

              {/* User */}

              <button
                type="button"
                onClick={handleUserClick}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-slate-100"
                aria-label="Open admin settings"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                  A
                </div>

                <div className="hidden sm:block">

                  <p className="text-sm font-semibold text-slate-900">
                    Admin User
                  </p>

                  <p className="text-xs text-slate-500">
                    Administrator
                  </p>

                </div>

              </button>

            </div>

          </div>

        </header>

        {/* ==================================================
            PAGE CONTENT
        ================================================== */}

        <main className="min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

      {/* ==================================================
          LOGOUT CONFIRMATION POPUP
      ================================================== */}

      {showLogoutPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={handleCancelLogout}
        >

          {/* Popup */}

          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Icon */}

            <div className="flex justify-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertTriangle size={28} />
              </div>

            </div>

            {/* Content */}

            <div className="mt-5 text-center">

              <h2 className="text-xl font-bold text-slate-900">
                Logout?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Are you sure you want to logout from the admin panel?
              </p>

            </div>

            {/* Buttons */}

            <div className="mt-6 grid grid-cols-2 gap-3">

              {/* Cancel */}

              <button
                type="button"
                onClick={handleCancelLogout}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              {/* Logout */}

              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <LogOut size={17} />
                Logout
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminLayout;
