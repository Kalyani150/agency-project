
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

      <section className="relative min-h-[600px] overflow-hidden bg-slate-950 sm:min-h-[650px] lg:min-h-[680px]">

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
              className={`h-full w-full object-cover object-center ${
                index === active ? "gratech-hero-image" : ""
              }`}
            />

            {/* Dark overlay */}

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60 sm:via-slate-950/85 sm:to-slate-950/40" />

            {/* Mobile overlay */}

            <div className="absolute inset-0 bg-slate-950/20 sm:hidden" />

            {/* Decorative circle */}

            <div
              className={`absolute right-5 top-24 hidden h-24 w-24 rounded-full border border-indigo-400/20 sm:right-10 sm:h-32 sm:w-32 lg:right-10 lg:top-20 lg:h-40 lg:w-40 lg:block ${
                index === active ? "gratech-floating-slow" : ""
              }`}
            />

            {/* Decorative glow */}

            <div
              className={`absolute bottom-24 right-10 hidden h-12 w-12 rounded-full bg-indigo-500/20 blur-xl sm:right-20 lg:bottom-20 lg:right-32 lg:block ${
                index === active ? "gratech-pulse" : ""
              }`}
            />
          </div>
        ))}

        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-5 py-20 sm:min-h-[650px] sm:px-6 sm:py-24 lg:min-h-[680px] lg:px-8 lg:py-20">

          <div
            key={slide.title}
            className="gratech-hero-content w-full max-w-3xl text-white"
          >

            {/* Eyebrow */}

            <span className="gratech-hero-eyebrow inline-flex max-w-full rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-2 text-[10px] font-bold tracking-[0.15em] text-indigo-300 sm:px-4 sm:text-xs sm:tracking-widest">
              {slide.eyebrow}
            </span>

            {/* Heading */}

            <h1 className="mt-5 max-w-3xl text-3xl font-black leading-[1.15] tracking-tight sm:mt-6 sm:text-5xl sm:leading-tight lg:text-7xl">
              {slide.title}
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-2xl text-m leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
              {slide.description}
            </p>

            {/* Button */}

            <div className="gratech-hero-buttons mt-7 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">

              <Link
                to="/get-quote"
                className="gratech-button flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold transition duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl sm:px-7 sm:py-4 sm:text-base"
              >
                Get Started
                <ArrowRight size={17} />
              </Link>

            </div>
          </div>
        </div>

        {/* ==================================================
            MOBILE SLIDER CONTROLS
            Arrows + Dots together
        ================================================== */}

        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 sm:hidden">

          {/* Previous */}

          <button
            onClick={previous}
            aria-label="Previous slide"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 active:scale-90 hover:bg-indigo-600"
          >
            <ChevronLeft size={21} />
          </button>

          {/* Dots */}

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 backdrop-blur-md">

            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  active === index
                    ? "w-8 bg-indigo-500"
                    : "w-2 bg-white/40 hover:bg-white"
                }`}
              />
            ))}

          </div>

          {/* Next */}

          <button
            onClick={next}
            aria-label="Next slide"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 active:scale-90 hover:bg-indigo-600"
          >
            <ChevronRight size={21} />
          </button>

        </div>

        {/* ==================================================
            DESKTOP SLIDER CONTROLS
        ================================================== */}

        <div className="absolute bottom-10 right-10 z-30 hidden items-center gap-2 sm:flex">

          {/* Previous */}

          <button
            onClick={previous}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition duration-300 hover:-translate-x-1 hover:bg-indigo-600"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}

          <div className="mx-2 flex items-center gap-2">

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

          {/* Next */}

          <button
            onClick={next}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition duration-300 hover:translate-x-1 hover:bg-indigo-600"
          >
            <ChevronRight size={20} />
          </button>

        </div>
      </section>

      {/* ==================================================
          VIDEO MODAL
      ================================================== */}

      {videoOpen && (
        <div
          className="gratech-search-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-5"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="gratech-search-box relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -right-1 -top-12 rounded-full bg-white p-2 font-bold text-slate-900 transition hover:scale-110 sm:-right-2"
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
