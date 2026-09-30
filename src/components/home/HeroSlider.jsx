import { useEffect, useState } from "react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

// ======================================================
// HERO IMAGES
// ======================================================

import heroBusiness from "../../assets/hero-business.png";
import heroTeam from "../../assets/hero-team.png";
import heroTechnology from "../../assets/hero-technology.png";

// ======================================================
// SLIDES
// ======================================================

const slides = [
  {
    eyebrow: "IT SOLUTIONS & SERVICES",
    title: "We Provide Best IT Solutions For Your Business",
    description:
      "We create powerful digital experiences that help businesses grow, connect with customers and stay ahead of the competition.",
    image: heroBusiness,
  },

  {
    eyebrow: "DIGITAL TRANSFORMATION",
    title: "Transform Your Ideas Into Digital Experiences",
    description:
      "From websites and applications to branding and marketing, our team builds modern solutions for ambitious businesses.",
    image: heroTeam,
  },

  {
    eyebrow: "MODERN TECHNOLOGY",
    title: "Technology That Moves Your Business Forward",
    description:
      "Build scalable, secure and user-friendly technology solutions with an experienced digital development team.",
    image: heroTechnology,
  },
];

// ======================================================
// HERO SLIDER
// ======================================================

function HeroSlider() {
  const [active, setActive] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  // ====================================================
  // AUTO SLIDER
  // ====================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ====================================================
  // PREVIOUS
  // ====================================================

  const previous = () => {
    setActive((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  // ====================================================
  // NEXT
  // ====================================================

  const next = () => {
    setActive((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  const slide = slides[active];

  return (
    <>
      {/* ==================================================
          HERO SECTION
      ================================================== */}

      <section className="relative min-h-[680px] overflow-hidden bg-slate-950">

        {/* ==================================================
            BACKGROUND SLIDES
        ================================================== */}

        {slides.map((item, index) => (
          <div
            key={item.title}
            className={`absolute inset-0 transition-all duration-[1200ms] ease-out ${
              index === active
                ? "visible scale-100 opacity-100"
                : "invisible scale-105 opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className={`h-full w-full object-cover ${
                index === active ? "gratech-hero-image" : ""
              }`}
            />

            {/* Dark overlay */}

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />

            {/* Decorative circle */}

            <div
              className={`absolute right-10 top-20 hidden h-40 w-40 rounded-full border border-indigo-400/20 lg:block ${
                index === active ? "gratech-floating-slow" : ""
              }`}
            />

            {/* Decorative glow */}

            <div
              className={`absolute bottom-20 right-32 hidden h-16 w-16 rounded-full bg-indigo-500/20 blur-xl lg:block ${
                index === active ? "gratech-pulse" : ""
              }`}
            />
          </div>
        ))}

        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-4 sm:px-6 lg:px-8">

          <div
            key={slide.title}
            className="gratech-hero-content max-w-3xl text-white"
          >

            {/* Eyebrow */}

            <span className="gratech-hero-eyebrow inline-flex rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-xs font-bold tracking-widest text-indigo-300">
              {slide.eyebrow}
            </span>

            {/* Heading */}

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
              {slide.title}
            </h1>

            {/* Description */}

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {slide.description}
            </p>

            {/* Buttons */}

            <div className="gratech-hero-buttons mt-9 flex flex-wrap gap-4">

              <Link
                to="/get-quote"
                className="gratech-button flex items-center gap-2 rounded-lg bg-indigo-600 px-7 py-4 font-bold transition duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

            </div>
          </div>
        </div>

        {/* ==================================================
            ARROWS
        ================================================== */}

        <div className="absolute bottom-10 right-5 flex gap-2 sm:right-10">

          <button
            onClick={previous}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition duration-300 hover:-translate-x-1 hover:bg-indigo-600"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition duration-300 hover:translate-x-1 hover:bg-indigo-600"
          >
            <ChevronRight size={20} />
          </button>

        </div>

        {/* ==================================================
            DOTS
        ================================================== */}

        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-2">

          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                active === index
                  ? "w-10 bg-indigo-500"
                  : "w-2 bg-white/40 hover:bg-white"
              }`}
            />
          ))}

        </div>
      </section>

      {/* ==================================================
          VIDEO MODAL
      ================================================== */}

      {videoOpen && (
        <div
          className="gratech-search-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="gratech-search-box relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -right-2 -top-12 rounded-full bg-white p-2 font-bold text-slate-900 transition hover:scale-110"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default HeroSlider;