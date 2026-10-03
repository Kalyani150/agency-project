
import { Quote, Star } from "lucide-react";

// ======================================================
// TESTIMONIAL IMAGES
// ======================================================

import danielCarterImage from "../../assets/team/daniel-carter.png";
import ananyaKumarImage from "../../assets/team/ananya-kumar.png";
import davidBrownImage from "../../assets/team/david-brown.png";

// ======================================================
// COMPONENT
// ======================================================

function Testimonials({ testimonials = [] }) {
  // ======================================================
  // ADD IMAGES
  // ======================================================

  const testimonialsWithImages = testimonials.map((testimonial) => {
    let image = testimonial.image;

    if (testimonial.id === 1) {
      image = danielCarterImage;
    }

    if (testimonial.id === 2) {
      image = ananyaKumarImage;
    }

    if (testimonial.id === 3) {
      image = davidBrownImage;
    }

    return {
      ...testimonial,
      image,
    };
  });

  // ======================================================
  // EMPTY STATE
  // ======================================================

  if (!testimonialsWithImages.length) {
    return null;
  }

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <section className="bg-white py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <div className="text-center">

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 sm:text-sm">
            Testimonials
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            What Our Clients Say
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Hear from clients who trusted us to turn their ideas into
            powerful digital experiences.
          </p>

        </div>

        {/* ==================================================
            TESTIMONIAL GRID
        ================================================== */}

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {testimonialsWithImages.map((testimonial, index) => (

            <div
              key={testimonial.id ?? index}
              className="
                group
                relative
                flex
                min-h-[300px]
                flex-col
                rounded-3xl
                border
                border-slate-200
                bg-slate-50
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-indigo-200
                hover:bg-white
                hover:shadow-xl
                sm:p-8
              "
            >

              {/* ==================================================
                  PROFILE - TOP
              ================================================== */}

              <div className="flex items-center gap-4">

                {/* Profile Image */}

                <div
                  className="
                    h-16
                    w-16
                    shrink-0
                    overflow-hidden
                    rounded-full
                    border-2
                    border-white
                    bg-slate-200
                    shadow-md
                    ring-2
                    ring-indigo-100
                  "
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="
                      block
                      h-full
                      w-full
                      object-cover
                      object-top
                    "
                  />
                </div>

                {/* Name + Role */}

                <div className="min-w-0 text-left">

                  <h3 className="truncate text-lg font-bold text-slate-900">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 truncate text-sm text-slate-500">
                    {testimonial.role}
                  </p>

                </div>

              </div>

              {/* ==================================================
                  STAR RATING
              ================================================== */}

              <div className="mt-5 flex items-center gap-1">

                {Array.from({
                  length: testimonial.rating || 5,
                }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={18}
                    fill="currentColor"
                    className="text-amber-400"
                  />
                ))}

              </div>

              {/* ==================================================
                  DIVIDER
              ================================================== */}

              <div className="mt-6 h-px bg-slate-200" />

              {/* ==================================================
                  MESSAGE
              ================================================== */}

              <div className="flex flex-1 flex-col justify-center">

                <p
                  className="
                    text-left
                    text-base
                    leading-7
                    text-slate-600
                    sm:text-[17px]
                    sm:leading-8
                  "
                >
                  "{testimonial.message}"
                </p>

              </div>
              

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;
