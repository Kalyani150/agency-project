import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* IMAGE */}

      {project.image && (
        <div className="overflow-hidden bg-slate-100">

          <img
            src={project.image}
            alt={project.title || "Project"}
            className="
              h-56
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />

        </div>
      )}

      {/* CONTENT */}

      <div className="p-6">

        {/* CATEGORY */}

        {project.category && (
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            {project.category}
          </span>
        )}

        {/* TITLE */}

        <h3 className="mt-2 text-xl font-bold text-slate-900">
          {project.title}
        </h3>

        {/* SHORT DESCRIPTION */}

        {project.shortDescription && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
            {project.shortDescription}
          </p>
        )}

        {/* META */}

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">

          {project.client && (
            <span>
              {project.client}
            </span>
          )}

          {project.year && (
            <span>
              • {project.year}
            </span>
          )}

          {project.location && (
            <span>
              • {project.location}
            </span>
          )}

        </div>

        {/* DETAILS */}

        <Link
          to={`/projects/${project.id}`}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-indigo-600
            transition
            hover:text-indigo-700
          "
        >
          View Details
          <ArrowRight
            size={17}
            className="transition group-hover:translate-x-1"
          />
        </Link>

      </div>
    </article>
  );
}

export default ProjectCard;