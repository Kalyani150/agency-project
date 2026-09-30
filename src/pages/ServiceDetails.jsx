import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import PageHero from "../components/PageHero";

function ServiceDetails({ services = [] }) {
  const { id } = useParams();

  const service = services.find(
    (item) => String(item.id) === String(id)
  );

  if (!service) {
    return (
      <div className="px-5 py-32 text-center">
        <h1 className="text-3xl font-bold">
          Service Not Found
        </h1>

        <Link
          to="/services"
          className="mt-5 inline-block text-indigo-600"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <>

      <PageHero
        badge="Service Details"
        title={service.title}
        description={service.description}
      />

      <section className="bg-white py-20">

        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:px-8 lg:grid-cols-3">

          <div className="lg:col-span-2">

            <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              {service.category}
            </span>

            <h2 className="mt-4 text-4xl font-black text-slate-900">
              {service.title}
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              {service.description}
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              We provide professional solutions designed around your business requirements. Our team works closely with you from planning and design through development, testing and launch.
            </p>

            <h3 className="mt-12 text-2xl font-black text-slate-900">
              What We Provide
            </h3>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">

              {[
                "Requirement Analysis",
                "Modern Design",
                "Responsive Development",
                "Performance Optimization",
                "Testing & Quality Assurance",
                "Deployment & Support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-5"
                >
                  <CheckCircle2
                    size={20}
                    className="text-indigo-600"
                  />

                  <span className="font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}

            </div>

          </div>

          <aside className="h-fit rounded-2xl bg-slate-950 p-7 text-white">

            <h3 className="text-xl font-bold">
              Need This Service?
            </h3>

            <p className="mt-4 leading-7 text-slate-400">
              Tell us what you need and our team will get back to you.
            </p>

            <Link
              to="/get-quote"
              className="mt-7 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-4 font-bold hover:bg-indigo-700"
            >
              Get A Quote
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/contact"
              className="mt-3 block text-center text-sm font-semibold text-indigo-400"
            >
              Contact Us
            </Link>

          </aside>

        </div>

      </section>

    </>
  );
}

export default ServiceDetails;