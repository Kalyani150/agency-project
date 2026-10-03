
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
    <section className="overflow-hidden bg-white py-20 sm:py-24">

      {/* ==================================================
          MAIN CONTAINER
          EXACT SAME WIDTH/PADDING AS NAVBAR
      ================================================== */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <div className="text-center">

          {/* Eyebrow */}

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 sm:text-sm">
            Technologies
          </span>

          {/* Heading */}

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Technologies We Work With
          </h2>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            We select technologies according to the requirements,
            scale and goals of each project.
          </p>

        </div>

        {/* ==================================================
            TECHNOLOGY SCROLLER
        ================================================== */}

        <div className="relative mt-12 overflow-hidden">

          {/* ==================================================
              LEFT FADE
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              z-20
              h-full
              w-10
              bg-gradient-to-r
              from-white
              via-white/90
              to-transparent
              sm:w-16
              lg:w-24
            "
          />

          {/* ==================================================
              RIGHT FADE
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              z-20
              h-full
              w-10
              bg-gradient-to-l
              from-white
              via-white/90
              to-transparent
              sm:w-16
              lg:w-24
            "
          />

          {/* ==================================================
              MARQUEE TRACK
          ================================================== */}

          <div className="technologies-marquee flex w-max">

            {/* ==================================================
                FIRST SET
            ================================================== */}

            <div className="flex shrink-0 items-center gap-4 pr-4 sm:gap-5 sm:pr-5">

              {technologies.map((technology) => (
                <div
                  key={`first-${technology}`}
                  className="
                    group
                    flex
                    h-20
                    min-w-[150px]
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-indigo-300
                    hover:bg-indigo-50
                    hover:shadow-md
                    sm:h-24
                    sm:min-w-[180px]
                  "
                >
                  <span
                    className="
                      whitespace-nowrap
                      text-sm
                      font-bold
                      text-slate-700
                      transition-colors
                      duration-300
                      group-hover:text-indigo-600
                      sm:text-base
                    "
                  >
                    {technology}
                  </span>
                </div>
              ))}

            </div>

            {/* ==================================================
                SECOND SET
                DUPLICATE FOR SEAMLESS LOOP
            ================================================== */}

            <div className="flex shrink-0 items-center gap-4 pr-4 sm:gap-5 sm:pr-5">

              {technologies.map((technology) => (
                <div
                  key={`second-${technology}`}
                  className="
                    group
                    flex
                    h-20
                    min-w-[150px]
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-indigo-300
                    hover:bg-indigo-50
                    hover:shadow-md
                    sm:h-24
                    sm:min-w-[180px]
                  "
                >
                  <span
                    className="
                      whitespace-nowrap
                      text-sm
                      font-bold
                      text-slate-700
                      transition-colors
                      duration-300
                      group-hover:text-indigo-600
                      sm:text-base
                    "
                  >
                    {technology}
                  </span>
                </div>
              ))}

            </div>

          </div>
        </div>

      </div>

      {/* ==================================================
          ANIMATION
      ================================================== */}

      <style>{`
        .technologies-marquee {
          animation: technologies-scroll 30s linear infinite;
          will-change: transform;
        }

        .technologies-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes technologies-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        /* ================================================
           TABLET
        ================================================ */

        @media (max-width: 1024px) {
          .technologies-marquee {
            animation-duration: 27s;
          }
        }

        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 640px) {
          .technologies-marquee {
            animation-duration: 22s;
          }
        }

        /* ================================================
           REDUCED MOTION
        ================================================ */

        @media (prefers-reduced-motion: reduce) {
          .technologies-marquee {
            animation: none;
          }
        }
      `}</style>

    </section>
  );
}

export default Technologies;

