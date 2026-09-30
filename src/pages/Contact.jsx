import { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

import PageHero from "../components/PageHero";
import { nextId } from "../utils";

function Contact({
  enquiries = [],
  setEnquiries,
  addEnquiry,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Development",
    budget: "",
    message: "",
  });

  const [submitted, setSubmitted] =
    useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const enquiry = {
      id: nextId(enquiries),
      ...form,
      date: new Date()
        .toISOString()
        .split("T")[0],
      status: "New",
    };

    if (typeof addEnquiry === "function") {
      addEnquiry(enquiry);
    } else if (typeof setEnquiries === "function") {
      setEnquiries([
        enquiry,
        ...enquiries,
      ]);
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      service: "Web Development",
      budget: "",
      message: "",
    });

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>

      <PageHero
        badge="Contact Us"
        title="Let's Talk About Your Project"
        description="Tell us about your project and our team will get back to you."
      />

      <section className="bg-white py-20">

        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-5">

          {/* INFO */}

          <div className="lg:col-span-2">

            <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Get In Touch
            </span>

            <h2 className="mt-4 text-3xl font-black text-slate-900">
              We would love to hear from you.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Have an idea, project or question? Send us a message and we'll be happy to discuss it with you.
            </p>

            <div className="mt-9 space-y-6">

              <div className="flex gap-4">

                <div className="gratech-icon-flip flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Mail size={21} />
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Email
                  </p>

                  <p className="mt-1 text-slate-600">
                    hello@novaagency.com
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <div className="gratech-icon-flip flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Phone size={21} />
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Phone
                  </p>

                  <p className="mt-1 text-slate-600">
                    +91 98765 43210
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <div className="gratech-icon-flip flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Location
                  </p>

                  <p className="mt-1 text-slate-600">
                    Hyderabad, Telangana, India
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* FORM */}

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:col-span-3">

            {submitted && (
              <div className="mb-6 rounded-xl bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
                Thank you! Your enquiry has been submitted successfully.
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div className="grid gap-5 sm:grid-cols-2">

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-4 outline-none focus:border-indigo-500"
                />

                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-4 outline-none focus:border-indigo-500"
                />

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-4 outline-none focus:border-indigo-500"
                />

                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-4 outline-none focus:border-indigo-500"
                >
                  <option>Web Development</option>
                  <option>UI/UX Design</option>
                  <option>Mobile App Development</option>
                  <option>Digital Marketing</option>
                  <option>SEO Optimization</option>
                  <option>Branding</option>
                </select>

              </div>

              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-4 outline-none focus:border-indigo-500"
              >
                <option value="">
                  Select Budget
                </option>
                <option>
                  $1,000 - $3,000
                </option>
                <option>
                  $3,000 - $5,000
                </option>
                <option>
                  $5,000 - $10,000
                </option>
                <option>
                  $10,000+
                </option>
              </select>

              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                placeholder="Tell us about your project..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-5 py-4 outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-7 py-4 font-bold text-white hover:bg-indigo-700"
              >
                Send Message
                <Send size={17} />
              </button>

            </form>

          </div>

        </div>

      </section>

    </>
  );
}

export default Contact;