import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
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
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* COMPANY */}

          <div>

            <Link
              to="/"
              className="flex items-center gap-3"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 font-black">
                N
              </div>

              <div>
                <p className="text-xl font-black">
                  Nova
                </p>

                <p className="text-[10px] uppercase tracking-widest text-indigo-400">
                  Digital Agency
                </p>
              </div>

            </Link>

            <p className="mt-6 leading-7 text-slate-400">
              We create modern digital experiences that help businesses grow, connect with customers and achieve their goals.
            </p>

            <div className="mt-6 flex gap-3">

              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition duration-300 hover:bg-indigo-600 hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}

            </div>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h3 className="text-lg font-bold">
              Quick Links
            </h3>

            <div className="mt-6 space-y-3">

              {quickLinks.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="block text-sm text-slate-400 transition hover:translate-x-1 hover:text-white"
                >
                  {name}
                </Link>
              ))}

            </div>

          </div>

          {/* SERVICES */}

          <div>

            <h3 className="text-lg font-bold">
              Services
            </h3>

            <div className="mt-6 space-y-3">

              {serviceLinks.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="block text-sm text-slate-400 transition hover:translate-x-1 hover:text-indigo-400"
                >
                  {name}
                </Link>
              ))}

              
            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h3 className="text-lg font-bold">
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">

              <div className="flex gap-3">

                <MapPin
                  size={19}
                  className="shrink-0 text-indigo-400"
                />

               <a
  href="https://www.google.com/maps/search/?api=1&query=Hyderabad%2C%20Telangana%2C%20India"
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm leading-6 text-slate-400 transition hover:text-white"
>
  Hyderabad, Telangana, India
</a>

              </div>

              <div className="flex gap-3">

                <Mail
                  size={19}
                  className="shrink-0 text-indigo-400"
                />

                <a
                  href="mailto:hello@novaagency.com"
                  className="text-sm text-slate-400 transition hover:text-indigo-400"
                >
                  hello@novaagency.com
                </a>

              </div>

              <div className="flex gap-3">

                <Phone
                  size={19}
                  className="shrink-0 text-indigo-400"
                />

                <a
                  href="tel:+919876543210"
                  className="text-sm text-slate-400 transition hover:text-indigo-400"
                >
                  +91 98765 43210
                </a>

              </div>

             

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM BAR */}

      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-500 md:flex-row md:items-center">

          <p>
            © 2026 Nova Digital Agency. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">

            <Link to="/about" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link to="/about" className="hover:text-white transition">
              Terms & Conditions
            </Link>

            <Link
              to="/login"
              className="text-xs font-semibold text-slate-400 hover:text-indigo-400 transition"
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