const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Firebase",
  "Figma",
  "WordPress",
];

function Technologies() {
  return (
    <section className="bg-white py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center">

          <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            Technologies
          </span>

          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-5xl">
            Technologies We Work With
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            We select technologies according to the requirements,
            scale and goals of each project.
          </p>

        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

          {technologies.map((technology) => (
            <div
              key={technology}
              className="flex min-h-24 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-center font-bold text-slate-700 transition hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
            >
              {technology}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Technologies;