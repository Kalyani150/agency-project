
import { useState } from "react";

import {
  Plus,
  Minus,
} from "lucide-react";

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
  {
    question: "How long does it take to complete a project?",
    answer:
      "Project timelines depend on the scope, features and complexity of the work. After understanding your requirements, we provide a clear estimated timeline before development begins.",
  },
];

function FAQPreview() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-slate-50 py-14 sm:py-18">
      

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <div className="text-center">

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 sm:text-sm">
            FAQ
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Find answers to some of the most common questions about our
            services, process and support.
          </p>

        </div>

        {/* ==================================================
            FAQ LIST
        ================================================== */}

        <div className="mt-12">

          {faqs.map((faq, index) => {

            const isOpen = open === index;

            return (
              <div
                key={faq.question}
                className="
                  mb-4
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  transition-all
                  duration-300
                  hover:border-indigo-200
                  hover:shadow-lg
                "
              >

                {/* ==================================================
                    QUESTION
                ================================================== */}

                <button
                  type="button"
                  onClick={() =>
                    setOpen(isOpen ? -1 : index)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-6
                    px-6
                    py-5
                    text-left
                  "
                >

                  <span className="text-lg font-bold text-slate-900 sm:text-xl">
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

                {/* ==================================================
                    ANSWER
                ================================================== */}

                {isOpen && (
                  <div
                    className="
                      gratech-faq-answer
                      border-t
                      border-slate-100
                      px-6
                      py-5
                      text-base
                      leading-7
                      text-slate-600
                      sm:text-lg
                      sm:leading-8
                    "
                  >
                    {faq.answer}
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default FAQPreview;
