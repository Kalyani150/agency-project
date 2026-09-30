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
    <section className="bg-white py-20 sm:py-24">

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* ==================================================
            IMAGE
        ================================================== */}

        <div className="relative">

          <img
            src={aboutTeam}
            alt="Our team"
            className="h-[500px] w-full rounded-3xl object-cover"
          />

          {/* Experience Card */}

          <div className="absolute -bottom-7 -right-5 hidden rounded-2xl bg-indigo-600 p-7 text-white shadow-2xl sm:block">

            <Award size={30} />

            <p className="mt-3 text-3xl font-black">
              15+
            </p>

            <p className="text-sm text-indigo-100">
              Years Experience
            </p>

          </div>

        </div>

        {/* ==================================================
            CONTENT
        ================================================== */}

        <div>

          <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            About Our Company
          </span>

          <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
            We create technology solutions that help businesses grow.
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            We are a digital agency focused on building modern websites,
            applications, brands and digital experiences for ambitious
            businesses.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Our team combines strategy, creativity and technology to turn
            business ideas into reliable digital products.
          </p>

          {/* Features */}

          <div className="mt-7 space-y-4">

            {[
              "Experienced development team",
              "Business-focused solutions",
              "Modern technology stack",
              "Long-term technical support",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <CheckCircle2
                  size={20}
                  className="text-indigo-600"
                />

                <span className="font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}

          </div>

          {/* Button */}

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-indigo-600"
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