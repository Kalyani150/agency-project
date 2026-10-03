
import {
  CheckCircle2,
  Target,
  Eye,
  Heart,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

// ======================================================
// LOCAL ASSETS
// ======================================================

import aboutTeam from "../assets/teams.png";

// ======================================================
// COMPONENTS
// ======================================================

import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import TeamCard from "../components/TeamCard";

function About({ team = [] }) {
  return (
    <>
      {/* ==================================================
          PAGE HERO
      ================================================== */}

      <PageHero
        badge="About Us"
        title="We Build Digital Solutions That Create Real Business Value"
        description="A technology and digital agency helping businesses transform ideas into modern digital experiences."
      />

      {/* ==================================================
          ABOUT
      ================================================== */}

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">

          {/* IMAGE */}

          <div className="flex items-center justify-center">
            <div className="w-full overflow-hidden rounded-3xl bg-slate-50 p-2 shadow-lg">
              <img
                src={aboutTeam}
                alt="Our team"
                className="
                  h-[300px]
                  w-full
                  rounded-2xl
                  object-contain
                  sm:h-[380px]
                  lg:h-[420px]
                "
              />
            </div>
          </div>

          {/* CONTENT */}

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 sm:text-sm">
              Who We Are
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              A team focused on technology, design and business growth.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              We help organizations build strong digital products through a
              combination of strategy, design and technology.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              From a simple business website to a complex web application, we
              focus on creating solutions that are easy to use, scalable and
              aligned with business objectives.
            </p>

            {/* FEATURES */}

            <div className="mt-7 space-y-3">
              {[
                "Experienced technology team",
                "Transparent communication",
                "Modern development practices",
                "Long-term support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-indigo-600"
                  />

                  <span className="text-base font-medium text-slate-700 sm:text-lg">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          MISSION / VALUES
      ================================================== */}

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionTitle
            badge="Our Values"
            title="What Drives Us"
            description="The principles behind the way we build digital products."
          />

          <div className="mt-12 grid gap-5 min-[450px]:grid-cols-2 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To help businesses use technology to solve real problems and create sustainable growth.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "To become a trusted technology partner for organizations building their digital future.",
              },
              {
                icon: Heart,
                title: "Our Values",
                text: "Quality, transparency, collaboration, innovation and long-term relationships.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    rounded-2xl
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                    sm:p-7
                  "
                >
                  <div className="gratech-icon-flip flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-14 sm:w-14">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          TEAM
      ================================================== */}

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionTitle
            badge="Our Team"
            title="Meet The People Behind Our Work"
            description="A multidisciplinary team working together to create great digital experiences."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.slice(0, 4).map((member) => (
              <TeamCard
                key={member.id}
                member={member}
              />
            ))}
          </div>

        </div>
      </section>

      
{/* ======================================================
    CTA
====================================================== */}


<section className="bg-indigo-600 py-10 sm:py-14 lg:py-20">
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <div
      className="
        w-full
        overflow-hidden
        rounded-2xl
        bg-indigo-700
        px-5
        py-8
        text-left
        shadow-xl
        sm:rounded-3xl
        sm:px-8
        sm:py-12
        sm:text-center
        md:px-10
        md:py-14
        lg:px-16
        lg:py-16
      "
    >
      {/* Badge */}
      <span
        className="
          inline-block
          text-[10px]
          font-bold
          uppercase
          tracking-[0.15em]
          text-indigo-200
          min-[400px]:text-xs
          sm:text-sm
          sm:tracking-[0.2em]
        "
      >
        Let's Work Together
      </span>

      {/* Heading */}
      <h2
        className="
          mt-3
          w-full
          max-w-3xl
          text-2xl
          font-black
          leading-tight
          text-white
          min-[400px]:text-3xl
          sm:mx-auto
          sm:mt-4
          sm:text-4xl
          lg:text-5xl
        "
      >
        Have an idea? Let's turn it into a digital solution.
      </h2>

      {/* Description */}
      <p
        className="
          mt-4
          w-full
          max-w-2xl
          text-sm
          leading-6
          text-indigo-100
          min-[400px]:text-base
          sm:mx-auto
          sm:mt-5
          sm:text-lg
          sm:leading-8
        "
      >
        Whether you need a new website, application or digital strategy,
        our team is ready to help you build something valuable.
      </p>

      {/* Button */}
      <div
        className="
          mt-6
          flex
          w-full
          justify-start
          sm:mt-8
          sm:justify-center
        "
      >
        <Link
          to="/contact"
          className="
            inline-flex
            w-auto
            items-center
            justify-center
            rounded-xl
            border
            border-white/30
            px-5
            py-3
            text-sm
            font-bold
            text-white
            transition-all
            duration-300
            hover:bg-white/10
            active:scale-[0.98]
            min-[400px]:px-6
          "
        >
          Contact Us
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  </div>
</section>



    </>
  );
}

export default About;
