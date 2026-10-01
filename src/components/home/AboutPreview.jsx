
import {
  CheckCircle2,
  ArrowRight,
  Award,
} from "lucide-react";

import { Link } from "react-router-dom";

// ======================================================
// ASSETS
// ======================================================

import aboutTeam from "../../assets/about-team.png";

// ======================================================
// ABOUT PREVIEW
// ======================================================

function AboutPreview() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-24">

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:gap-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* ==================================================
            IMAGE
        ================================================== */}

        <div className="relative w-full">

          <img
            src={aboutTeam}
            alt="Our team"
            className="h-[320px] w-full rounded-2xl object-cover sm:h-[420px] sm:rounded-3xl lg:h-[500px]"
          />

          {/* Experience Card */}

          <div className="absolute -bottom-5 left-5 flex items-center gap-4 rounded-xl bg-indigo-600 px-5 py-4 text-white shadow-2xl sm:-bottom-7 sm:left-auto sm:right-5 sm:gap-0 sm:block sm:rounded-2xl sm:p-7 lg:-right-5">

            <Award
              size={25}
              className="shrink-0 sm:size-[30px]"
            />

            <div>
              <p className="text-2xl font-black sm:mt-3 sm:text-3xl">
                15+
              </p>

              <p className="text-xs text-indigo-100 sm:text-sm">
                Years Experience
              </p>
            </div>

          </div>

        </div>

        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="pt-5 sm:pt-6 lg:pt-0">

          {/* Section Label */}

          <span className="text-s font-bold uppercase tracking-[0.18em] text-indigo-600 sm:text-m sm:tracking-widest">
            About Our Company
          </span>

          {/* Heading */}

          <h2 className="mt-3 text-3xl font-black leading-[1.2] text-slate-900 sm:mt-4 sm:text-4xl sm:leading-tight lg:text-5xl">
            We create technology solutions that help businesses grow.
          </h2>

          {/* Description */}

          <p className="mt-5 text-lg leading-7 text-slate-600 sm:mt-6  sm:leading-8">
            We are a digital agency focused on building modern websites,
            applications, brands and digital experiences for ambitious
            businesses.
          </p>

          <p className="mt-3 text-lg leading-7 text-slate-600 sm:mt-4  sm:leading-8">
            Our team combines strategy, creativity and technology to turn
            business ideas into reliable digital products.
          </p>

          {/* ==================================================
              FEATURES
          ================================================== */}

          <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-4">

            {[
              "Experienced development team",
              "Business-focused solutions",
              "Modern technology stack",
              "Long-term technical support",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3"
              >

                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-indigo-600 sm:size-[20px]"
                />

                <span className="text-lg font-medium leading-6 text-slate-700 ">
                  {item}
                </span>

              </div>
            ))}

          </div>

          {/* ==================================================
              BUTTON
          ================================================== */}

          <Link
            to="/about"
            className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:bg-indigo-600 sm:mt-8 sm:w-auto sm:px-6 sm:py-4 sm:text-base"
          >
            More About Us
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </section>
  );
}

export default AboutPreview;
