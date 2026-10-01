
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProjectCard from "../ProjectCard";

function ProjectsPreview({ projects = [] }) {
  return (
    <section className="bg-slate-950 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-400 sm:text-sm sm:tracking-widest">
              Our Work
            </span>

            <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
              Featured Case Studies
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:mt-5 sm:text-lg sm:leading-8 lg:text-xl">
              A selection of digital projects we have delivered for growing
              businesses.
            </p>
          </div>

          <Link
            to="/projects"
            className="
              inline-flex
              min-h-[44px]
              w-fit
              items-center
              gap-2
              rounded-lg
              text-sm
              font-bold
              text-indigo-400
              transition
              duration-300
              hover:text-white
              sm:text-base
            "
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* ==================================================
            PROJECT GRID
        ================================================== */}

        <div className="mt-8 grid grid-cols-1 gap-5 min-[400px]:grid-cols-2 sm:mt-12 sm:gap-6 lg:grid-cols-3 lg:gap-7">

          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="min-w-0">
              <ProjectCard project={project} />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default ProjectsPreview;
