import { useEffect, useState } from "react";

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
  // ======================================================
  // FORM STATE
  // ======================================================

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Development",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ======================================================
  // INPUT CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // Name: allow only letters, spaces, apostrophes, dots and hyphens
    if (name === "name") {
      newValue = value.replace(/[^A-Za-z\s.'-]/g, "");
    }

    // Email: remove spaces and invalid characters
    if (name === "email") {
      newValue = value
        .replace(/\s/g, "")
        .replace(/[^A-Za-z0-9._%+\-@]/g, "");
    }

    // Phone: numbers only and maximum 10 digits
    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user starts correcting field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ======================================================
  // VALIDATION
  // ======================================================

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) {
          return "Name is required.";
        }

        if (!/^[A-Za-z\s.'-]+$/.test(value)) {
          return "Please enter a valid name.";
        }

        if (value.trim().length < 2) {
          return "Name must be at least 2 characters.";
        }

        return "";

      case "email":
        if (!value.trim()) {
          return "Email is required.";
        }

        if (
          !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
            value
          )
        ) {
          return "Please enter a valid email.";
        }

        return "";

      case "phone":
        if (!value.trim()) {
          return "Phone number is required.";
        }

        if (!/^\d{10}$/.test(value)) {
          return "Phone number must be 10 digits.";
        }

        return "";

      case "service":
        if (!value.trim()) {
          return "Please select a service.";
        }

        return "";

      case "budget":
        if (!value.trim()) {
          return "Please select your budget.";
        }

        return "";

      case "message":
        if (!value.trim()) {
          return "Project details are required.";
        }

        if (value.trim().length < 10) {
          return "Please enter at least 10 characters.";
        }

        return "";

      default:
        return "";
    }
  };

  // ======================================================
  // BLUR VALIDATION
  // ======================================================

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.keys(form).forEach((field) => {
      const error = validateField(field, form[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const enquiry = {
      id: nextId(enquiries),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: form.service,
      budget: form.budget,
      message: form.message.trim(),
      date: new Date().toISOString(),
      status: "New",
    };

    if (typeof addEnquiry === "function") {
      addEnquiry(enquiry);
    } else if (typeof setEnquiries === "function") {
      setEnquiries((prev) => [...prev, enquiry]);
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      service: "Web Development",
      budget: "",
      message: "",
    });

    setErrors({});
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ======================================================
  // SCROLL TOP
  // ======================================================

  useEffect(() => {
    if (submitted) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [submitted]);

  // ======================================================
  // INPUT CLASS
  // ======================================================

  const inputClass = (field) => `
    w-full
    min-w-0
    rounded-xl
    border
    ${
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
    }
    bg-white
    px-3
    py-2.5
    text-sm
    text-slate-800
    outline-none
    transition
    focus:ring-4
    min-[350px]:px-4
    min-[350px]:py-3
    sm:text-base
  `;

  return (
    <>
      {/* ==================================================
          PAGE HERO
      ================================================== */}

      <PageHero
        badge="Contact Us"
        title="Let's Build Something Great Together"
        description="Have a project in mind? Tell us about it and our team will get back to you."
      />

      {/* ==================================================
          SUCCESS MESSAGE
      ================================================== */}

      {submitted && (
        <div className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-center text-sm font-medium text-green-700 sm:text-base">
            Message sent successfully! We'll get back to you soon.
          </div>
        </div>
      )}

      {/* ==================================================
          CONTACT SECTION
      ================================================== */}

      <section className="px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">

          {/* ==================================================
              CONTACT INFORMATION
          ================================================== */}

          <div className="min-w-0">
            <div className="mb-7">
              <span className="mb-3 inline-block rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 min-[350px]:px-4 min-[350px]:py-2 sm:text-sm">
                Get In Touch
              </span>

              <h2 className="text-2xl font-bold leading-tight text-slate-900 min-[350px]:text-3xl sm:text-4xl">
                We'd Love To Hear From You
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-600 min-[350px]:text-base sm:leading-7">
                Whether you have a question, need a quote, or want to discuss
                your next project, feel free to reach out to us.
              </p>
            </div>

            {/* Contact Details */}

            <div className="space-y-4 sm:space-y-5">

              {/* Email */}

              <a
                href="mailto:hello@novaagency.com"
                className="flex min-w-0 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm min-[350px]:gap-4 sm:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 min-[350px]:h-11 min-[350px]:w-11">
                  <Mail size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-slate-800 min-[350px]:text-base">
                    hello@novaagency.com
                  </p>
                </div>
              </a>

              {/* Phone */}

              <a
                href="tel:+919876543210"
                className="flex min-w-0 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm min-[350px]:gap-4 sm:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 min-[350px]:h-11 min-[350px]:w-11">
                  <Phone size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800 min-[350px]:text-base">
                    +91 98765 43210
                  </p>
                </div>
              </a>

              {/* Location */}

              <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 min-[350px]:gap-4 sm:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 min-[350px]:h-11 min-[350px]:w-11">
                  <MapPin size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-semibold leading-5 text-slate-800 min-[350px]:text-base">
                    Hyderabad, Telangana, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              CONTACT FORM
          ================================================== */}

          <div className="min-w-0">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 min-[350px]:p-4 sm:p-6 lg:p-8">

              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 min-[350px]:text-2xl sm:text-3xl">
                  Send Us a Message
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fill out the form below and we'll get in touch with you.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4 sm:space-y-5"
              >

                {/* ==================================================
                    NAME + EMAIL
                    BELOW 350px = 1 COLUMN
                    350px+ = 2 COLUMNS
                ================================================== */}

                <div className="grid gap-3 min-[350px]:grid-cols-2 sm:gap-5">

                  {/* Name */}

                  <div className="min-w-0">
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-semibold text-slate-700 min-[350px]:text-sm"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your name"
                      className={inputClass("name")}
                    />

                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}

                  <div className="min-w-0">
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-semibold text-slate-700 min-[350px]:text-sm"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@example.com"
                      className={inputClass("email")}
                    />

                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* ==================================================
                    PHONE + SERVICE
                    BELOW 350px = 1 COLUMN
                    350px+ = 2 COLUMNS
                ================================================== */}

                <div className="grid gap-3 min-[350px]:grid-cols-2 sm:gap-5">

                  {/* Phone */}

                  <div className="min-w-0">
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-semibold text-slate-700 min-[350px]:text-sm"
                    >
                      Phone
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="10 digit number"
                      className={inputClass("phone")}
                    />

                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Service */}

                  <div className="min-w-0">
                    <label
                      htmlFor="service"
                      className="mb-1.5 block text-xs font-semibold text-slate-700 min-[350px]:text-sm"
                    >
                      Service
                    </label>

                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass("service")}
                    >
                      <option value="">Select service</option>
                      <option value="Web Development">
                        Web Development
                      </option>
                      <option value="UI/UX Design">
                        UI/UX Design
                      </option>
                      <option value="Mobile App Development">
                        Mobile App Development
                      </option>
                      <option value="Digital Marketing">
                        Digital Marketing
                      </option>
                      <option value="SEO">
                        SEO
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>

                    {errors.service && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                {/* ==================================================
                    BUDGET
                ================================================== */}

                <div className="min-w-0">
                  <label
                    htmlFor="budget"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 min-[350px]:text-sm"
                  >
                    Budget
                  </label>

                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("budget")}
                  >
                    <option value="">Select your budget</option>
                    <option value="Below ₹50,000">
                      Below ₹50,000
                    </option>
                    <option value="₹50,000 - ₹1,00,000">
                      ₹50,000 - ₹1,00,000
                    </option>
                    <option value="₹1,00,000 - ₹2,00,000">
                      ₹1,00,000 - ₹2,00,000
                    </option>
                    <option value="₹2,00,000 - ₹5,00,000">
                      ₹2,00,000 - ₹5,00,000
                    </option>
                    <option value="Above ₹5,00,000">
                      Above ₹5,00,000
                    </option>
                  </select>

                  {errors.budget && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.budget}
                    </p>
                  )}
                </div>

                {/* ==================================================
                    PROJECT DETAILS
                ================================================== */}

                <div className="min-w-0">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 min-[350px]:text-sm"
                  >
                    Project Details
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us about your project..."
                    className={`${inputClass(
                      "message"
                    )} resize-none`}
                  />

                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* ==================================================
                    SUBMIT BUTTON
                ================================================== */}

                <button
  type="submit"
  className="flex w-auto cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.99] min-[350px]:px-6 min-[350px]:py-3.5 sm:text-base"
>
  <Send size={18} />
  Send Message
</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;