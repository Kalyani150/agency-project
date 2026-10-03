
import { useMemo, useState } from "react";

import PageHero from "../components/PageHero";
import ProjectCard from "../components/ProjectCard";

function Projects({ projects = [] }) {
  const [category, setCategory] = useState("All");

  // ======================================================
  // CREATE UNIQUE CATEGORIES
  // ======================================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        projects
          .map((project) => project.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [projects]);

  // ======================================================
  // FILTER PROJECTS
  // ======================================================

  const filteredProjects = useMemo(() => {
    if (category === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === category
    );
  }, [projects, category]);

  return (
    <>
      {/* =====================================================
          PAGE HERO
      ====================================================== */}

      <PageHero
        badge="Our Projects"
        title="Selected Work & Case Studies"
        description="Explore some of the digital products and experiences we have created for businesses."
      />

      {/* =====================================================
          PROJECTS SECTION
      ===================================================== */}

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* =================================================
              PROJECT COUNT + FILTER
          ================================================== */}

          <div className="flex items-end justify-between gap-4">

          

            <div></div>
              
            

            {/* FILTER */}

            <div className="w-48 sm:w-64">
              <label
                htmlFor="project-category"
                className="mb-2 block text-right text-m font-bold text-slate-800"
              >
                Filter by Category
              </label>

              <div className="relative">
                <select
                  id="project-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
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
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {/* Dropdown Arrow */}

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

          {/* =================================================
              PROJECT GRID
          ================================================== */}

          {filteredProjects.length > 0 ? (
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          ) : (
            /* =================================================
                EMPTY STATE
            ================================================= */

            <div className="py-20 text-center">
              <div className="mx-auto max-w-md">

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

                <p className="mt-2 text-slate-500">
                  There are no projects available in this
                  category.
                </p>

                {category !== "All" && (
                  <button
                    type="button"
                    onClick={() => setCategory("All")}
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

