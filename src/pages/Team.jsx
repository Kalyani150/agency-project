
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import TeamCard from "../components/TeamCard";
import { initialTeam } from "../data";

function Team() {
  return (
    <>
      <PageHero
        badge="Our Team"
        title="Meet The People Behind Our Work"
        description="A multidisciplinary team of designers, developers and digital specialists."
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Our People"
            title="Talented People Building Great Products"
            description="Our team combines technical skills, creative thinking and business understanding."
          />

          <div className="mt-14 grid grid-cols-1 gap-7 min-[400px]:grid-cols-2 lg:grid-cols-4">
            {initialTeam.map((member) => (
              <div key={member.id} className="min-w-0">
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

