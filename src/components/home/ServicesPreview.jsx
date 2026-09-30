import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import SectionTitle from "../SectionTitle";
import ServiceCard from "../ServiceCard";

function ServicesPreview({ services = [] }) {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionTitle
          badge="Our Services"
          title="We provide complete digital solutions"
          description="Everything your business needs to build, launch and grow a successful digital presence."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {services.slice(0, 6).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}

        </div>

        <div className="mt-12 text-center">

          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-7 py-4 font-bold text-white hover:bg-indigo-700"
          >
            View All Services
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </section>
  );
}

export default ServicesPreview;