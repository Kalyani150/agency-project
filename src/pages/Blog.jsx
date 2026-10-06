import {
  ArrowRight,
  CalendarDays,
  Clock,
  User,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import PageHero from "../components/PageHero";

function Blog({
  blogs = [],
}) {
  // ======================================================
  // ONLY SHOW PUBLISHED BLOGS
  // ======================================================

  const publishedBlogs = blogs.filter(
    (blog) =>
      !blog.status ||
      blog.status === "Published"
  );

  return (
    <>
      {/* ==================================================
          PAGE HERO
      ================================================== */}

      <PageHero
        badge="Our Blog"
        title="Insights, Ideas & Digital Trends"
        description="Explore useful insights, practical tips, and the latest trends in web development, UI/UX, SEO, and digital solutions."
      />

      {/* ==================================================
          BLOG LIST
      ================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HEADER */}

          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                Latest Articles
              </span>

              <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
                Explore Our Blogs
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Discover helpful articles and ideas
              to improve your digital presence.
            </p>
          </div>

          {/* ==================================================
              BLOG GRID
          ================================================== */}

          {publishedBlogs.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {publishedBlogs.map(
                (blog) => (
                  <article
                    key={blog.id}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
                  >
                    {/* IMAGE */}

                    <Link
                      to={`/blog/${blog.id}`}
                      className="block overflow-hidden bg-slate-100"
                    >
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={
                            blog.imageTitle ||
                            blog.title
                          }
                          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-56 w-full items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                          No Image
                        </div>
                      )}
                    </Link>

                    {/* CONTENT */}

                    <div className="flex flex-1 flex-col p-6">
                      {/* CATEGORY */}

                      {blog.category && (
                        <span className="w-fit rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                          {blog.category}
                        </span>
                      )}

                      {/* TITLE */}

                      <Link
                        to={`/blog/${blog.id}`}
                      >
                        <h3 className="mt-4 line-clamp-2 text-xl font-black leading-tight text-slate-900 transition group-hover:text-indigo-600">
                          {blog.title}
                        </h3>
                      </Link>

                      {/* DESCRIPTION */}

                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
                        {blog.shortDescription ||
                          blog.excerpt ||
                          blog.description ||
                          ""}
                      </p>

                      {/* META */}

                      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                        {blog.author && (
                          <span className="flex items-center gap-1.5">
                            <User
                              size={14}
                            />
                            {blog.author}
                          </span>
                        )}

                        {blog.date && (
                          <span className="flex items-center gap-1.5">
                            <CalendarDays
                              size={14}
                            />
                            {blog.date}
                          </span>
                        )}

                        {blog.readTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock
                              size={14}
                            />
                            {blog.readTime}
                          </span>
                        )}
                      </div>

                      {/* READ MORE */}

                      <div className="mt-auto pt-6">
                        <Link
                          to={`/blog/${blog.id}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition-all group-hover:gap-3"
                        >
                          Read More
                          <ArrowRight
                            size={17}
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          ) : (
            /* ==================================================
               EMPTY STATE
            ================================================== */

            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <h3 className="text-xl font-black text-slate-900">
                No Blogs Available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Published blogs will appear here.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Blog;