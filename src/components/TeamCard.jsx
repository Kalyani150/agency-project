

function TeamCard({ member }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

      <div className="relative overflow-hidden">

        <img
          src={member.image}
          alt={member.name}
          className="h-80 w-full object-cover transition duration-700 ease-out group-hover:rotate-2 group-hover:scale-110 group-hover:brightness-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 px-5 pb-5">


        </div>

      </div>

      <div className="p-6 text-center">

        <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
          {member.name}
        </h3>

        <p className="mt-1 text-sm text-indigo-600">
          {member.role}
        </p>

      </div>

    </div>
  );
}

export default TeamCard;