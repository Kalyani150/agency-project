
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  User,
  Tag,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

function BlogDetails({ blogs = [] }) {
  const { id } = useParams();

  // Find current blog index
  const blogIndex = blogs.findIndex(
    (item) => String(item.id) === String(id)
  );

  // Blog not found
  if (blogIndex === -1) {
    return (
      <section className="min-h-[60vh] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
            Article Not Found
          </h1>

          <Link
            to="/blog"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  // Current blog
  const blog = blogs[blogIndex];

  // Previous blog
  const previousBlog =
    blogIndex > 0
      ? blogs[blogIndex - 1]
      : null;

  // Next blog
  const nextBlog =
    blogIndex < blogs.length - 1
      ? blogs[blogIndex + 1]
      : null;

  return (
    <article className="bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="bg-slate-950 py-14 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="max-w-4xl">

            {/* Category */}
            <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-2 text-xs font-bold text-indigo-300 sm:px-4 sm:text-sm">
              <Tag size={14} className="shrink-0 sm:h-4 sm:w-4" />
              <span className="truncate">
                {blog.category}
              </span>
            </span>

            {/* Title */}
            <h1 className="mt-5 break-words text-3xl font-black leading-tight tracking-tight sm:mt-7 sm:text-5xl lg:text-6xl">
              {blog.title}
            </h1>

            {/* Blog Meta */}
            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">

              <span className="flex items-center gap-2">
                <User size={16} className="shrink-0" />
                <span>{blog.author}</span>
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays size={16} className="shrink-0" />
                <span>{blog.date}</span>
              </span>

              <span className="flex items-center gap-2">
                <Clock size={16} className="shrink-0" />
                <span>{blog.readTime}</span>
              </span>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          BLOG CONTENT
      ====================================================== */}
      <section className="bg-white py-10 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition hover:text-indigo-700 sm:text-base"
          >
            <ArrowLeft size={17} />
            Back to Blog
          </Link>

          {/* =================================================
              BLOG IMAGE
          ================================================== */}
          {blog.image && (
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg sm:mt-8 sm:rounded-3xl">

              <img
                src={blog.image}
                alt={blog.title}
                className="block h-[220px] w-full object-cover transition duration-500 hover:scale-[1.02] sm:h-[400px] lg:h-[560px]"
              />

            </div>
          )}

          {/* =================================================
              IMAGE INFORMATION
          ================================================== */}
          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:mt-6 sm:p-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="min-w-0">

              <p className="break-words text-sm font-bold text-slate-900 sm:text-base">
                {blog.title}
              </p>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Featured image for this article
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 sm:text-sm">

              <span className="flex items-center gap-2">
                <CalendarDays
                  size={15}
                  className="shrink-0 text-indigo-600 sm:h-4 sm:w-4"
                />
                {blog.date}
              </span>

              <span className="flex items-center gap-2">
                <Clock
                  size={15}
                  className="shrink-0 text-indigo-600 sm:h-4 sm:w-4"
                />
                {blog.readTime}
              </span>

            </div>

          </div>

          {/* =================================================
              MAIN ARTICLE AREA
          ================================================== */}
          <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-3 lg:gap-10">

            {/* =================================================
                ARTICLE
            ================================================== */}
            <div className="min-w-0 lg:col-span-2">

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                  {blog.excerpt}
                </p>
              )}

              {/* Introduction */}
              <p className="mt-6 text-sm leading-7 text-slate-600 sm:mt-7 sm:text-base sm:leading-8">
                In today's digital environment, businesses need strong
                digital experiences to connect with customers and remain
                competitive. A well-planned technology strategy can improve
                efficiency, customer experience and business growth.
              </p>

              {/* Section 1 */}
              <h2 className="mt-10 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:mt-12 sm:text-3xl lg:text-4xl">
                Building Better Digital Experiences
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
                The best digital products begin with a clear understanding
                of users and business requirements. Design and technology
                should work together to solve real problems instead of
                simply adding features.
              </p>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
                Whether you are building a new website, application or
                marketing platform, focusing on performance, usability and
                scalability creates a stronger foundation for long-term
                growth.
              </p>

              {/* Section 2 */}
              <h2 className="mt-10 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:mt-12 sm:text-3xl lg:text-4xl">
                Why Strategy Matters
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
                A successful digital solution requires more than attractive
                visuals. It should have a clear purpose, an intuitive user
                experience and technology that can support changing business
                requirements.
              </p>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
                By combining thoughtful design, reliable development and
                measurable business goals, organizations can create digital
                products that provide value to both customers and internal
                teams.
              </p>

              {/* Section 3 */}
              <h2 className="mt-10 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:mt-12 sm:text-3xl lg:text-4xl">
                Creating Long-Term Value
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
                Digital experiences should be designed with the future in
                mind. Businesses need solutions that can adapt as their
                customers, markets and technologies evolve.
              </p>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
                A scalable architecture, responsive design and thoughtful
                user experience can help organizations build products that
                remain useful and effective as their needs grow.
              </p>

            </div>

            {/* =================================================
                BLOG INFORMATION SIDEBAR
            ================================================== */}
            <aside className="h-fit min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:rounded-3xl sm:p-7 lg:sticky lg:top-24">

              <h3 className="text-lg font-black text-slate-900 sm:text-xl">
                Article Information
              </h3>

              <div className="mt-6 space-y-5 sm:mt-7 sm:space-y-6">

                {/* Author */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Author
                  </p>

                  <div className="mt-2 flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <User size={18} />
                    </div>

                    <p className="break-words text-sm font-semibold text-slate-800 sm:text-base">
                      {blog.author}
                    </p>

                  </div>
                </div>

                {/* Category */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Category
                  </p>

                  <p className="mt-2 break-words text-sm font-semibold text-slate-800 sm:text-base">
                    {blog.category}
                  </p>
                </div>

                {/* Date */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Published
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-800 sm:text-base">

                    <CalendarDays
                      size={18}
                      className="shrink-0 text-indigo-600"
                    />

                    <span className="font-semibold">
                      {blog.date}
                    </span>

                  </div>
                </div>

                {/* Reading Time */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Reading Time
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-800 sm:text-base">

                    <Clock
                      size={18}
                      className="shrink-0 text-indigo-600"
                    />

                    <span className="font-semibold">
                      {blog.readTime}
                    </span>

                  </div>
                </div>

              </div>

            </aside>

          </div>

          {/* =====================================================
              PREVIOUS / NEXT BLOG
          ====================================================== */}
          {(previousBlog || nextBlog) && (
            <div className="mt-12 border-t border-slate-200 pt-6 sm:mt-16 sm:pt-8">

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Previous */}
                {previousBlog && (
                  <Link
                    to={`/blog/${previousBlog.id}`}
                    className="group min-w-0 rounded-2xl border border-slate-200 p-4 transition duration-300 hover:border-indigo-500 hover:bg-indigo-50 sm:p-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 transition group-hover:bg-indigo-600 group-hover:text-white sm:h-11 sm:w-11">
                        <ArrowLeft size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
                          Previous Blog
                        </p>

                        <p className="mt-1 truncate text-sm font-bold text-slate-900 sm:text-base">
                          {previousBlog.title}
                        </p>
                      </div>

                    </div>
                  </Link>
                )}

                {/* Next */}
                {nextBlog && (
                  <Link
                    to={`/blog/${nextBlog.id}`}
                    className={`group min-w-0 rounded-2xl border border-slate-200 p-4 transition duration-300 hover:border-indigo-500 hover:bg-indigo-50 sm:p-5 ${
                      !previousBlog
                        ? "sm:col-start-2"
                        : ""
                    }`}
                  >
                    <div className="flex min-w-0 items-center justify-end gap-3 text-right">

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
                          Next Blog
                        </p>

                        <p className="mt-1 truncate text-sm font-bold text-slate-900 sm:text-base">
                          {nextBlog.title}
                        </p>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 transition group-hover:bg-indigo-600 group-hover:text-white sm:h-11 sm:w-11">
                        <ArrowRight size={18} />
                      </div>

                    </div>
                  </Link>
                )}

              </div>

            </div>
          )}

        </div>
      </section>

    </article>
  );
}

export default BlogDetails;
