import { useState } from "react";

import {
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";

import {
  Link,
  NavLink,
} from "react-router-dom";

function PublicNavbar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [servicesOpen, setServicesOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const services = [
    {
      name: "Web Development",
      path: "/services/1",
    },
    {
      name: "UI/UX Design",
      path: "/services/2",
    },
    {
      name: "Mobile App Development",
      path: "/services/3",
    },
    {
      name: "Digital Marketing",
      path: "/services/4",
    },
    {
      name: "SEO Optimization",
      path: "/services/5",
    },
    {
      name: "Branding",
      path: "/services/6",
    },
  ];

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Team",
      path: "/team",
    },
    {
      name: "Blog",
      path: "/blog",
    },
    
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <>
      {/* TOP BAR */}

      <div className="hidden bg-slate-950 text-white lg:block">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">

          <div className="flex items-center gap-6 text-sm text-slate-300">

            <span className="flex items-center gap-2">
              <Mail size={15} />
              hello@novaagency.com
            </span>

            <span className="flex items-center gap-2">
              <Phone size={15} />
              +91 98765 43210
            </span>

          </div>

          <div className="flex gap-5 text-sm text-slate-400">
            <span>Facebook</span>
            <span>LinkedIn</span>
            <span>Instagram</span>
          </div>

        </div>

      </div>

      {/* HEADER */}

      <header className="top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl font-black text-white">
              N
            </div>

            <div>
              <p className="text-xl font-extrabold tracking-tight text-slate-900">
                Nova
              </p>

              <p className="-mt-1 text-[10px] font-semibold uppercase tracking-widest text-indigo-600">
                Digital Agency
              </p>
            </div>

          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-7 lg:flex">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-semibold ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-700 hover:text-indigo-600"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-semibold ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-700 hover:text-indigo-600"
                }`
              }
            >
              About
            </NavLink>

            {/* SERVICES DROPDOWN */}

            <div
              className="relative"
              onMouseEnter={() =>
                setServicesOpen(true)
              }
              onMouseLeave={() =>
                setServicesOpen(false)
              }
            >

              <Link
  to="/services"
  className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-indigo-600"
>
  Services
  <ChevronDown size={15} />
</Link>

              {servicesOpen && (
  <div className="gratech-dropdown absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">

                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {service.name}
                    </Link>
                  ))}

                  <Link
                    to="/services"
                    className="mt-2 block border-t border-slate-100 px-4 pt-3 text-sm font-bold text-indigo-600"
                  >
                    View all services →
                  </Link>

                </div>
              )}

            </div>

            {navItems.slice(2).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-semibold ${
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-700 hover:text-indigo-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* SEARCH */}

            <button
              onClick={() =>
                setSearchOpen(true)
              }
              className="text-slate-700 hover:text-indigo-600"
            >
              <Search size={19} />
            </button>

            {/* CTA */}

            <Link
              to="/get-quote"
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              Get Quote
              <ArrowRight size={16} />
            </Link>

          </nav>

          {/* MOBILE */}

          <div className="flex items-center gap-3 lg:hidden">

            <button
              onClick={() =>
                setSearchOpen(true)
              }
              className="rounded-lg p-2 text-slate-700"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              className="rounded-lg bg-slate-100 p-2"
            >
              {mobileOpen ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}
            </button>

          </div>

        </div>

        {/* MOBILE MENU */}

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">

              <nav className="flex flex-col gap-1">

                <NavLink
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-semibold ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-700"
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-semibold ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-700"
                    }`
                  }
                >
                  About
                </NavLink>

                <button
                  onClick={() =>
                    setServicesOpen(!servicesOpen)
                  }
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold text-slate-700"
                >
                  Services
                  <ChevronDown size={17} />
                </button>

                {servicesOpen && (
                  <div className="ml-4 border-l border-indigo-200 pl-3">

                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        onClick={() =>
                          setMobileOpen(false)
                        }
                        className="block px-4 py-3 text-sm text-slate-600 hover:text-indigo-600"
                      >
                        {service.name}
                      </Link>
                    ))}

                    <Link
                      to="/services"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-sm font-bold text-indigo-600"
                    >
                      View all services →
                    </Link>

                  </div>
                )}

                {navItems.slice(2).map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 text-sm font-semibold ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-slate-700"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                <Link
                  to="/get-quote"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-4 text-sm font-bold text-white"
                >
                  Get Quote
                  <ArrowRight size={17} />
                </Link>

              </nav>

            </div>

          </div>
        )}

      </header>

      {/* SEARCH OVERLAY */}

      {searchOpen && (
        <div className="gratech-search-overlay fixed inset-0 z-[100] bg-slate-950/80 px-5 pt-28">

          <div className="gratech-search-box mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-slate-900">
                Search
              </h2>

              <button
                onClick={() =>
                  setSearchOpen(false)
                }
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X />
              </button>

            </div>

            <input
              autoFocus
              type="text"
              placeholder="Search services, projects, blogs..."
              className="mt-6 w-full rounded-xl border border-slate-200 px-5 py-4 outline-none focus:border-indigo-500"
            />

          </div>

        </div>
      )}

    </>
  );
}

export default PublicNavbar;