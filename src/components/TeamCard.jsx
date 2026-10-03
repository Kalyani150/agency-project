
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
        hover:-translate-y-1
        hover:shadow-xl
        sm:hover:-translate-y-2
        sm:hover:shadow-2xl
      "
    >
      {/* Image */}
      <div
        className="
          relative
          aspect-[4/3]
          w-full
          overflow-hidden
          bg-slate-100
          sm:aspect-[4/3]
          lg:aspect-[4/4]
        "
      >
        <img
          src={member.image}
          alt={member.name}
          className="
            block
            h-full
            w-full
            object-cover
            object-top
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.02]
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
      <div
        className="
          px-3
          py-3
          text-center
          min-[450px]:px-4
          min-[450px]:py-4
          sm:px-4
          sm:py-4
        "
      >
        <h3
          className="
            text-base
            font-bold
            leading-tight
            text-slate-900
            transition-colors
            duration-300
            group-hover:text-indigo-600
            min-[450px]:text-lg
            sm:text-xl
          "
        >
          {member.name}
        </h3>

        <p
          className="
            mt-1
            text-xs
            leading-5
            text-indigo-600
            sm:text-sm
          "
        >
          {member.role}
        </p>
      </div>
    </div>
  );
}

export default TeamCard;
