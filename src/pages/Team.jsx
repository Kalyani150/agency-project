
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import TeamCard from "../components/TeamCard";
import { initialTeam } from "../data";

function Team() {
  return (
    <>
      {/* ==================================================
          PAGE HERO
      ================================================== */}

      <PageHero
        badge="Our Team"
        title="Meet The People Behind Our Work"
        description="A multidisciplinary team of designers, developers and digital specialists."
      />

      {/* ==================================================
          TEAM SECTION
      ================================================== */}

      <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ==================================================
              SECTION TITLE
          ================================================== */}

          <div className="text-left sm:text-left lg:text-left">
            <SectionTitle
              badge="Our People"
              title="Talented People Building Great Products"
              description="Our team combines technical skills, creative thinking and business understanding."
            />
          </div>

          {/* ==================================================
              TEAM GRID
          ================================================== */}

          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-5
              min-[400px]:grid-cols-2
              sm:mt-12
              sm:gap-6
              lg:mt-14
              lg:grid-cols-4
              lg:gap-7
            "
          >
            {initialTeam.map((member) => (
              <div
                key={member.id}
                className="min-w-0"
              >
                <TeamCard member={member} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default Team;

