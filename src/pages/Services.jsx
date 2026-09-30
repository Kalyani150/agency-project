import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";

function Services({ services = [] }) {
  return (
    <>

      <PageHero
        badge="Our Services"
        title="Complete Digital Solutions For Modern Businesses"
        description="From strategy and design to development and marketing, we provide the technology services your business needs."
      />

      <section className="bg-white py-20 sm:py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionTitle
            badge="What We Do"
            title="Our Technology Services"
            description="Choose the right service for your business requirements."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}

          </div>

        </div>

      </section>

      <section className="bg-slate-950 py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <span className="text-sm font-bold uppercase tracking-widest text-indigo-400">
                Why Our Services
              </span>

              <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">
                Everything you need to grow digitally
              </h2>

              <p className="mt-6 leading-8 text-slate-400">
                We combine technology, design and strategy to create solutions that are practical and focused on measurable business outcomes.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {[
                "Modern technology",
                "Responsive design",
                "SEO friendly",
                "Secure development",
                "Scalable architecture",
                "Ongoing support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-5 text-white"
                >
                  <CheckCircle2
                    size={20}
                    className="text-indigo-400"
                  />

                  {item}
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      <section className="bg-indigo-600 py-16">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 px-4 sm:px-6 lg:px-8 text-center lg:flex-row lg:text-left">

          <div>

            <h2 className="text-3xl font-black text-white">
              Need a custom digital solution?
            </h2>

            <p className="mt-3 text-indigo-100">
              Let's discuss your project requirements.
            </p>

          </div>

          <Link
            to="/get-quote"
            className="flex items-center gap-2 rounded-lg bg-white px-7 py-4 font-bold text-indigo-700"
          >
            Start Your Project
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </>
  );
}

export default Services;