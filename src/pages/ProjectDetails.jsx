import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function ProjectDetails({ projects = [] }) {
  const { id } = useParams();

  // ======================================================
  // FIND CURRENT PROJECT
  // ======================================================

  const projectIndex = projects.findIndex(
    (project) => String(project.id) === String(id)
  );

  // ======================================================
  // PROJECT NOT FOUND
  // ======================================================

  if (projectIndex === -1) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-white px-4 py-20">
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

  // ======================================================
  // CURRENT PROJECT
  // ======================================================

  const project = projects[projectIndex];

  // ======================================================
  // PREVIOUS PROJECT
  // ======================================================

  const previousProject =
    projectIndex > 0
      ? projects[projectIndex - 1]
      : null;

  // ======================================================
  // NEXT PROJECT
  // ======================================================

  const nextProject =
    projectIndex < projects.length - 1
      ? projects[projectIndex + 1]
      : null;

  // ======================================================
  // LONG DESCRIPTION
  // ======================================================

  const longDescription =
    project.longDescription ||
    project.description ||
    "Project description is not available.";

  // ======================================================
  // CONVERT LONG DESCRIPTION INTO PARAGRAPHS
  // ======================================================

  const descriptionParagraphs = longDescription
    .trim()
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim());

  return (
    <main className="bg-white">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20 lg:py-24">

        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Back */}
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Projects
          </Link>

          <div className="max-w-4xl">

            {/* Category */}
            {project.category && (
              <span className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
                {project.category}
              </span>
            )}

            {/* Title */}
            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {project.description ||
                "Project description is not available."}
            </p>

            {/* Project meta */}
            <div className="mt-8 flex flex-wrap gap-3">

              {project.client && (
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Client
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    {project.client}
                  </p>
                </div>
              )}

              {project.year && (
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Year
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    {project.year}
                  </p>
                </div>
              )}

              {project.status && (
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Status
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    {project.status}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          PROJECT IMAGE
      ================================================== */}

      {project.image && (
        <section className="bg-white px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
          <div className="mx-auto max-w-7xl">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm sm:rounded-3xl">

              <img
                src={project.image}
                alt={project.title}
                className="h-auto max-h-[650px] w-full object-cover"
              />

            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          PROJECT CONTENT
      ================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">

            {/* ==================================================
                LONG DESCRIPTION
            ================================================== */}

            <div className="lg:col-span-2">

              <span className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                About The Project
              </span>

              <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
                Project Overview
              </h2>

              {/* LONG DESCRIPTION FROM initialProjects */}
              <div className="mt-8 space-y-6">

                {descriptionParagraphs.map(
                  (paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-8 text-slate-600 sm:text-lg"
                    >
                      {paragraph.trim()}
                    </p>
                  )
                )}

              </div>

              {/* ==================================================
                  PROJECT HIGHLIGHTS
              ================================================== */}

              <div className="mt-12">

                <h3 className="text-2xl font-bold text-slate-900">
                  Project Highlights
                </h3>

                <div className="mt-6 space-y-5">

                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={21}
                      className="mt-1 shrink-0 text-indigo-600"
                    />

                    <p className="text-base leading-7 text-slate-600">
                      Modern and responsive user experience.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={21}
                      className="mt-1 shrink-0 text-indigo-600"
                    />

                    <p className="text-base leading-7 text-slate-600">
                      Designed for desktop, tablet and mobile devices.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={21}
                      className="mt-1 shrink-0 text-indigo-600"
                    />

                    <p className="text-base leading-7 text-slate-600">
                      Focused on performance and usability.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={21}
                      className="mt-1 shrink-0 text-indigo-600"
                    />

                    <p className="text-base leading-7 text-slate-600">
                      Built around the specific requirements of the client.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={21}
                      className="mt-1 shrink-0 text-indigo-600"
                    />

                    <p className="text-base leading-7 text-slate-600">
                      Structured for future growth and scalability.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* ==================================================
                PROJECT DETAILS
            ================================================== */}

            <aside>

              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">

                <h3 className="text-xl font-bold text-slate-900">
                  Project Details
                </h3>

                <div className="mt-6 divide-y divide-slate-200">

                  {project.client && (
                    <div className="py-4 first:pt-0">

                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Client
                      </p>

                      <p className="mt-2 text-base font-semibold text-slate-800">
                        {project.client}
                      </p>

                    </div>
                  )}

                  {project.category && (
                    <div className="py-4">

                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Category
                      </p>

                      <p className="mt-2 text-base font-semibold text-slate-800">
                        {project.category}
                      </p>

                    </div>
                  )}

                  {project.year && (
                    <div className="py-4">

                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Year
                      </p>

                      <p className="mt-2 text-base font-semibold text-slate-800">
                        {project.year}
                      </p>

                    </div>
                  )}

                  {project.status && (
                    <div className="py-4 last:pb-0">

                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Status
                      </p>

                      <div className="mt-2">

                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                          {project.status}
                        </span>

                      </div>

                    </div>
                  )}

                </div>
              </div>

            </aside>

          </div>

          {/* ==================================================
              PREVIOUS / NEXT
          ================================================== */}

          {(previousProject || nextProject) && (
            <div className="mt-16 border-t border-slate-200 pt-8 sm:mt-20">

              <div
                className={`grid gap-4 ${
                  previousProject && nextProject
                    ? "sm:grid-cols-2"
                    : "sm:grid-cols-1"
                }`}
              >

                {/* PREVIOUS */}

                {previousProject && (
                  <Link
                    to={`/projects/${previousProject.id}`}
                    className="group flex min-h-[110px] items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg sm:p-6"
                  >

                    <div className="min-w-0">

                      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <ArrowLeft size={15} />
                        Previous Project
                      </span>

                      <p className="mt-2 truncate text-base font-bold text-slate-900 transition group-hover:text-indigo-600 sm:text-lg">
                        {previousProject.title}
                      </p>

                    </div>

                    <ArrowLeft
                      size={20}
                      className="ml-4 shrink-0 text-slate-400 transition group-hover:-translate-x-1 group-hover:text-indigo-600"
                    />

                  </Link>
                )}

                {/* NEXT */}

                {nextProject && (
                  <Link
                    to={`/projects/${nextProject.id}`}
                    className={`group flex min-h-[110px] items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-right transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg sm:p-6 ${
                      !previousProject
                        ? "sm:col-start-2"
                        : ""
                    }`}
                  >

                    <div className="min-w-0 flex-1">

                      <span className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Next Project
                        <ArrowRight size={15} />
                      </span>

                      <p className="mt-2 truncate text-base font-bold text-slate-900 transition group-hover:text-indigo-600 sm:text-lg">
                        {nextProject.title}
                      </p>

                    </div>

                    <ArrowRight
                      size={20}
                      className="ml-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
                    />

                  </Link>
                )}

              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}

export default ProjectDetails;