import { useState } from "react";

import {
  Plus,
  Minus,
} from "lucide-react";

import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What services do you provide?",
    answer:
      "We provide web development, mobile development, UI/UX design, digital marketing, SEO, branding and custom software solutions.",
  },
  {
    question: "How do you start a project?",
    answer:
      "We first understand your business requirements and goals, then prepare the project strategy, design and development plan.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. We provide maintenance, technical support, updates and additional development after your project goes live.",
  },
  {
    question: "Can you work with an existing website?",
    answer:
      "Yes. We can redesign, improve, optimize and extend existing websites and applications.",
  },
];

function FAQPreview() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-slate-50 py-20 sm:py-24">

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        <div className="text-center">

          <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            FAQ
          </span>

          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-12">

          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
  key={faq.question}
  className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-indigo-200 hover:shadow-lg"
>

                <button
                  onClick={() =>
                    setOpen(
                      isOpen ? -1 : index
                    )
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >

                  <span className="font-bold text-slate-900">
                    {faq.question}
                  </span>

                  {isOpen ? (
                    <Minus
                      size={20}
                      className="text-indigo-600"
                    />
                  ) : (
                    <Plus
                      size={20}
                      className="text-indigo-600"
                    />
                  )}

                </button>

                {isOpen && (
  <div className="gratech-faq-answer border-t border-slate-100 px-6 py-5 leading-7 text-slate-600">
    {faq.answer}
  </div>
)}

              </div>
            );
          })}

        </div>

        <div className="mt-8 text-center">

          <Link
            to="/faq"
            className="font-bold text-indigo-600 hover:text-indigo-700"
          >
            View All FAQs →
          </Link>

        </div>

      </div>

    </section>
  );
}

export default FAQPreview;