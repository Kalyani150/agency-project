import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import SectionTitle from "../SectionTitle";
import ProjectCard from "../ProjectCard";

function ProjectsPreview({ projects = [] }) {
  return (
    <section className="bg-slate-950 py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-400">
              Our Work
            </span>

            <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">
              Featured Case Studies
            </h2>

            <p className="mt-5 max-w-2xl leading-8 text-slate-400">
              A selection of digital projects we have delivered for growing businesses.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-white"
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>

        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {projects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default ProjectsPreview;