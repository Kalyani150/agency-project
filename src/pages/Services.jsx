import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";

function Services({ services = [] }) {
  const sliderRef = useRef(null);
  const autoScrollRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);

  // =========================================
  // RESPONSIVE CARD COUNT
  //
  // < 450px  = 1 card
  // >= 450px = 2 cards
  // >= 1024px = 3 cards
  // =========================================

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 450) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();

    window.addEventListener(
      "resize",
      updateVisibleCards
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateVisibleCards
      );
    };
  }, []);

  // =========================================
  // TOTAL SLIDER POSITIONS
  // =========================================

  const totalSlides = Math.max(
    services.length - visibleCards + 1,
    1
  );

  // =========================================
  // UPDATE ACTIVE DOT WHEN USER SCROLLS
  // =========================================

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const handleScroll = () => {
      const cards =
        slider.querySelectorAll(
          ".service-slide"
        );

      if (!cards.length) return;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(
          card.offsetLeft -
            slider.scrollLeft
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(
        Math.min(
          closestIndex,
          totalSlides - 1
        )
      );
    };

    slider.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      slider.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [totalSlides]);

  // =========================================
  // SCROLL TO ONE CARD
  // =========================================

  const scrollToCard = (index) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const cards =
      slider.querySelectorAll(
        ".service-slide"
      );

    if (!cards[index]) return;

    slider.scrollTo({
      left: cards[index].offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  // =========================================
  // AUTO SCROLL
  // ONE CARD AT A TIME
  // =========================================

  useEffect(() => {
    if (totalSlides <= 1) return;

    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    autoScrollRef.current = setInterval(() => {
      if (isHovered) return;

      setActiveIndex((currentIndex) => {
        const nextIndex =
          currentIndex >= totalSlides - 1
            ? 0
            : currentIndex + 1;

        scrollToCard(nextIndex);

        return nextIndex;
      });
    }, 3500);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [
    activeIndex,
    totalSlides,
    isHovered,
  ]);

  // =========================================
  // RESET SLIDER WHEN CARD COUNT CHANGES
  // =========================================

  useEffect(() => {
    setActiveIndex(0);

    const slider = sliderRef.current;

    if (slider) {
      slider.scrollTo({
        left: 0,
        behavior: "auto",
      });
    }
  }, [visibleCards]);

  // =========================================
  // RESET SLIDER WHEN SERVICES CHANGE
  // =========================================

  useEffect(() => {
    setActiveIndex(0);

    const slider = sliderRef.current;

    if (slider) {
      slider.scrollTo({
        left: 0,
        behavior: "auto",
      });
    }
  }, [services]);

  return (
    <>
      {/* =====================================
          PAGE HERO
      ====================================== */}

      <PageHero
        badge="Our Services"
        title="Complete Digital Solutions For Modern Businesses"
        description="From strategy and design to development and marketing, we provide the technology services your business needs."
      />

      {/* =====================================
          SERVICES SECTION
      ====================================== */}

      <section className="bg-slate-100 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* SECTION TITLE */}

          <SectionTitle
            badge="What We Do"
            title="Our Technology Services"
            description="Choose the right service for your business requirements."
          />

          {/* ===================================
              SERVICE SLIDER
          ==================================== */}

          <div className="mt-10 sm:mt-12 lg:mt-14">

            <div
              ref={sliderRef}
              onMouseEnter={() =>
                setIsHovered(true)
              }
              onMouseLeave={() =>
                setIsHovered(false)
              }
              className="
                flex
                gap-3
                overflow-x-auto
                scroll-smooth
                snap-x
                snap-mandatory
                scrollbar-hide
                pb-2

                sm:gap-5
                lg:gap-6
              "
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="
                    service-slide
                    w-full
                    shrink-0
                    snap-start

                    min-[450px]:w-[calc(50%-6px)]

                    lg:w-[calc(33.333%-16px)]
                  "
                >
                  <ServiceCard
                    service={service}
                  />
                </div>
              ))}
            </div>

            {/* =================================
                SLIDER DOTS
            ================================== */}

            {totalSlides > 1 && (
              <div className="mt-6 flex justify-center gap-2 sm:mt-8">
                {Array.from({
                  length: totalSlides,
                }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${
                      index + 1
                    }`}
                    onClick={() =>
                      scrollToCard(index)
                    }
                    className={`
                      h-2.5
                      rounded-full
                      transition-all
                      duration-300

                      ${
                        activeIndex === index
                          ? "w-8 bg-indigo-600"
                          : "w-2.5 bg-slate-300 hover:bg-indigo-400"
                      }
                    `}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* =====================================
          WHY OUR SERVICES
      ====================================== */}

      <section className="bg-slate-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            {/* LEFT CONTENT */}

            <div>
              <span
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-widest
                  text-indigo-400
                "
              >
                Why Our Services
              </span>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-black
                  text-white
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Everything you need to grow digitally
              </h2>

              <p
                className="
                  mt-5
                  text-base
                  leading-7
                  text-slate-400
                  sm:mt-6
                  sm:text-lg
                  sm:leading-8
                "
              >
                We combine technology, design and
                strategy to create solutions that are
                practical and focused on measurable
                business outcomes.
              </p>
            </div>

            {/* RIGHT FEATURES */}

            <div
              className="
                grid
                gap-3
                sm:grid-cols-2
                sm:gap-4
              "
            >
              {[
                "Modern technology",
                "Responsive design",
                "SEO friendly",
                "Secure development",
                "Scalable architecture",
                "Ongoing support",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                    text-base
                    text-white
                    sm:p-5
                    sm:text-lg
                  "
                >
                  <CheckCircle2
                    size={20}
                    className="
                      shrink-0
                      text-indigo-400
                    "
                  />

                  {item}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* =====================================
          CTA SECTION
      ====================================== */}

      <section className="bg-indigo-600 py-10 sm:py-12 lg:py-16">
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-6
            px-4
            text-center
            sm:px-6
            lg:flex-row
            lg:gap-8
            lg:px-8
            lg:text-left
          "
        >

          {/* CTA TEXT */}

          <div className="max-w-2xl">

            <h2
              className="
                text-2xl
                font-black
                leading-tight
                text-white
                sm:text-3xl
                lg:text-4xl
              "
            >
              Need a custom digital solution?
            </h2>

            <p
              className="
                mt-3
                text-base
                leading-relaxed
                text-indigo-100
                sm:text-lg
              "
            >
              Let's discuss your project
              requirements.
            </p>

          </div>

          {/* CTA BUTTON */}

          <Link
            to="/get-quote"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-white
              px-6
              py-3.5
              text-base
              font-bold
              text-indigo-700
              transition-all
              duration-300
              hover:bg-indigo-50
              hover:shadow-lg

              sm:w-auto
              sm:px-7
              sm:py-4
              sm:text-lg
            "
          >
            Start Your Project

            <ArrowRight size={18} />
          </Link>

        </div>
      </section>
    </>
  );
}

export default Services;
