import {
  useMemo,
  useState,
} from "react";

import PageHero from "../components/PageHero";
import BlogCard from "../components/BlogCard";

function Blog({ blogs = [] }) {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const categories = [
    "All",
    ...new Set(
      blogs.map(
        (blog) => blog.category
      )
    ),
  ];

  const filteredBlogs = useMemo(() => {

    return blogs.filter((blog) => {

      const matchesCategory =
        category === "All" ||
        blog.category === category;

      const matchesSearch =
        blog.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesCategory &&
        matchesSearch
      );
    });

  }, [blogs, search, category]);

  return (
    <>

      <PageHero
        badge="Our Blog"
        title="Insights, Ideas & Technology"
        description="Read our latest articles about technology, design, marketing and digital business."
      />

      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 lg:flex-row">

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search articles..."
              className="flex-1 rounded-xl border border-slate-200 px-5 py-4 outline-none focus:border-indigo-500"
            />

            <div className="flex flex-wrap gap-2">

              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    setCategory(item)
                  }
                  className={`rounded-full px-5 py-3 text-sm font-bold ${
                    category === item
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
              />
            ))}

          </div>

        </div>

      </section>

    </>
  );
}

export default Blog;