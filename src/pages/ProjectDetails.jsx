
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function ProjectDetails({ projects = [] }) {
  const { id } = useParams();

  // ======================================================
  // FIND PROJECT
  // ======================================================

  const projectIndex = projects.findIndex(
    (project) => String(project.id) === String(id)
  );

  // ======================================================
  // PROJECT NOT FOUND
  // ======================================================

  if (projectIndex === -1) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-white px-4 py-16 sm:py-20">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
            Project Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            The project you are looking for does not exist.
          </p>

          <Link
            to="/projects"
            className="
              mt-6
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-indigo-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-indigo-700
              sm:px-6
            "
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
  // ADMIN CREATED PROJECT
  // ======================================================

  const isAdminCreated = project.isAdminCreated === true;

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
  // SHORT DESCRIPTION
  // ======================================================

  const shortDescription =
    project.shortDescription?.trim() || "";

  // ======================================================
  // DESCRIPTION
  // ======================================================

  const description =
    project.description?.trim() || "";

  const descriptionParagraphs = description
    ? description
        .split(/\n\s*\n/)
        .filter((paragraph) => paragraph.trim())
    : [];

  // ======================================================
  // LONG DESCRIPTION
  // ======================================================

  const longDescription =
    project.longDescription?.trim() || "";

  const longDescriptionParagraphs = longDescription
    ? longDescription
        .split(/\n\s*\n/)
        .filter((paragraph) => paragraph.trim())
    : [];

  // ======================================================
  // DEFAULT CONTENT
  //
  // Used ONLY for existing projects.
  // Admin-created projects will NEVER use this.
  // ======================================================

  const defaultOverview = [
    "This project was developed to deliver a modern, reliable, and user-focused solution based on the client's requirements.",

    "The project focused on creating a strong digital experience with attention to design, functionality, performance, and usability.",

    "Our team worked through planning, design, development, testing, and final implementation to ensure the project met the expected requirements.",

    "The final solution provides a scalable foundation that can support future improvements and business growth.",
  ];

  // ======================================================
  // OVERVIEW CONTENT
  // ======================================================

  const overviewParagraphs = isAdminCreated
    ? descriptionParagraphs
    : descriptionParagraphs.length > 0
      ? descriptionParagraphs
      : defaultOverview;

  // ======================================================
  // LONG DESCRIPTION CONTENT
  //
  // Admin project:
  // Use ONLY longDescription.
  //
  // Existing project:
  // Use longDescription if available.
  // Otherwise use description/default overview.
  // ======================================================

  const detailedParagraphs = isAdminCreated
    ? longDescriptionParagraphs
    : longDescriptionParagraphs.length > 0
      ? longDescriptionParagraphs
      : overviewParagraphs;

  return (
    <main className="overflow-hidden bg-white">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden bg-slate-950 py-12 sm:py-20 lg:py-24">

        {/* Background decorations */}

        <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl sm:h-80 sm:w-80" />

        <div className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl sm:h-96 sm:w-96" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* BACK */}

          <Link
            to="/projects"
            className="
              mb-7
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-300
              transition
              hover:text-white
              sm:mb-8
            "
          >
            <ArrowLeft size={17} />
            Back to Projects
          </Link>

          <div className="max-w-4xl">

            {/* CATEGORY */}

            {project.category && (
              <span
                className="
                  inline-flex
                  max-w-full
                  rounded-full
                  border
                  border-indigo-400/30
                  bg-indigo-500/10
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-indigo-300
                  sm:px-4
                  sm:py-2
                  sm:text-xs
                  sm:tracking-[0.18em]
                "
              >
                {project.category}
              </span>
            )}

            {/* TITLE */}

            <h1
              className="
                mt-5
                break-words
                text-3xl
                font-black
                leading-tight
                text-white
                sm:mt-6
                sm:text-5xl
                lg:text-6xl
              "
            >
              {project.title}
            </h1>

            {/* SHORT DESCRIPTION */}

            {shortDescription && (
              <p
                className="
                  mt-5
                  max-w-3xl
                  text-sm
                  leading-7
                  text-slate-300
                  sm:mt-6
                  sm:text-lg
                  sm:leading-8
                "
              >
                {shortDescription}
              </p>
            )}

            {/* META */}

            <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">

              {/* CLIENT */}

              {project.client && (
                <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                    Client
                  </p>

                  <p className="mt-1 break-words text-xs font-semibold text-white sm:text-sm">
                    {project.client}
                  </p>
                </div>
              )}

              {/* LOCATION */}

              {project.location && (
                <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                    Location
                  </p>

                  <p className="mt-1 break-words text-xs font-semibold text-white sm:text-sm">
                    {project.location}
                  </p>
                </div>
              )}

              {/* YEAR */}

              {project.year && (
                <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                    Year
                  </p>

                  <p className="mt-1 break-words text-xs font-semibold text-white sm:text-sm">
                    {project.year}
                  </p>
                </div>
              )}

              {/* STATUS */}

              {project.status && (
                <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                    Status
                  </p>

                  <p className="mt-1 break-words text-xs font-semibold text-white sm:text-sm">
                    {project.status}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          IMAGE
      ================================================== */}

      {project.image && (
        <section className="bg-white pt-8 sm:pt-14 lg:pt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="w-full overflow-hidden rounded-xl bg-slate-100 sm:rounded-3xl">

              <img
                src={project.image}
                alt={project.title || "Project"}
                className="
                  block
                  h-auto
                  max-h-[420px]
                  w-full
                  object-cover
                  object-center
                  sm:max-h-[500px]
                  lg:max-h-[600px]
                "
              />

            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          CONTENT
      ================================================== */}

      <section className="bg-white py-12 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-3">

            {/* ==================================================
                MAIN CONTENT
            ================================================== */}

            <div className="min-w-0 lg:col-span-2">

              {/* ==================================================
                  PROJECT OVERVIEW
              ================================================== */}

              {overviewParagraphs.length > 0 && (
                <div>

                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 sm:text-sm sm:tracking-[0.18em]">
                    About The Project
                  </span>

                  <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-4xl">
                    Project Overview
                  </h2>

                  <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-7">

                    {overviewParagraphs.map(
                      (paragraph, index) => (
                        <p
                          key={index}
                          className="
                            max-w-4xl
                            text-sm
                            leading-7
                            text-slate-600
                            sm:text-lg
                            sm:leading-9
                          "
                        >
                          {paragraph.trim()}
                        </p>
                      )
                    )}

                  </div>

                </div>
              )}

              {/* ==================================================
                  LONG DESCRIPTION
              ================================================== */}

              {isAdminCreated &&
                longDescriptionParagraphs.length > 0 && (
                  <div className="mt-12 sm:mt-14">

                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 sm:text-sm sm:tracking-[0.18em]">
                      Detailed Information
                    </span>

                    <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-4xl">
                      Project Details
                    </h2>

                    <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-7">

                      {longDescriptionParagraphs.map(
                        (paragraph, index) => (
                          <p
                            key={index}
                            className="
                              max-w-4xl
                              text-sm
                              leading-7
                              text-slate-600
                              sm:text-lg
                              sm:leading-9
                            "
                          >
                            {paragraph.trim()}
                          </p>
                        )
                      )}

                    </div>

                  </div>
                )}

              {/* ==================================================
                  EXISTING PROJECT LONG DESCRIPTION
              ================================================== */}

              {!isAdminCreated &&
                longDescriptionParagraphs.length > 0 && (
                  <div className="mt-12 sm:mt-14">

                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 sm:text-sm sm:tracking-[0.18em]">
                      More Information
                    </span>

                    <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-4xl">
                      Project Details
                    </h2>

                    <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-7">

                      {longDescriptionParagraphs.map(
                        (paragraph, index) => (
                          <p
                            key={index}
                            className="
                              max-w-4xl
                              text-sm
                              leading-7
                              text-slate-600
                              sm:text-lg
                              sm:leading-9
                            "
                          >
                            {paragraph.trim()}
                          </p>
                        )
                      )}

                    </div>

                  </div>
                )}

              {/* ==================================================
                  HIGHLIGHTS
              ================================================== */}

              {project.highlights?.length > 0 && (
                <div className="mt-10 sm:mt-12">

                  <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Project Highlights
                  </h3>

                  <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">

                    {project.highlights.map(
                      (highlight, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3"
                        >

                          <CheckCircle2
                            size={20}
                            className="mt-1 shrink-0 text-indigo-600 sm:h-[21px] sm:w-[21px]"
                          />

                          <p className="min-w-0 text-sm leading-7 text-slate-600 sm:text-base">
                            {highlight}
                          </p>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

            </div>

            {/* ==================================================
                SIDEBAR
            ================================================== */}

            <aside className="min-w-0">

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7 lg:sticky lg:top-24">

                <h3 className="text-xl font-bold text-slate-900">
                  Project Details
                </h3>

                <div className="mt-5 divide-y divide-slate-200 sm:mt-6">

                  {/* CLIENT */}

                  {project.client && (
                    <div className="py-4 first:pt-0">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                        Client
                      </p>

                      <p className="mt-2 break-words text-sm font-semibold text-slate-800 sm:text-base">
                        {project.client}
                      </p>

                    </div>
                  )}

                  {/* CATEGORY */}

                  {project.category && (
                    <div className="py-4">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                        Category
                      </p>

                      <p className="mt-2 break-words text-sm font-semibold text-slate-800 sm:text-base">
                        {project.category}
                      </p>

                    </div>
                  )}

                  {/* LOCATION */}

                  {project.location && (
                    <div className="py-4">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                        Location
                      </p>

                      <p className="mt-2 break-words text-sm font-semibold text-slate-800 sm:text-base">
                        {project.location}
                      </p>

                    </div>
                  )}

                  {/* YEAR */}

                  {project.year && (
                    <div className="py-4">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                        Year
                      </p>

                      <p className="mt-2 break-words text-sm font-semibold text-slate-800 sm:text-base">
                        {project.year}
                      </p>

                    </div>
                  )}

                  {/* STATUS */}

                  {project.status && (
                    <div className="py-4 last:pb-0">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                        Status
                      </p>

                      <div className="mt-2">
                        <span className="inline-flex max-w-full rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 sm:text-sm">
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
            <div className="mt-12 border-t border-slate-200 pt-7 sm:mt-20 sm:pt-8">

              <div
                className={`
                  grid
                  grid-cols-1
                  gap-4
                  ${
                    previousProject && nextProject
                      ? "sm:grid-cols-2"
                      : "sm:grid-cols-1"
                  }
                `}
              >

                {/* PREVIOUS */}

                {previousProject && (
                  <Link
                    to={`/projects/${previousProject.id}`}
                    className="
                      group
                      flex
                      min-h-[100px]
                      w-full
                      min-w-0
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-4
                      transition
                      hover:-translate-y-1
                      hover:border-indigo-200
                      hover:shadow-lg
                      sm:min-h-[110px]
                      sm:p-6
                    "
                  >

                    <div className="min-w-0 flex-1">

                      <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                        <ArrowLeft size={14} />
                        Previous Project
                      </span>

                      <p className="mt-2 line-clamp-2 break-words text-sm font-bold leading-6 text-slate-900 transition group-hover:text-indigo-600 sm:text-lg">
                        {previousProject.title}
                      </p>

                    </div>

                    <ArrowLeft
                      size={19}
                      className="
                        ml-3
                        shrink-0
                        text-slate-400
                        transition
                        group-hover:-translate-x-1
                        group-hover:text-indigo-600
                        sm:ml-4
                        sm:h-5
                        sm:w-5
                      "
                    />

                  </Link>
                )}

                {/* NEXT */}

                {nextProject && (
                  <Link
                    to={`/projects/${nextProject.id}`}
                    className={`
                      group
                      flex
                      min-h-[100px]
                      w-full
                      min-w-0
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-4
                      text-right
                      transition
                      hover:-translate-y-1
                      hover:border-indigo-200
                      hover:shadow-lg
                      sm:min-h-[110px]
                      sm:p-6
                      ${
                        !previousProject
                          ? "sm:col-start-2"
                          : ""
                      }
                    `}
                  >

                    <div className="min-w-0 flex-1">

                      <span className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                        Next Project
                        <ArrowRight size={14} />
                      </span>

                      <p className="mt-2 line-clamp-2 break-words text-sm font-bold leading-6 text-slate-900 transition group-hover:text-indigo-600 sm:text-lg">
                        {nextProject.title}
                      </p>

                    </div>

                    <ArrowRight
                      size={19}
                      className="
                        ml-3
                        shrink-0
                        text-slate-400
                        transition
                        group-hover:translate-x-1
                        group-hover:text-indigo-600
                        sm:ml-4
                        sm:h-5
                        sm:w-5
                      "
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

