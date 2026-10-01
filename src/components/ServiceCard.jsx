import {
  Code2,
  Palette,
  Smartphone,
  Megaphone,
  Search,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const icons = {
  Code2,
  Palette,
  Smartphone,
  Megaphone,
  Search,
  Sparkles,
};

function ServiceCard({ service }) {
  const Icon =
    icons[service.icon] || Code2;

  return (
    <Link
      to={`/services/${service.id}`}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-3 hover:border-indigo-200 hover:shadow-2xl"
    >

      {/* Hover glow */}

      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-indigo-100 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between">

        <div className="gratech-icon-flip flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white">
          <Icon size={27} />
        </div>

        <ArrowUpRight
          size={21}
          className="text-slate-300 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-indigo-600"
        />

      </div>

      <p className="relative mt-6 text-m font-bold uppercase tracking-widest text-indigo-600">
        {service.category}
      </p>

      <h3 className="relative mt-2 text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
        {service.title}
      </h3>

      <p className="relative mt-3 leading-7 text-lg text-slate-600">
        {service.description}
      </p>

      <span className="relative mt-6 inline-flex items-center gap-1 text-m font-bold text-indigo-600 transition-all duration-300 group-hover:gap-3">
        Learn More
        <ArrowUpRight size={15} />
      </span>

    </Link>
  );
}

export default ServiceCard;