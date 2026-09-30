import {
  CheckCircle2,
  Target,
  Eye,
  Heart,
} from "lucide-react";

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

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

          {/* IMAGE */}

          <div>
            <img
              src={aboutTeam}
              alt="Our team"
              className="
                h-[400px]
                w-full
                rounded-3xl
                object-cover
                shadow-lg
                sm:h-[500px]
              "
            />
          </div>

          {/* CONTENT */}

          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Who We Are
            </span>

            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-5xl">
              A team focused on technology, design and business growth.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              We help organizations build strong digital products through a
              combination of strategy, design and technology.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              From a simple business website to a complex web application, we
              focus on creating solutions that are easy to use, scalable and
              aligned with business objectives.
            </p>

            {/* FEATURES */}

            <div className="mt-8 space-y-4">
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

                  <span className="font-medium text-slate-700">
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

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionTitle
            badge="Our Values"
            title="What Drives Us"
            description="The principles behind the way we build digital products."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
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
                    p-8
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                  "
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
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

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionTitle
            badge="Our Team"
            title="Meet The People Behind Our Work"
            description="A multidisciplinary team working together to create great digital experiences."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.slice(0, 4).map((member) => (
              <TeamCard
                key={member.id}
                member={member}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default About;