import { useMemo, useState } from "react";

import PageHero from "../components/PageHero";
import ProjectCard from "../components/ProjectCard";

function Projects({ projects = [] }) {
  const [category, setCategory] = useState("All");

  // Create unique categories
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

  // Filter projects
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
      ====================================================== */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* =================================================
              CATEGORY FILTER
          ================================================== */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 ${
                  category === item
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* =================================================
              PROJECT COUNT
          ================================================== */}
          {filteredProjects.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {filteredProjects.length}
                </span>{" "}
                {filteredProjects.length === 1
                  ? "project"
                  : "projects"}
              </p>
            </div>
          )}

          {/* =================================================
              PROJECT GRID
          ================================================== */}
          {filteredProjects.length > 0 ? (
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
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
            ================================================== */
            <div className="py-20 text-center">
              <div className="mx-auto max-w-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  📁
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  No Projects Found
                </h3>

                <p className="mt-2 text-slate-500">
                  There are no projects available in this category.
                </p>

                {category !== "All" && (
                  <button
                    type="button"
                    onClick={() => setCategory("All")}
                    className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
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