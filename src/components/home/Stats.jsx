import { useEffect, useRef, useState } from "react";

const stats = [
  {
    number: 250,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    number: 120,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    number: 15,
    suffix: "+",
    label: "Years Experience",
  },
  {
    number: 40,
    suffix: "+",
    label: "Team Members",
  },
];

function Counter({ number, suffix }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let current = 0;

    const duration = 1400;
    const steps = 60;
    const increment = number / steps;

    const timer = setInterval(() => {
      current += increment;

      if (current >= number) {
        current = number;
        clearInterval(timer);
      }

      setCount(Math.floor(current));
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, number]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function Stats() {
  return (
    <section className="overflow-hidden bg-indigo-600">

      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">

        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`group relative px-5 py-12 text-center text-white transition duration-500 hover:bg-indigo-700 ${
              index !== 3
                ? "border-r border-indigo-400/30"
                : ""
            }`}
          >

            {/* Animated background circle */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

            <p className="relative text-4xl font-black transition duration-500 group-hover:scale-110">
              <Counter
                number={stat.number}
                suffix={stat.suffix}
              />
            </p>

            <p className="relative mt-2 text-sm text-indigo-100">
              {stat.label}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Stats;