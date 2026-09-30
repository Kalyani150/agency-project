import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/30 hover:shadow-2xl"
    >

      <div className="relative overflow-hidden">

        <img
          src={project.image}
          alt={project.title}
          className="h-64 w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 transition duration-500 group-hover:opacity-90" />

        <div className="absolute inset-0 flex items-center justify-center">

          <div className="flex h-14 w-14 translate-y-5 items-center justify-center rounded-full bg-white text-slate-900 opacity-0 shadow-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={22} />
          </div>

        </div>

      </div>

      <div className="p-6">

        <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">
          {project.category}
        </p>

        <h3 className="mt-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-indigo-300">
          {project.title}
        </h3>

        <p className="mt-3 leading-7 text-slate-400">
          {project.description}
        </p>

      </div>

    </Link>
  );
}

export default ProjectCard;