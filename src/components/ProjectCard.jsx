import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  const description =
    project.shortDescription ||
    project.description ||
    "Project description is not available.";

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/30 hover:shadow-2xl"
    >
      {/* =====================================================
          PROJECT IMAGE
      ====================================================== */}
      <div className="relative overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-64 w-full object-cover transition duration-700 ease-out group-hover:rotate-2 group-hover:scale-110 group-hover:brightness-90"
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center bg-gradient-to-br from-indigo-600 to-slate-900 text-5xl font-black text-white/80">
            {(project.title || "?").charAt(0).toUpperCase()}
          </div>
        )}

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 transition duration-500 group-hover:opacity-90" />

        {/* View icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 translate-y-5 items-center justify-center rounded-full bg-white text-slate-900 opacity-0 shadow-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={22} />
          </div>
        </div>
      </div>

      {/* =====================================================
          PROJECT CONTENT
      ====================================================== */}
      <div className="bg-white p-6">
        {/* Category */}
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">
          {project.category || "Project"}
        </p>

        {/* Title */}
        <h3 className="mt-2 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
          {project.title || "Untitled Project"}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-5 text-base leading-7 text-slate-600">
          {description}
        </p>

        {/* Project details */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-sm font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700">
            View Project
          </span>

          <ArrowUpRight
            size={18}
            className="text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-indigo-600"
          />
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;