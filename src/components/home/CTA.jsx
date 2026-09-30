import {
  ArrowRight,
  Phone,
} from "lucide-react";

import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-indigo-600 py-20">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="rounded-3xl bg-indigo-700 p-8 sm:p-12 lg:p-16">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <span className="text-sm font-bold uppercase tracking-widest text-indigo-200">
                Let's Work Together
              </span>

              <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">
                Have a project in mind?
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-indigo-100">
                Tell us about your business and project requirements.
                Our team will help you find the right digital solution.
              </p>

            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">

              <Link
                to="/get-quote"
                className="flex items-center gap-2 rounded-lg bg-white px-7 py-4 font-bold text-indigo-700 hover:bg-slate-100"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="flex items-center gap-2 rounded-lg border border-white/30 px-7 py-4 font-bold text-white hover:bg-white/10"
              >
                Contact Us
                <Phone size={18} />
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTA;