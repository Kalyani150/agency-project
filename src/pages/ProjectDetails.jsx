import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { initialProjects } from "../data";

function ProjectDetails() {
  const { id } = useParams();

  const projects = initialProjects;

  const projectIndex = projects.findIndex(
    (project) => String(project.id) === String(id)
  );

  if (projectIndex === -1) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-900">
            Project Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The project you are looking for does not exist.
          </p>

          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  const project = projects[projectIndex];

  const previousProject =
    projectIndex > 0
      ? projects[projectIndex - 1]
      : projects[projects.length - 1];

  const nextProject =
    projectIndex < projects.length - 1
      ? projects[projectIndex + 1]
      : projects[0];

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="bg-slate-950 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Projects
          </Link>

          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-400">
              {project.category}
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {project.description}
            </p>
          </div>

        </div>
      </section>

      {/* PROJECT CONTENT */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

         {/* IMAGE */}
<div className="overflow-hidden rounded-3xl shadow-xl">
  <img
    src={project.image}
    alt={project.title}
    className="block h-auto max-h-[700px] w-full object-cover"
  />
</div>

          {/* PROJECT INFORMATION */}
          <div className="mt-14 grid gap-10 lg:grid-cols-3">

            {/* DESCRIPTION */}
            <div className="lg:col-span-2">
              <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                About The Project
              </span>

              <h2 className="mt-3 text-3xl font-black text-slate-900">
                Project Overview
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-600">
                {project.description}
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-1 shrink-0 text-indigo-600"
                  />

                  <p className="text-slate-600">
                    Modern and responsive user experience
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-1 shrink-0 text-indigo-600"
                  />

                  <p className="text-slate-600">
                    Designed for desktop, tablet and mobile devices
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-1 shrink-0 text-indigo-600"
                  />

                  <p className="text-slate-600">
                    Focused on performance, usability and scalability
                  </p>
                </div>
              </div>
            </div>

            {/* PROJECT DETAILS */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <h3 className="text-xl font-bold text-slate-900">
                Project Details
              </h3>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Client
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {project.client}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Category
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {project.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Year
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {project.year}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Status
                  </p>

                  <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {project.status}
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* PREVIOUS / NEXT */}
          <div className="mt-16 border-t border-slate-200 pt-8">

            <div className="grid gap-4 sm:grid-cols-2">

              {/* PREVIOUS */}
              <Link
                to={`/projects/${previousProject.id}`}
                className="group rounded-2xl border border-slate-200 p-5 transition duration-300 hover:border-indigo-500 hover:bg-indigo-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <ArrowLeft size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Previous Project
                    </p>

                    <p className="mt-1 truncate font-bold text-slate-900">
                      {previousProject.title}
                    </p>
                  </div>
                </div>
              </Link>

              {/* NEXT */}
              <Link
                to={`/projects/${nextProject.id}`}
                className="group rounded-2xl border border-slate-200 p-5 transition duration-300 hover:border-indigo-500 hover:bg-indigo-50"
              >
                <div className="flex items-center justify-end gap-3 text-right">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Next Project
                    </p>

                    <p className="mt-1 truncate font-bold text-slate-900">
                      {nextProject.title}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <ArrowRight size={19} />
                  </div>
                </div>
              </Link>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}

export default ProjectDetails;