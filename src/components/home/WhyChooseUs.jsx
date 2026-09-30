import {
  Code2,
  Rocket,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const items = [
  {
    icon: Code2,
    title: "Modern Technology",
    text: "We use modern technologies and development practices to create scalable digital products.",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    text: "Our structured process helps us deliver quality solutions without unnecessary delays.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Solutions",
    text: "Security, performance and reliability are considered throughout the development process.",
  },
  {
    icon: Headphones,
    title: "Long-Term Support",
    text: "We continue supporting your product even after the initial project is completed.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-white py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-5xl">
            We focus on results, not just technology
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Our approach combines business understanding, design,
            development and continuous support.
          </p>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl"
              >

                <div className="gratech-icon-flip flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={27} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.text}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;