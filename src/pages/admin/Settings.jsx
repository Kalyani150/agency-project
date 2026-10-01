import { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Save,
  CheckCircle2,
} from "lucide-react";

function Settings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("agencySettings");

    return saved
      ? JSON.parse(saved)
      : {
          agencyName: "",
          email: "",
          phone: "",
          address: "",
          instagram: "",
          linkedin: "",
        };
  });

  const [saved, setSaved] = useState(false);

  // ======================================================
  // INPUT SANITIZATION
  // ======================================================

  const sanitizeValue = (name, value) => {
    switch (name) {
      case "agencyName":
        return value.replace(/[^a-zA-Z0-9\s&.'-]/g, "");

      case "email":
        return value.replace(/[^a-zA-Z0-9@._%+-]/g, "");

      case "phone":
        return value.replace(/[^0-9+\-()\s]/g, "");

      case "address":
        return value.replace(
          /[^a-zA-Z0-9\s,.'#&()\/-]/g,
          ""
        );

      case "instagram":
      case "linkedin":
        return value.replace(
          /[^a-zA-Z0-9:/?&=._#%+\-@]/g,
          ""
        );

      default:
        return value;
    }
  };

  // ======================================================
  // HANDLE CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    const sanitizedValue = sanitizeValue(name, value);

    setSettings((previous) => ({
      ...previous,
      [name]: sanitizedValue,
    }));

    setSaved(false);
  };

  // ======================================================
  // HANDLE SUBMIT
  // ======================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanSettings = {
      agencyName: settings.agencyName.trim(),
      email: settings.email.trim(),
      phone: settings.phone.trim(),
      address: settings.address.trim(),
      instagram: settings.instagram.trim(),
      linkedin: settings.linkedin.trim(),
    };

    if (!cleanSettings.agencyName) {
      alert("Please enter the agency name.");
      return;
    }

    if (!cleanSettings.email) {
      alert("Please enter the agency email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanSettings.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!cleanSettings.phone) {
      alert("Please enter the phone number.");
      return;
    }

    localStorage.setItem(
      "agencySettings",
      JSON.stringify(cleanSettings)
    );

    setSettings(cleanSettings);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <Building2 size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Settings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your agency information and social media details.
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          MAIN CARD
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* CARD HEADER */}

        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-8">
          <h2 className="text-lg font-bold text-slate-900">
            Agency Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the information you want to display on your website.
          </p>
        </div>

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* ==================================================
                AGENCY NAME
            ================================================== */}

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Building2
                  size={16}
                  className="text-indigo-500"
                />

                Agency Name

                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="agencyName"
                value={settings.agencyName}
                onChange={handleChange}
                placeholder="Enter agency name"
                autoComplete="organization"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                required
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Enter your registered or display agency name.
              </p>
            </div>

            {/* ==================================================
                EMAIL
            ================================================== */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Mail
                  size={16}
                  className="text-indigo-500"
                />

                Email

                <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="Enter agency email"
                autoComplete="email"
                inputMode="email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                required
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Example: hello@youragency.com
              </p>
            </div>

            {/* ==================================================
                PHONE
            ================================================== */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Phone
                  size={16}
                  className="text-indigo-500"
                />

                Phone

                <span className="text-red-500">*</span>
              </label>

              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                autoComplete="tel"
                inputMode="tel"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                required
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Example: +91 98765 43210
              </p>
            </div>

            {/* ==================================================
                ADDRESS
            ================================================== */}

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin
                  size={16}
                  className="text-indigo-500"
                />

                Address
              </label>

              <textarea
                name="address"
                rows={4}
                value={settings.address}
                onChange={handleChange}
                placeholder="Enter agency address"
                autoComplete="street-address"
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Enter your office or business address.
              </p>
            </div>
          </div>

          {/* ==================================================
              SOCIAL MEDIA
          ================================================== */}

          <div className="mt-8">
            <div className="mb-5">
              <h3 className="text-base font-bold text-slate-900">
                Social Media
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Add your social media profile URLs.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* INSTAGRAM */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Instagram
                    size={16}
                    className="text-pink-500"
                  />

                  Instagram
                </label>

                <input
                  type="url"
                  name="instagram"
                  value={settings.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/youragency"
                  inputMode="url"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              {/* LINKEDIN */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Linkedin
                    size={16}
                    className="text-blue-600"
                  />

                  LinkedIn
                </label>

                <input
                  type="url"
                  name="linkedin"
                  value={settings.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/company/youragency"
                  inputMode="url"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>
          </div>

          {/* ==================================================
              SUCCESS MESSAGE
          ================================================== */}

          {saved && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              <CheckCircle2 size={19} />

              <span>
                Settings saved successfully.
              </span>
            </div>
          )}

          {/* ==================================================
              SAVE BUTTON
          ================================================== */}

          <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-400">
              Changes will be saved to your browser.
            </p>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500/20 sm:w-auto"
            >
              <Save size={18} />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;