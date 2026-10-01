
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import SectionTitle from "../SectionTitle";
import ServiceCard from "../ServiceCard";

function ServicesPreview({ services = [] }) {
  // ======================================================
  // SHOW ONLY ACTIVE SERVICES
  // ======================================================

  const activeServices = services.filter(
    (service) => service.status === "Active"
  );

  // Show maximum 6 services on Home page
  const previewServices = activeServices.slice(0, 6);

  return (
    <section className="bg-slate-50 py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            SECTION TITLE
        ================================================== */}

        <SectionTitle
          badge="Our Services"
          title="We provide complete digital solutions"
          description="Everything your business needs to build, launch and grow a successful digital presence."
        />

        {/* ==================================================
            SERVICES GRID
        ================================================== */}

        {previewServices.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 min-[450px]:grid-cols-2 sm:mt-14 sm:gap-6 lg:grid-cols-3">

            {previewServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}

          </div>
        ) : (
          /* ==================================================
              EMPTY STATE
          ================================================== */

          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center sm:mt-14">

            <h3 className="text-xl font-bold text-slate-900">
              No services available
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
              Our services will be available here soon.
            </p>

          </div>
        )}

        {/* ==================================================
            VIEW ALL SERVICES
        ================================================== */}

        <div className="mt-10 text-center sm:mt-12">

          <Link
            to="/services"
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-indigo-600 px-7 py-3.5 font-bold text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg sm:w-auto sm:py-4"
          >
            View All Services

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

      </div>

    </section>
  );
}

export default ServicesPreview;

