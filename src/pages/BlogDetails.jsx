import {
  ArrowLeft,
  CalendarDays,
  Clock,
  User,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

function BlogDetails({ blogs = [] }) {
  const { id } = useParams();

  const blog = blogs.find(
    (item) =>
      String(item.id) === String(id)
  );

  if (!blog) {
    return (
      <div className="px-5 py-32 text-center">
        <h1 className="text-3xl font-bold">
          Article Not Found
        </h1>

        <Link
          to="/blog"
          className="mt-5 inline-block text-indigo-600"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article>

      <section className="bg-slate-950 py-24 text-white">

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <span className="rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-300">
            {blog.category}
          </span>

          <h1 className="mt-7 text-4xl font-black leading-tight sm:text-6xl">
            {blog.title}
          </h1>

          <div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-400">

            <span className="flex items-center gap-2">
              <User size={16} />
              {blog.author}
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays size={16} />
              {blog.date}
            </span>

            <span className="flex items-center gap-2">
              <Clock size={16} />
              {blog.readTime}
            </span>

          </div>

        </div>

      </section>

      <section className="bg-white py-20">

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-bold text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to Blog
          </Link>

          <img
            src={blog.image}
            alt={blog.title}
            className="mt-8 h-[450px] w-full rounded-3xl object-cover"
          />

          <div className="mt-10">

            <p className="text-lg leading-9 text-slate-600">
              {blog.excerpt}
            </p>

            <p className="mt-6 leading-8 text-slate-600">
              In today's digital environment, businesses need strong digital experiences to connect with customers and remain competitive. A well-planned technology strategy can improve efficiency, customer experience and business growth.
            </p>

            <h2 className="mt-10 text-3xl font-black text-slate-900">
              Building Better Digital Experiences
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              The best digital products begin with a clear understanding of users and business requirements. Design and technology should work together to solve real problems instead of simply adding features.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Whether you are building a new website, application or marketing platform, focusing on performance, usability and scalability creates a stronger foundation for long-term growth.
            </p>

          </div>

        </div>

      </section>

    </article>
  );
}

export default BlogDetails;