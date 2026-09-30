import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll(
        "main section"
      );

      sections.forEach((section, sectionIndex) => {
        section.classList.add("gratech-section-reveal");

        /*
         * Animate the main content inside every section.
         */
        const children = section.querySelectorAll(
          ":scope > div"
        );

        children.forEach((element) => {
          element.classList.add(
            "gratech-content-reveal"
          );

          element.style.setProperty(
            "--reveal-delay",
            `${Math.min(sectionIndex * 40, 250)}ms`
          );
        });

        /*
         * Animate cards inside grids.
         */
        const gridItems = section.querySelectorAll(
          ".grid > *"
        );

        gridItems.forEach((element, index) => {
          element.classList.add(
            "gratech-card-reveal"
          );

          element.style.setProperty(
            "--card-delay",
            `${index * 90}ms`
          );
        });

        /*
         * Animate common cards.
         */
        const cards = section.querySelectorAll(
          ".rounded-2xl, .rounded-3xl"
        );

        cards.forEach((card, index) => {
          if (
            !card.classList.contains(
              "gratech-card-reveal"
            )
          ) {
            card.classList.add(
              "gratech-card-reveal"
            );

            card.style.setProperty(
              "--card-delay",
              `${index * 60}ms`
            );
          }
        });
      });

      /*
       * Image reveal / zoom.
       */
      const images = document.querySelectorAll(
        "main section img"
      );

      images.forEach((image) => {
        image.classList.add(
          "gratech-image-reveal"
        );
      });

      /*
       * Observe all animation elements.
       */
      const animatedElements =
        document.querySelectorAll(
          ".gratech-section-reveal, .gratech-content-reveal, .gratech-card-reveal, .gratech-image-reveal"
        );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "gratech-visible"
              );

              /*
               * Animate once only.
               */
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -60px 0px",
        }
      );

      animatedElements.forEach((element) => {
        observer.observe(element);
      });

      /*
       * Floating elements.
       */
      const floatingElements =
        document.querySelectorAll(
          ".gratech-floating"
        );

      floatingElements.forEach((element) => {
        element.classList.add(
          "gratech-floating-active"
        );
      });

      return () => {
        observer.disconnect();
      };
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

export default ScrollAnimations;