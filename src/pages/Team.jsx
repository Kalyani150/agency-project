import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import TeamCard from "../components/TeamCard";

function Team({ team = [] }) {
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

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {team.map((member) => (
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

export default Team;