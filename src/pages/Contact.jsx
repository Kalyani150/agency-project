
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
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    service: "Web Development",
    budget: "",
    message: "",
  };

  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  /* =========================================================
     VALIDATE FORM
  ========================================================= */

  const validateForm = () => {
    const newErrors = {};

    /* ---------------------------------------------------------
       NAME
    --------------------------------------------------------- */

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (
      !/^[A-Za-z\s.'-]+$/.test(form.name.trim())
    ) {
      newErrors.name =
        "Name can contain letters, spaces, apostrophes, dots and hyphens only.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Please enter a valid name.";
    }

    /* ---------------------------------------------------------
       EMAIL
    --------------------------------------------------------- */

    if (!form.email.trim()) {
      newErrors.email =
        "Email address is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        form.email.trim()
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    /* ---------------------------------------------------------
       PHONE
    --------------------------------------------------------- */

    if (!form.phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone =
        "Phone number must contain exactly 10 digits.";
    }

    /* ---------------------------------------------------------
       SERVICE
    --------------------------------------------------------- */

    if (!form.service) {
      newErrors.service =
        "Please select a service.";
    }

    /* ---------------------------------------------------------
       BUDGET
    --------------------------------------------------------- */

    if (!form.budget) {
      newErrors.budget =
        "Please select your budget.";
    }

    /* ---------------------------------------------------------
       MESSAGE
    --------------------------------------------------------- */

    if (!form.message.trim()) {
      newErrors.message =
        "Please tell us about your project.";
    } else if (
      form.message.trim().length < 10
    ) {
      newErrors.message =
        "Message should contain at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     HANDLE INPUT CHANGE
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    let newValue = value;

    /* ---------------------------------------------------------
       NAME

       Allowed:
       A-Z
       a-z
       spaces
       apostrophe
       dot
       hyphen
    --------------------------------------------------------- */

    if (name === "name") {
      newValue = value.replace(
        /[^A-Za-z\s.'-]/g,
        ""
      );
    }

    /* ---------------------------------------------------------
       EMAIL

       Allowed:
       A-Z
       a-z
       0-9
       @
       .
       _
       -
       +

       Spaces and other special characters are removed.
    --------------------------------------------------------- */

    if (name === "email") {
      newValue = value.replace(
        /[^A-Za-z0-9@._+-]/g,
        ""
      );

      /*
        Allow only ONE @ symbol.
      */

      const firstAtIndex =
        newValue.indexOf("@");

      if (firstAtIndex !== -1) {
        const beforeAt =
          newValue.slice(0, firstAtIndex);

        const afterAt =
          newValue
            .slice(firstAtIndex + 1)
            .replace(/@/g, "");

        newValue =
          `${beforeAt}@${afterAt}`;
      }
    }

    /* ---------------------------------------------------------
       PHONE

       Only numbers are allowed.
       Maximum 10 digits.
    --------------------------------------------------------- */

    if (name === "phone") {
      newValue = value
        .replace(/\D/g, "")
        .slice(0, 10);
    }

    /* ---------------------------------------------------------
       UPDATE FORM
    --------------------------------------------------------- */

    setForm((previousForm) => ({
      ...previousForm,
      [name]: newValue,
    }));

    /* ---------------------------------------------------------
       CLEAR FIELD ERROR
    --------------------------------------------------------- */

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: "",
      }));
    }

    /* ---------------------------------------------------------
       HIDE SUCCESS MESSAGE WHEN EDITING
    --------------------------------------------------------- */

    if (submitted) {
      setSubmitted(false);
    }
  };

  /* =========================================================
     HANDLE BLUR
  ========================================================= */

  const handleBlur = (event) => {
    const { name } = event.target;

    const fieldErrors = {};

    /* ---------------------------------------------------------
       NAME
    --------------------------------------------------------- */

    if (name === "name") {
      if (!form.name.trim()) {
        fieldErrors.name =
          "Name is required.";
      } else if (
        !/^[A-Za-z\s.'-]+$/.test(
          form.name.trim()
        )
      ) {
        fieldErrors.name =
          "Please enter a valid name.";
      } else if (
        form.name.trim().length < 2
      ) {
        fieldErrors.name =
          "Please enter a valid name.";
      }
    }

    /* ---------------------------------------------------------
       EMAIL
    --------------------------------------------------------- */

    if (name === "email") {
      if (!form.email.trim()) {
        fieldErrors.email =
          "Email address is required.";
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
          form.email.trim()
        )
      ) {
        fieldErrors.email =
          "Please enter a valid email address.";
      }
    }

    /* ---------------------------------------------------------
       PHONE
    --------------------------------------------------------- */

    if (name === "phone") {
      if (!form.phone.trim()) {
        fieldErrors.phone =
          "Phone number is required.";
      } else if (
        !/^\d{10}$/.test(form.phone)
      ) {
        fieldErrors.phone =
          "Phone number must contain exactly 10 digits.";
      }
    }

    /* ---------------------------------------------------------
       SERVICE
    --------------------------------------------------------- */

    if (
      name === "service" &&
      !form.service
    ) {
      fieldErrors.service =
        "Please select a service.";
    }

    /* ---------------------------------------------------------
       BUDGET
    --------------------------------------------------------- */

    if (
      name === "budget" &&
      !form.budget
    ) {
      fieldErrors.budget =
        "Please select your budget.";
    }

    /* ---------------------------------------------------------
       MESSAGE
    --------------------------------------------------------- */

    if (name === "message") {
      if (!form.message.trim()) {
        fieldErrors.message =
          "Please tell us about your project.";
      } else if (
        form.message.trim().length < 10
      ) {
        fieldErrors.message =
          "Message should contain at least 10 characters.";
      }
    }

    /* ---------------------------------------------------------
       UPDATE ERRORS
    --------------------------------------------------------- */

    setErrors((previousErrors) => ({
      ...previousErrors,
      ...fieldErrors,
    }));
  };

  /* =========================================================
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    /* ---------------------------------------------------------
       CREATE ENQUIRY
    --------------------------------------------------------- */

    const enquiry = {
      id: nextId(enquiries),

      name: form.name.trim(),

      email: form.email.trim(),

      phone: form.phone.trim(),

      service: form.service,

      budget: form.budget,

      message: form.message.trim(),

      date: new Date()
        .toISOString()
        .split("T")[0],

      status: "New",
    };

    /* ---------------------------------------------------------
       ADD ENQUIRY TO DASHBOARD
    --------------------------------------------------------- */

    if (typeof addEnquiry === "function") {
      addEnquiry(enquiry);
    } else if (
      typeof setEnquiries === "function"
    ) {
      setEnquiries((previousEnquiries) => [
        enquiry,
        ...previousEnquiries,
      ]);
    }

    /* ---------------------------------------------------------
       RESET FORM
    --------------------------------------------------------- */

    setForm(initialForm);

    setErrors({});

    setSubmitted(true);

    /* ---------------------------------------------------------
       HIDE SUCCESS MESSAGE
    --------------------------------------------------------- */

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
      {/* =====================================================
          PAGE HERO
      ====================================================== */}

      <PageHero
        badge="Contact Us"
        title="Let's Talk About Your Project"
        description="Tell us about your project and our team will get back to you."
      />

      {/* =====================================================
          CONTACT SECTION
      ====================================================== */}

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-12 lg:px-8">

          {/* =================================================
              CONTACT INFORMATION
          ================================================== */}

          <div className="lg:col-span-2">

            <span className="text-m font-bold uppercase tracking-widest text-indigo-600">
              Get In Touch
            </span>

            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-5xl">
              We would love to hear from you.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Have an idea, project or question?
              Send us a message and we'll be happy
              to discuss it with you.
            </p>

            <div className="mt-9 space-y-6">

              {/* EMAIL */}

              <div className="flex gap-4">

                <div className="gratech-icon-flip flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Mail size={21} />
                </div>

                <div className="min-w-0">

                  <p className="font-bold text-slate-900">
                    Email
                  </p>

                  <p className="mt-1 break-all text-slate-600">
                    hello@novaagency.com
                  </p>

                </div>

              </div>

              {/* PHONE */}

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

              {/* LOCATION */}

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

          {/* =================================================
              FORM
          ================================================== */}

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-8 lg:col-span-3">

            {/* SUCCESS MESSAGE */}

            {submitted && (
              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
                Thank you! Your enquiry has been
                submitted successfully and has been
                added to the dashboard.
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >

              {/* =============================================
                  NAME + EMAIL
              ============================================== */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* NAME */}

                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-m font-semibold text-slate-700"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your Name"
                    autoComplete="name"
                    inputMode="text"
                    className={`w-full rounded-xl border bg-white px-5 py-4 outline-none transition ${
                      errors.name
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-200 focus:border-indigo-500"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs font-medium text-red-600">
                      {errors.name}
                    </p>
                  )}

                </div>

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-m font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email Address"
                    autoComplete="email"
                    inputMode="email"
                    spellCheck={false}
                    autoCapitalize="none"
                    autoCorrect="off"
                    className={`w-full rounded-xl border bg-white px-5 py-4 outline-none transition ${
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-200 focus:border-indigo-500"
                    }`}
                  />

                 

                  {errors.email && (
                    <p className="mt-1 text-xs font-medium text-red-600">
                      {errors.email}
                    </p>
                  )}

                </div>

              </div>

              {/* =============================================
                  PHONE + SERVICE
              ============================================== */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* PHONE */}

                <div>

                  <label
                    htmlFor="phone"
                    className="mb-2 block text-m font-semibold text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    required
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="10 digit phone number"
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    className={`w-full rounded-xl border bg-white px-5 py-4 outline-none transition ${
                      errors.phone
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-200 focus:border-indigo-500"
                    }`}
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Enter 10 digits
                  </p>

                  {errors.phone && (
                    <p className="mt-1 text-xs font-medium text-red-600">
                      {errors.phone}
                    </p>
                  )}

                </div>

                {/* SERVICE */}

                <div>

                  <label
                    htmlFor="service"
                    className="mb-2 block text-m font-semibold text-slate-700"
                  >
                    Service
                  </label>

                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-xl border bg-white px-5 py-4 outline-none transition ${
                      errors.service
                        ? "border-red-400"
                        : "border-slate-200 focus:border-indigo-500"
                    }`}
                  >
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

                    <option value="SEO Optimization">
                      SEO Optimization
                    </option>

                    <option value="Branding">
                      Branding
                    </option>
                  </select>

                  {errors.service && (
                    <p className="mt-2 text-xs font-medium text-red-600">
                      {errors.service}
                    </p>
                  )}

                </div>

              </div>

              {/* =============================================
                  BUDGET
              ============================================== */}

              <div>

                <label
                  htmlFor="budget"
                  className="mb-2 block text-m font-semibold text-slate-700"
                >
                  Budget
                </label>

                <select
                  id="budget"
                  required
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border bg-white px-5 py-4 outline-none transition ${
                    errors.budget
                      ? "border-red-400"
                      : "border-slate-200 focus:border-indigo-500"
                  }`}
                >
                  <option value="">
                    Select Budget
                  </option>

                  <option value="$1,000 - $3,000">
                    $1,000 - $3,000
                  </option>

                  <option value="$3,000 - $5,000">
                    $3,000 - $5,000
                  </option>

                  <option value="$5,000 - $10,000">
                    $5,000 - $10,000
                  </option>

                  <option value="$10,000+">
                    $10,000+
                  </option>
                </select>

                {errors.budget && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.budget}
                  </p>
                )}

              </div>

              {/* =============================================
                  MESSAGE
              ============================================== */}

              <div>

                <label
                  htmlFor="message"
                  className="mb-2 block text-m font-semibold text-slate-700"
                >
                  Project Details
                </label>

                <textarea
                  id="message"
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={6}
                  placeholder="Tell us about your project..."
                  className={`w-full resize-none rounded-xl border bg-white px-5 py-4 outline-none transition ${
                    errors.message
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-200 focus:border-indigo-500"
                  }`}
                />

                {errors.message && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.message}
                  </p>
                )}

              </div>

              {/* =============================================
                  SEND BUTTON
              ============================================== */}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 font-bold text-white transition hover:bg-indigo-700 sm:w-auto"
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
