import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import BlogCard from "../BlogCard";

function BlogPreview({ blogs = [] }) {
  return (
    <section className="bg-white py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Latest Articles
            </span>

            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-5xl">
              From Our Blog
            </h2>

          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-bold text-indigo-600"
          >
            View All Articles
            <ArrowRight size={18} />
          </Link>

        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {blogs.slice(0, 3).map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default BlogPreview;