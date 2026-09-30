import {
  useMemo,
  useState,
} from "react";

import PageHero from "../components/PageHero";
import ProjectCard from "../components/ProjectCard";

function Projects({ projects = [] }) {
  const [category, setCategory] =
    useState("All");

  const categories = [
    "All",
    ...new Set(
      projects.map(
        (project) => project.category
      )
    ),
  ];

  const filteredProjects = useMemo(() => {

    if (category === "All") {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.category === category
    );

  }, [projects, category]);

  return (
    <>

      <PageHero
        badge="Our Projects"
        title="Selected Work & Case Studies"
        description="Explore some of the digital products and experiences we have created for businesses."
      />

      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex flex-wrap justify-center gap-3">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setCategory(item)
                }
                className={`rounded-full px-5 py-3 text-sm font-bold ${
                  category === item
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {filteredProjects.map(
              (project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              )
            )}

          </div>

          {!filteredProjects.length && (
            <p className="py-20 text-center text-slate-500">
              No projects found.
            </p>
          )}

        </div>

      </section>

    </>
  );
}

export default Projects;