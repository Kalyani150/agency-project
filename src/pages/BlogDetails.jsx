import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  User,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

function BlogDetailsPage({
  blogs = [],
}) {
  const { id } = useParams();

  // ======================================================
  // FIND CURRENT BLOG
  // ======================================================

  const blogIndex = blogs.findIndex(
    (blog) =>
      String(blog.id) === String(id)
  );

  const blog =
    blogIndex !== -1
      ? blogs[blogIndex]
      : null;

  // ======================================================
  // BLOG NOT FOUND
  // ======================================================

  if (!blog) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-900">
            Blog Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The blog you are looking for does not exist.
          </p>

          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Blogs
          </Link>
        </div>
      </section>
    );
  }

  // ======================================================
  // HIDE UNPUBLISHED BLOGS
  // ======================================================

  if (
    blog.status &&
    blog.status !== "Published"
  ) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-900">
            Blog Not Available
          </h1>

          <p className="mt-3 text-slate-500">
            This blog is not currently published.
          </p>

          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Blogs
          </Link>
        </div>
      </section>
    );
  }

  // ======================================================
  // PUBLISHED BLOGS
  // ======================================================

  const publishedBlogs = blogs.filter(
    (item) =>
      !item.status ||
      item.status === "Published"
  );

  const currentPublishedIndex =
    publishedBlogs.findIndex(
      (item) =>
        String(item.id) === String(id)
    );

  const previousBlog =
    currentPublishedIndex > 0
      ? publishedBlogs[
          currentPublishedIndex - 1
        ]
      : null;

  const nextBlog =
    currentPublishedIndex <
    publishedBlogs.length - 1
      ? publishedBlogs[
          currentPublishedIndex + 1
        ]
      : null;

  // ======================================================
  // LONG DESCRIPTION
  // ======================================================

  const longDescription =
    blog.longDescription ||
    blog.content ||
    "";

  const paragraphs = longDescription
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph.trim()
    )
    .filter(Boolean);

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <main className="bg-white">
      {/* ==================================================
          HERO
      ================================================== */}

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition hover:gap-3"
          >
            <ArrowLeft size={17} />
            Back to Blogs
          </Link>

          <div className="mt-8">
            {blog.category && (
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                {blog.category}
              </span>
            )}

            <h1 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {blog.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-500">
              {blog.author && (
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {blog.author}
                </span>
              )}

              {blog.date && (
                <span className="flex items-center gap-2">
                  <CalendarDays
                    size={16}
                  />
                  {blog.date}
                </span>
              )}

              {blog.readTime && (
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {blog.readTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ==================================================
    IMAGE
================================================== */}

{blog.image && (
  <div className="w-full overflow-hidden rounded-3xl bg-slate-100">
    <img
      src={blog.image}
      alt={
        blog.imageTitle ||
        blog.title
      }
      className="block h-[300px] w-full object-cover sm:h-[400px] lg:h-[550px]"
    />
  </div>
)}
          {/* SHORT DESCRIPTION */}

          {(blog.shortDescription ||
            blog.excerpt ||
            blog.description) && (
            <div className="mt-10 rounded-2xl bg-slate-50 p-6 sm:p-8">
              <p className="text-base leading-8 text-slate-600">
                {blog.shortDescription ||
                  blog.excerpt ||
                  blog.description}
              </p>
            </div>
          )}

          {/* LONG DESCRIPTION */}

          {paragraphs.length > 0 && (
            <article className="mt-12">
              <div className="space-y-6">
                {paragraphs.map(
                  (
                    paragraph,
                    index
                  ) => (
                    <p
                      key={index}
                      className="text-base leading-8 text-slate-600 sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  )
                )}
              </div>
            </article>
          )}

          {/* ==================================================
              IMAGE INFORMATION
          ================================================== */}

          {(blog.imageTitle ||
            blog.imageDescription ||
            blog.imageContext ||
            blog.imageRelevance) && (
            <section className="mt-16 border-t border-slate-200 pt-12">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                About The Image
              </span>

              <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
                {blog.imageTitle ||
                  "Image Information"}
              </h2>

              {blog.imageDescription && (
                <div className="mt-6 space-y-5">
                  {blog.imageDescription
                    .split(/\n\s*\n/)
                    .map(
                      (
                        paragraph,
                        index
                      ) => (
                        <p
                          key={index}
                          className="text-base leading-8 text-slate-600"
                        >
                          {paragraph.trim()}
                        </p>
                      )
                    )}
                </div>
              )}

              {blog.imageContext && (
                <div className="mt-8">
                  <h3 className="text-lg font-black text-slate-900">
                    Image Context
                  </h3>

                  <div className="mt-4 space-y-4">
                    {blog.imageContext
                      .split(/\n\s*\n/)
                      .map(
                        (
                          paragraph,
                          index
                        ) => (
                          <p
                            key={index}
                            className="text-base leading-8 text-slate-600"
                          >
                            {paragraph.trim()}
                          </p>
                        )
                      )}
                  </div>
                </div>
              )}

              {blog.imageRelevance && (
                <div className="mt-8">
                  <h3 className="text-lg font-black text-slate-900">
                    Why This Image Is Relevant
                  </h3>

                  <div className="mt-4 space-y-4">
                    {blog.imageRelevance
                      .split(/\n\s*\n/)
                      .map(
                        (
                          paragraph,
                          index
                        ) => (
                          <p
                            key={index}
                            className="text-base leading-8 text-slate-600"
                          >
                            {paragraph.trim()}
                          </p>
                        )
                      )}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ==================================================
              PREVIOUS / NEXT
          ================================================== */}

          <div className="mt-16 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
            {previousBlog ? (
              <Link
                to={`/blog/${previousBlog.id}`}
                className="group rounded-2xl border border-slate-200 p-5 transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <ArrowLeft size={14} />
                  Previous Blog
                </span>

                <h3 className="mt-2 line-clamp-2 font-black text-slate-900 group-hover:text-indigo-600">
                  {previousBlog.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}

            {nextBlog && (
              <Link
                to={`/blog/${nextBlog.id}`}
                className="group rounded-2xl border border-slate-200 p-5 text-right transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                <span className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Next Blog
                  <ArrowRight size={14} />
                </span>

                <h3 className="mt-2 line-clamp-2 font-black text-slate-900 group-hover:text-indigo-600">
                  {nextBlog.title}
                </h3>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default BlogDetailsPage;