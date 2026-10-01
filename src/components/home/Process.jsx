const process = [
  {
    number: "01",
    title: "Discovery",
    text: "We understand your business, goals, users and project requirements.",
  },
  {
    number: "02",
    title: "Strategy",
    text: "We define the solution architecture, features and development roadmap.",
  },
  {
    number: "03",
    title: "Design",
    text: "Our designers create a clean and user-friendly digital experience.",
  },
  {
    number: "04",
    title: "Development",
    text: "Our developers build the product using modern technologies.",
  },
  {
    number: "05",
    title: "Testing",
    text: "We test functionality, responsiveness, security and performance.",
  },
  {
    number: "06",
    title: "Launch",
    text: "We deploy your project and provide ongoing support and improvements.",
  },
];

function Process() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center">

          <span className="text-m font-bold uppercase tracking-widest text-indigo-600">
            Our Process
          </span>

          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-5xl">
            How We Work
          </h2>

          <p className="mx-auto text-lg mt-5 max-w-2xl leading-8 text-slate-600">
            A clear process helps us deliver better products and better experiences.
          </p>

        </div>

        <div className="mt-14 grid gap-5 min-[400px]:grid-cols-2 lg:grid-cols-3">

          {process.map((item) => (
            <div
              key={item.number}
              className="rounded-2xl border border-slate-200 bg-white p-7"
            >

              <span className="text-4xl font-black text-indigo-300">
                {item.number}
              </span>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-lg text-slate-600">
                {item.text}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Process;