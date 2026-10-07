
function SectionTitle({
  badge,
  title,
  description,
  center = true,
}) {
  return (
    <div
      className={`
        mb-10
        max-w-3xl
        sm:mb-12
        ${
          center
            ? "mx-0 text-left sm:mx-auto sm:text-center"
            : "mx-0 text-left"
        }
      `}
    >
      {badge && (
        <span
          className="
            mb-3
            inline-block
            rounded-full
            bg-indigo-50
            px-3
            py-1.5
            text-sm
            font-semibold
            text-indigo-600
            sm:px-4
            sm:py-2
            sm:text-lg
          "
        >
          {badge}
        </span>
      )}

      <h2
        className="
          text-2xl
          font-bold
          leading-tight
          tracking-tight
          text-slate-900
          sm:text-3xl
          md:text-4xl
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
            mt-3
            text-sm
            leading-6
            text-slate-600
            sm:mt-4
            sm:text-base
            sm:leading-7
            md:text-lg
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;
