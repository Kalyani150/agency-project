
import {
  ArrowUpRight,
  CalendarDays,
  Clock,
} from "lucide-react";

import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="
        group block w-full overflow-hidden
        rounded-2xl border border-slate-200
        bg-white
        transition-all duration-500
        hover:-translate-y-2
        hover:border-indigo-200
        hover:shadow-2xl
      "
    >
      {/* ==================================================
          IMAGE
      ================================================== */}

      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
        <img
          src={blog.image}
          alt={blog.title}
          className="
            h-full
            w-full
            object-cover
            transition duration-700 ease-out
            group-hover:scale-105
            group-hover:brightness-90
            sm:group-hover:rotate-2
            sm:group-hover:scale-110
          "
        />

        {/* Overlay */}

        <div
          className="
            absolute inset-0
            bg-slate-950/0
            transition duration-500
            group-hover:bg-slate-950/20
          "
        />

        {/* Image Action */}

        <div
          className="
            absolute right-3 top-3
            flex h-9 w-9
            translate-y-2
            items-center justify-center
            rounded-full
            bg-white
            text-slate-900
            opacity-0
            shadow-lg
            transition-all duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
            sm:right-5 sm:top-5
            sm:h-11 sm:w-11
          "
        >
          <ArrowUpRight
            size={17}
            className="sm:h-[18px] sm:w-[18px]"
          />
        </div>
      </div>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="p-4 sm:p-5 lg:p-6">

        {/* Category */}

        <span className="block truncate text-xs font-bold uppercase tracking-widest text-indigo-600 sm:text-sm">
          {blog.category}
        </span>

        {/* Title */}

        <h3
          className="
            mt-2
            line-clamp-2
            text-lg
            font-bold
            leading-6
            text-slate-900
            transition-colors duration-300
            group-hover:text-indigo-600
            sm:mt-3
            sm:text-xl
            sm:leading-7
            lg:text-2xl
            lg:leading-8
          "
        >
          {blog.title}
        </h3>

        {/* Excerpt */}

        <p
          className="
            mt-2
            line-clamp-2
            text-sm
            leading-6
            text-slate-600
            sm:mt-3
            sm:text-base
            sm:leading-7
          "
        >
          {blog.excerpt}
        </p>

        {/* ==================================================
            META
        ================================================== */}

        <div
          className="
            mt-4
            flex
            flex-col
            items-start
            gap-2
            border-t
            border-slate-100
            pt-4
            text-xs
            text-slate-500

            min-[351px]:flex-row
            min-[351px]:items-center
            min-[351px]:justify-between

            sm:mt-5
            sm:gap-2
            sm:pt-5
            sm:text-sm
          "
        >
          {/* Date */}

          <span className="flex min-w-0 items-center gap-1.5">
            <CalendarDays
              className="shrink-0"
              size={14}
            />

            <span className="truncate">
              {blog.date}
            </span>
          </span>

          {/* Read Time */}

          <span className="flex shrink-0 items-center gap-1.5">
            <Clock size={14} />

            <span>
              {blog.readTime}
            </span>
          </span>
        </div>

        {/* ==================================================
            READ ARTICLE
        ================================================== */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            text-sm
            font-bold
            text-indigo-600
            sm:mt-5
            sm:text-base
          "
        >
          <span
            className="
              transition-all duration-300
              group-hover:translate-x-1
            "
          >
            Read Article
          </span>

          <ArrowUpRight
            size={17}
            className="
              transition-transform duration-300
              group-hover:rotate-45
              sm:h-[18px] sm:w-[18px]
            "
          />
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
