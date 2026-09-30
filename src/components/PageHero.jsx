import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function PageHero({
  badge,
  title,
  description,
}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">

      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl">

          <span className="text-sm font-bold uppercase tracking-widest text-indigo-400">
            {badge}
          </span>

          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {description}
          </p>

          <div className="mt-7 flex items-center gap-2 text-sm text-slate-500">

            <Link
              to="/"
              className="hover:text-white"
            >
              Home
            </Link>

            <ArrowRight size={14} />

            <span className="text-indigo-400">
              {badge}
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default PageHero;