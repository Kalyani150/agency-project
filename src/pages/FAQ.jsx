import { useState } from "react";

import {
  Plus,
  Minus,
} from "lucide-react";

const faqs = [
  {
    question:
      "What services does your company provide?",
    answer:
      "We provide web development, mobile application development, UI/UX design, digital marketing, SEO, branding and custom software development.",
  },
  {
    question:
      "How do you start a new project?",
    answer:
      "We begin by understanding your business, users, goals and technical requirements. We then prepare a project strategy and development plan.",
  },
  {
    question:
      "How long does a website project take?",
    answer:
      "The timeline depends on project scope and complexity. A standard business website can generally be completed within a few weeks.",
  },
  {
    question:
      "Do you provide maintenance?",
    answer:
      "Yes. We provide ongoing maintenance, security updates, technical support and feature improvements.",
  },
  {
    question:
      "Can you redesign an existing website?",
    answer:
      "Yes. We can redesign existing websites while preserving useful functionality and improving design, usability and performance.",
  },
  {
    question:
      "Do you build custom software?",
    answer:
      "Yes. We develop custom software and web applications based on your business processes and requirements.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <>

      <section className="bg-slate-950 py-24 text-white">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <span className="text-sm font-bold uppercase tracking-widest text-indigo-400">
            FAQ
          </span>

          <h1 className="mt-4 text-4xl font-black sm:text-6xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-slate-400">
            Everything you need to know about our services and working process.
          </p>

        </div>

      </section>

      <section className="bg-white py-20">

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {faqs.map((faq, index) => {

            const isOpen =
              open === index;

            return (
              <div
                key={faq.question}
                className="mb-4 overflow-hidden rounded-2xl border border-slate-200"
              >

                <button
                  onClick={() =>
                    setOpen(
                      isOpen ? -1 : index
                    )
                  }
                  className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left"
                >

                  <span className="font-bold text-slate-900">
                    {faq.question}
                  </span>

                  {isOpen ? (
                    <Minus
                      size={20}
                      className="shrink-0 text-indigo-600"
                    />
                  ) : (
                    <Plus
                      size={20}
                      className="shrink-0 text-indigo-600"
                    />
                  )}

                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-6 py-6 leading-8 text-slate-600">
                    {faq.answer}
                  </div>
                )}

              </div>
            );

          })}

        </div>

      </section>

    </>
  );
}

export default FAQ;