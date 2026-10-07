import {
  ArrowUpRight,
  Code2,
  Palette,
  Megaphone,
  Search,
  Smartphone,
  Sparkles,
} from "lucide-react";

// =========================================
// ICON MAPPING
// =========================================

const icons = {
  development: Code2,
  design: Palette,
  marketing: Megaphone,
  seo: Search,
  mobile: Smartphone,
  branding: Sparkles,
};

// =========================================
// SERVICE CARD
// =========================================

function ServiceCard({ service }) {
  const Icon = icons[service.icon] || Code2;

  return (
    <div
      className="
        group
        relative
        flex
        h-full
        min-h-[318px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-300
        bg-white
        p-7
        shadow-none
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-200
        hover:shadow-xl
      "
    >
      {/* =====================================
          ICON + ARROW
      ====================================== */}

      <div className="flex items-start justify-between">

        {/* Icon */}

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            bg-indigo-50
            text-indigo-600
            transition-all
            duration-300
            group-hover:bg-indigo-600
            group-hover:text-white
          "
        >
          <Icon
            size={28}
            strokeWidth={2}
          />
        </div>

        {/* Arrow */}

        <ArrowUpRight
          size={20}
          strokeWidth={1.8}
          className="
            text-slate-300
            transition-all
            duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
            group-hover:text-indigo-600
          "
        />
      </div>

      {/* =====================================
          CATEGORY
      ====================================== */}

      <span
        className="
          mt-7
          text-sm
          font-bold
          uppercase
          tracking-widest
          text-indigo-600
        "
      >
        {service.category}
      </span>

      {/* =====================================
          TITLE
      ====================================== */}

      <h3
        className="
          mt-3
          text-2xl
          font-black
          leading-tight
          text-slate-950
        "
      >
        {service.title}
      </h3>

      {/* =====================================
          DESCRIPTION
      ====================================== */}

      <p
        className="
          mt-3
          text-base
          leading-7
          text-slate-600
        "
      >
        {service.description}
      </p>

      {/* =====================================
          LEARN MORE
      ====================================== */}

      <div className="mt-auto pt-7">
        <a
          href={service.href || "#"}
          className="
            inline-flex
            items-center
            gap-2
            text-base
            font-bold
            text-indigo-600
            transition-colors
            duration-200
            hover:text-indigo-800
          "
        >
          Learn More

          <ArrowUpRight
            size={17}
            strokeWidth={2}
          />
        </a>
      </div>
    </div>
  );
}

export default ServiceCard;
