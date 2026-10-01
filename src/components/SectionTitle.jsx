function SectionTitle({
  badge,
  title,
  description,
  center = true,
}) {
  return (
    <div
      className={`mb-12 ${
        center ? "mx-auto text-center" : ""
      } max-w-3xl`}
    >
      {badge && (
        <span className="mb-3 inline-block rounded-full bg-indigo-50 px-4 py-2 text-lg font-semibold text-indigo-600">
          {badge}
        </span>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;