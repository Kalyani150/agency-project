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
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-3 hover:border-indigo-200 hover:shadow-2xl"
    >

      <div className="relative overflow-hidden">

        <img
          src={blog.image}
          alt={blog.title}
          className="h-60 w-full object-cover transition duration-700 ease-out group-hover:rotate-2 group-hover:scale-110 group-hover:brightness-90"
        />

        <div className="absolute inset-0 bg-slate-950/0 transition duration-500 group-hover:bg-slate-950/20" />

        <div className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-slate-900 opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>

      </div>

      <div className="p-6">

        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
          {blog.category}
        </span>

        <h3 className="mt-3 text-xl font-bold leading-8 text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
          {blog.title}
        </h3>

        <p className="mt-3 line-clamp-2 leading-7 text-slate-600">
          {blog.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-xs text-slate-500">

          <span className="flex items-center gap-1">
            <CalendarDays size={14} />
            {blog.date}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={14} />
            {blog.readTime}
          </span>

        </div>

        <div className="mt-5 flex items-center justify-between text-sm font-bold text-indigo-600">

          <span className="transition-all duration-300 group-hover:translate-x-1">
            Read Article
          </span>

          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:rotate-45"
          />

        </div>

      </div>

    </Link>
  );
}

export default BlogCard;