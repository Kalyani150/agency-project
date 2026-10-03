
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowRight,
} from "lucide-react";

import {
  Link,
  NavLink,
} from "react-router-dom";

const SCROLLED_OFFSET_PX = 40;

function PublicNavbar() {
  // ======================================================
  // STATE
  // ======================================================

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ======================================================
  // REFS
  // ======================================================

  const desktopServicesRef = useRef(null);
  const mobileServicesRef = useRef(null);

  // ======================================================
  // SCROLL EFFECT
  // ======================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLLED_OFFSET_PX);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ======================================================
  // LOCK BACKGROUND SCROLL WHEN MOBILE MENU IS OPEN
  // ======================================================

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ======================================================
  // CLOSE SERVICES DROPDOWN WHEN CLICKING OUTSIDE
  // ======================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideDesktop =
        desktopServicesRef.current?.contains(event.target);

      const clickedInsideMobile =
        mobileServicesRef.current?.contains(event.target);

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ======================================================
  // SERVICES
  // ======================================================

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

  // ======================================================
  // NAV ITEMS
  // ======================================================

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

  // ======================================================
  // CLOSE MOBILE MENU
  // ======================================================

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  // ======================================================
  // TOGGLE SERVICES
  // ======================================================

  const toggleServices = () => {
    setServicesOpen((prev) => !prev);
  };

  return (
    <>
      {/* ==================================================
          HEADER
      ================================================== */}

      <header
        className={`gratech-header sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur ${
          scrolled ? "gratech-header-scrolled" : ""
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* ==================================================
              LOGO
          ================================================== */}

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3"
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

          {/* ==================================================
              DESKTOP NAV
          ================================================== */}

          <nav className="hidden items-center gap-7 lg:flex">

            <NavLink
              to="/"
              onClick={() => setServicesOpen(false)}
              className={({ isActive }) =>
                `text-lg font-semibold transition ${
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
              onClick={() => setServicesOpen(false)}
              className={({ isActive }) =>
                `text-lg font-semibold transition ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-700 hover:text-indigo-600"
                }`
              }
            >
              About
            </NavLink>

            {/* SERVICES */}

            <div
              ref={desktopServicesRef}
              className="relative flex items-center"
            >
              <NavLink
                to="/services"
                onClick={() => setServicesOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold transition ${
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-700 hover:text-indigo-600"
                  }`
                }
              >
                Services
              </NavLink>

              <button
                type="button"
                onClick={toggleServices}
                className="ml-1 rounded p-1 text-slate-700 transition hover:text-indigo-600"
                aria-label="Toggle services dropdown"
                aria-expanded={servicesOpen}
              >
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="gratech-dropdown absolute left-1/2 top-full z-50 mt-4 w-72 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      onClick={() => setServicesOpen(false)}
                      className="block rounded-xl px-4 py-3 text-lg font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* PROJECTS / TEAM / BLOG / CONTACT */}

            {navItems.slice(2).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setServicesOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold transition ${
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-700 hover:text-indigo-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* GET QUOTE */}

            <Link
              to="/get-quote"
              onClick={() => setServicesOpen(false)}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-base font-bold text-white transition hover:bg-indigo-700"
            >
              Get Quote
              <ArrowRight size={16} />
            </Link>
          </nav>

          {/* ==================================================
              MOBILE HEADER
          ================================================== */}

          <div className="flex items-center gap-3 lg:hidden">

            {/* SEARCH */}

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
              aria-label="Open search"
            >
              <Search size={20} />
            </button>

            {/* MENU */}

            <button
              type="button"
              onClick={() => {
                setMobileOpen((prev) => !prev);
                setServicesOpen(false);
              }}
              className="rounded-lg bg-slate-100 p-2"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}
            </button>
          </div>
        </div>

        {/* ==================================================
            MOBILE MENU
        ================================================== */}

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">

            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">

              <nav className="flex flex-col gap-1">

                {/* HOME */}

                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
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

                {/* ABOUT */}

                <NavLink
                  to="/about"
                  onClick={closeMobileMenu}
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

                {/* MOBILE SERVICES */}

                <div
                  ref={mobileServicesRef}
                  className="relative"
                >
                  <div className="flex items-center rounded-lg">

                    <NavLink
                      to="/services"
                      onClick={() => {
                        setMobileOpen(false);
                        setServicesOpen(false);
                      }}
                      className={({ isActive }) =>
                        `flex-1 rounded-lg px-4 py-3 text-sm font-semibold ${
                          isActive
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-slate-700"
                        }`
                      }
                    >
                      Services
                    </NavLink>

                    <button
                      type="button"
                      onClick={toggleServices}
                      className="rounded-lg p-3 text-slate-700 transition hover:bg-slate-100"
                      aria-label="Toggle services dropdown"
                      aria-expanded={servicesOpen}
                    >
                      <ChevronDown
                        size={17}
                        className={`transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {servicesOpen && (
                    <div className="ml-4 border-l border-indigo-200 pl-3">
                      {services.map((service) => (
                        <Link
                          key={service.path}
                          to={service.path}
                          onClick={closeMobileMenu}
                          className="block px-4 py-3 text-sm text-slate-600 transition hover:text-indigo-600"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* PROJECTS / TEAM / BLOG / CONTACT */}

                {navItems.slice(2).map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
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

                {/* GET QUOTE */}

                <Link
                  to="/get-quote"
                  onClick={closeMobileMenu}
                  className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  Get Quote
                  <ArrowRight size={17} />
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* ==================================================
          SEARCH OVERLAY
      ================================================== */}

      {searchOpen && (
        <div
          className="gratech-search-overlay fixed inset-0 z-[100] bg-slate-950/80 px-5 pt-28"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSearchOpen(false);
            }
          }}
        >
          <div className="gratech-search-box mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-slate-900">
                Search
              </h2>

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-lg p-2 transition hover:bg-slate-100"
                aria-label="Close search"
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
