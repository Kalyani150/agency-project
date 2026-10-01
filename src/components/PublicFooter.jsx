
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";

function PublicFooter() {
  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Case Studies", path: "/projects" },
    { name: "Our Team", path: "/team" },
    { name: "Latest Blog", path: "/blog" },
    { name: "Pricing Plans", path: "/pricing" },
    { name: "FAQs", path: "/faq" },
    { name: "Contact Us", path: "/contact" },
  ];

  const serviceLinks = [
    { name: "Web Development", path: "/services/1" },
    { name: "UI/UX Design", path: "/services/2" },
    { name: "Mobile App Development", path: "/services/3" },
    { name: "Digital Marketing", path: "/services/4" },
    { name: "SEO Optimization", path: "/services/5" },
    { name: "Branding & Identity", path: "/services/6" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
    },
  ];

  return (
    <footer className="overflow-hidden bg-slate-950 text-white">

      {/* ==================================================
          MAIN FOOTER
      ================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        <div
          className="
            grid
            grid-cols-1
            gap-12
            sm:gap-14
            lg:grid-cols-4
            lg:gap-10
          "
        >

          {/* ==================================================
              COMPANY
          ================================================== */}

          <div className="min-w-0">

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-600
                  text-lg
                  font-black
                  sm:h-11
                  sm:w-11
                "
              >
                N
              </div>

              <div>
                <p className="text-lg font-black sm:text-xl">
                  Nova
                </p>

                <p className="text-[10px] uppercase tracking-[0.18em] text-indigo-400 sm:text-[11px] sm:tracking-widest">
                  Digital Agency
                </p>
              </div>
            </Link>

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-7
                text-slate-400
                sm:mt-6
                sm:text-base
              "
            >
              We create modern digital experiences that help businesses grow,
              connect with customers and achieve their goals.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/10
                    text-slate-300
                    transition
                    duration-300
                    hover:bg-indigo-600
                    hover:text-white
                  "
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* ==================================================
              QUICK LINKS
          ================================================== */}

          <div className="min-w-0">

            <h3 className="text-lg font-bold">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">
              {quickLinks.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="
                    block
                    text-sm
                    leading-6
                    text-slate-400
                    transition
                    duration-300
                    hover:translate-x-1
                    hover:text-white
                    sm:text-base
                  "
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* ==================================================
              SERVICES
          ================================================== */}

          <div className="min-w-0">

            <h3 className="text-lg font-bold">
              Services
            </h3>

            <div className="mt-5 space-y-3">
              {serviceLinks.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="
                    block
                    text-sm
                    leading-6
                    text-slate-400
                    transition
                    duration-300
                    hover:translate-x-1
                    hover:text-indigo-400
                    sm:text-base
                  "
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* ==================================================
              CONTACT
          ================================================== */}

          <div className="min-w-0">

            <h3 className="text-lg font-bold">
              Contact Us
            </h3>

            <div className="mt-5 space-y-5">

              {/* ADDRESS */}

              <div className="flex items-start gap-3">

                <MapPin
                  size={19}
                  className="mt-0.5 shrink-0 text-indigo-400"
                />

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Hyderabad%2C%20Telangana%2C%20India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    break-words
                    text-sm
                    leading-6
                    text-slate-400
                    transition
                    hover:text-white
                    sm:text-base
                  "
                >
                  Hyderabad, Telangana, India
                </a>
              </div>

              {/* EMAIL */}

              <div className="flex items-start gap-3">

                <Mail
                  size={19}
                  className="mt-0.5 shrink-0 text-indigo-400"
                />

                <a
                  href="mailto:hello@novaagency.com"
                  className="
                    break-all
                    text-sm
                    leading-6
                    text-slate-400
                    transition
                    hover:text-indigo-400
                    sm:text-base
                  "
                >
                  hello@novaagency.com
                </a>
              </div>

              {/* PHONE */}

              <div className="flex items-start gap-3">

                <Phone
                  size={19}
                  className="mt-0.5 shrink-0 text-indigo-400"
                />

                <a
                  href="tel:+919876543210"
                  className="
                    text-sm
                    leading-6
                    text-slate-400
                    transition
                    hover:text-indigo-400
                    sm:text-base
                  "
                >
                  +91 98765 43210
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ==================================================
          BOTTOM BAR
      ================================================== */}

      <div className="border-t border-white/10">

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            gap-4
            px-5
            py-5
            text-xs
            text-slate-500
            sm:px-6
            sm:py-6
            sm:text-sm
            md:flex-row
            md:justify-between
            lg:px-8
          "
        >

          <p className="text-center md:text-left">
            © 2026 Nova Digital Agency. All rights reserved.
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-2
            "
          >
            <Link
              to="/about"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/about"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/login"
              className="
                font-semibold
                text-slate-400
                transition
                hover:text-indigo-400
              "
            >
              Admin Portal
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}

export default PublicFooter;

