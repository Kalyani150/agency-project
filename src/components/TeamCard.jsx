
function TeamCard({ member }) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-slate-100">
        <img
          src={member.image}
          alt={member.name}
          className="
            block
            h-auto
            w-full
            object-contain
            object-center
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.03]
          "
        />

        {/* Gradient */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-slate-950/80
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />
      </div>

      {/* Content */}
      <div className="p-4 text-center sm:p-5 lg:p-6">
        <h3
          className="
            text-lg
            font-bold
            text-slate-900
            transition-colors
            duration-300
            group-hover:text-indigo-600
            sm:text-xl
          "
        >
          {member.name}
        </h3>

        <p className="mt-1 text-xs text-indigo-600 sm:text-sm">
          {member.role}
        </p>
      </div>
    </div>
  );
}

export default TeamCard;

