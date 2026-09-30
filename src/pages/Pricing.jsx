import {
  Check,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$499",
    description:
      "For small businesses starting their digital journey.",
    features: [
      "Business Website",
      "Responsive Design",
      "Basic SEO",
      "Contact Form",
      "Basic Support",
    ],
  },

  {
    name: "Professional",
    price: "$999",
    popular: true,
    description:
      "For growing businesses that need a stronger digital presence.",
    features: [
      "Custom Website",
      "Advanced UI/UX",
      "SEO Optimization",
      "CMS Integration",
      "Analytics",
      "3 Months Support",
    ],
  },

  {
    name: "Enterprise",
    price: "Custom",
    description:
      "For organizations requiring custom digital solutions.",
    features: [
      "Custom Software",
      "Web Applications",
      "Cloud Solutions",
      "API Integration",
      "Dedicated Support",
      "Custom Development",
    ],
  },
];

function Pricing() {
  return (
    <>

      <section className="bg-slate-950 py-24 text-white">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">

          <span className="text-sm font-bold uppercase tracking-widest text-indigo-400">
            Pricing
          </span>

          <h1 className="mt-4 text-4xl font-black sm:text-6xl">
            Simple & Flexible Pricing
          </h1>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
            Choose a package that fits your business requirements.
          </p>

        </div>

      </section>

      <section className="bg-slate-50 py-20">

        <div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:px-8 lg:grid-cols-3">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border bg-white p-8 ${
                plan.popular
                  ? "border-indigo-500 shadow-2xl"
                  : "border-slate-200"
              }`}
            >

              {plan.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
                  POPULAR
                </span>
              )}

              <h2 className="text-2xl font-black text-slate-900">
                {plan.name}
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                {plan.description}
              </p>

              <div className="mt-8 text-4xl font-black text-indigo-600">
                {plan.price}
              </div>

              <div className="my-8 h-px bg-slate-200" />

              <div className="space-y-4">

                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <Check
                      size={18}
                      className="text-indigo-600"
                    />

                    <span className="text-slate-600">
                      {feature}
                    </span>
                  </div>
                ))}

              </div>

              <Link
                to="/get-quote"
                className="mt-9 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-4 font-bold text-white hover:bg-indigo-700"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

            </div>
          ))}

        </div>

      </section>

    </>
  );
}

export default Pricing;