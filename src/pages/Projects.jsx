import { useMemo, useState } from "react";

import PageHero from "../components/PageHero";
import ProjectCard from "../components/ProjectCard";

function Projects({ projects = [] }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  // ======================================================
  // ONLY SHOW COMPLETED PROJECTS PUBLICLY
  // ======================================================

  const publicProjects = useMemo(() => {
    return projects.filter(
      (project) =>
        project.status === "Completed"
    );
  }, [projects]);

  // ======================================================
  // CREATE UNIQUE CATEGORIES
  // ======================================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        publicProjects
          .map((project) => project.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [publicProjects]);

  // ======================================================
  // FILTER PROJECTS
  // ======================================================

  const filteredProjects = useMemo(() => {
    const searchTerm = search
      .trim()
      .toLowerCase();

    return publicProjects.filter((project) => {
      // Category filter
      const matchesCategory =
        category === "All" ||
        project.category === category;

      // Search filter
      const matchesSearch =
        !searchTerm ||
        project.title
          ?.toLowerCase()
          .includes(searchTerm) ||
        project.name
          ?.toLowerCase()
          .includes(searchTerm) ||
        project.description
          ?.toLowerCase()
          .includes(searchTerm) ||
        project.category
          ?.toLowerCase()
          .includes(searchTerm);

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [publicProjects, category, search]);

  // ======================================================
  // CLEAR SEARCH
  // ======================================================

  const clearSearch = () => {
    setSearch("");
  };

  // ======================================================
  // CLEAR ALL FILTERS
  // ======================================================

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <>
      {/* ==================================================
          PAGE HERO
      ================================================== */}

      <PageHero
        badge="Our Projects"
        title="Selected Work & Case Studies"
        description="Explore some of the digital products and experiences we have created for businesses."
      />

      {/* ==================================================
          PROJECTS SECTION
      ================================================== */}

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ==================================================
              SEARCH + FILTER
          ================================================== */}

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            {/* ==================================================
                SEARCH
            ================================================== */}

            <div className="w-full sm:max-w-2xl">

              <label
                htmlFor="project-search"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Search Projects
              </label>

              <div className="relative">

                {/* Search Icon */}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                  />

                  <path d="m21 21-4.3-4.3" />
                </svg>

                {/* Search Input */}

                <input
                  id="project-search"
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search projects..."
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-10
                    pr-10
                    text-sm
                    font-medium
                    text-slate-700
                    shadow-sm
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-500/20
                  "
                />

                {/* Clear Search */}

                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      -translate-y-1/2
                      items-center
                      justify-center
                      text-slate-400
                      transition
                      hover:text-slate-700
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                )}

              </div>
            </div>

            {/* ==================================================
                CATEGORY FILTER
            ================================================== */}

            <div className="w-full sm:w-64">

              <label
                htmlFor="project-category"
                className="
                  mb-2
                  block
                  text-left
                  text-sm
                  font-bold
                  text-slate-800
                  sm:text-right
                "
              >
                Filter by Category
              </label>

              <div className="relative">

                <select
                  id="project-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    pr-10
                    text-sm
                    font-semibold
                    text-slate-700
                    shadow-sm
                    outline-none
                    transition
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-500/20
                  "
                >
                  {categories.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>

                {/* Dropdown Icon */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    right-3
                    flex
                    items-center
                    text-slate-500
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>

              </div>
            </div>

          </div>

          {/* ==================================================
              RESULTS COUNT
          ================================================== */}

          {(search || category !== "All") && (
            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                justify-between
                gap-3
              "
            >

              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {filteredProjects.length}
                </span>{" "}
                {filteredProjects.length === 1
                  ? "project"
                  : "projects"}
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="
                  text-sm
                  font-semibold
                  text-indigo-600
                  transition
                  hover:text-indigo-700
                "
              >
                Clear Filters
              </button>

            </div>
          )}

          {/* ==================================================
              PROJECT GRID
          ================================================== */}

          {filteredProjects.length > 0 ? (

            <div
              className="
                mt-10
                grid
                gap-7
                sm:grid-cols-2
                lg:mt-12
                lg:grid-cols-3
              "
            >

              {filteredProjects.map(
                (project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                )
              )}

            </div>

          ) : (

            /* ==================================================
                EMPTY STATE
            ================================================== */

            <div className="py-20 text-center">

              <div className="mx-auto max-w-md">

                {/* Empty Icon */}

                <div
                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-2xl
                  "
                >
                  📁
                </div>

                {/* Empty Heading */}

                <h3
                  className="
                    mt-5
                    text-xl
                    font-bold
                    text-slate-900
                  "
                >
                  No Projects Found
                </h3>

                {/* Empty Description */}

                <p className="mt-2 text-slate-500">
                  {search
                    ? `No completed projects match "${search}".`
                    : "There are no completed projects available in this category."}
                </p>

                {/* Reset Button */}

                {(category !== "All" || search) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      mt-6
                      rounded-xl
                      bg-indigo-600
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-indigo-700
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500
                      focus:ring-offset-2
                    "
                  >
                    View All Projects
                  </button>
                )}

              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}

export default Projects;

