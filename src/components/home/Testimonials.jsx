import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

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
  const [active, setActive] = useState(0);

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
  // AUTO SLIDER
  // ======================================================

  useEffect(() => {
    if (testimonialsWithImages.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActive((current) =>
        current === testimonialsWithImages.length - 1
          ? 0
          : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonialsWithImages.length]);

  // ======================================================
  // RESET ACTIVE
  // ======================================================

  useEffect(() => {
    if (
      testimonialsWithImages.length > 0 &&
      active >= testimonialsWithImages.length
    ) {
      setActive(0);
    }
  }, [active, testimonialsWithImages.length]);

  // ======================================================
  // EMPTY STATE
  // ======================================================

  if (!testimonialsWithImages.length) {
    return null;
  }

  const testimonial = testimonialsWithImages[active];

  // ======================================================
  // NAVIGATION
  // ======================================================

  const handlePrevious = () => {
    setActive((current) =>
      current === 0
        ? testimonialsWithImages.length - 1
        : current - 1
    );
  };

  const handleNext = () => {
    setActive((current) =>
      current === testimonialsWithImages.length - 1
        ? 0
        : current + 1
    );
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <section className="bg-white py-20 sm:py-24">

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">

        {/* ==================================================
            SECTION TITLE
        ================================================== */}

        <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
          Testimonials
        </span>

        <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-5xl">
          What Our Clients Say
        </h2>

        {/* ==================================================
            TESTIMONIAL CARD
        ================================================== */}

        <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-12">

          {/* Quote */}
          <Quote
            size={45}
            className="mx-auto text-indigo-200"
          />

          {/* Message */}
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
            "{testimonial.message}"
          </p>

          {/* ==================================================
              MEMBER IMAGE - ROUND
          ================================================== */}

          <div className="mt-8 flex justify-center">
            <div
              className="
                h-40
                w-40
                overflow-hidden
                rounded-full
                border-4
                border-white
                bg-slate-200
                shadow-xl
                ring-2
                ring-indigo-100
                sm:h-36
                sm:w-36
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
          </div>

          {/* ==================================================
              STAR RATING
          ================================================== */}

          <div className="mt-6 flex justify-center gap-1">
            {Array.from({
              length: testimonial.rating || 5,
            }).map((_, index) => (
              <Star
                key={index}
                size={19}
                fill="currentColor"
                className="text-amber-400"
              />
            ))}
          </div>

          {/* ==================================================
              NAME
          ================================================== */}

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            {testimonial.name}
          </h3>

          {/* ==================================================
              ROLE
          ================================================== */}

          <p className="mt-1 text-sm text-slate-500">
            {testimonial.role}
          </p>
        </div>

        {/* ==================================================
            NAVIGATION
        ================================================== */}

        

        {/* ==================================================
            DOTS
        ================================================== */}

        <div className="mt-5 flex justify-center gap-2">

          {testimonialsWithImages.map((item, index) => (
            <button
              key={item.id ?? index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show testimonial ${index + 1}`}
              className={`
                h-2.5
                rounded-full
                transition-all
                duration-300
                ${
                  active === index
                    ? "w-8 bg-indigo-600"
                    : "w-2.5 bg-slate-300 hover:bg-indigo-400"
                }
              `}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;