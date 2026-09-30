import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("agencySettings");

    return saved
      ? JSON.parse(saved)
      : {
          agencyName: "Nova Digital Agency",
          email: "hello@novaagency.com",
          phone: "+91 98765 43210",
          address: "Hyderabad, Telangana, India",
          instagram: "",
          linkedin: "",
        };
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "agencySettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-slate-500">
          Manage your agency information.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >

        <div className="grid gap-6 sm:grid-cols-2">

          {/* Agency name */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Agency Name
            </label>

            <input
              name="agencyName"
              value={settings.agencyName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone
            </label>

            <input
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Address
            </label>

            <textarea
              name="address"
              rows="3"
              value={settings.address}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Instagram */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Instagram
            </label>

            <input
              name="instagram"
              value={settings.instagram}
              onChange={handleChange}
              placeholder="Instagram URL"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              LinkedIn
            </label>

            <input
              name="linkedin"
              value={settings.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

        </div>

        {/* Success */}
        {saved && (
          <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            Settings saved successfully.
          </div>
        )}

        {/* Save */}
        <div className="mt-8 border-t border-slate-200 pt-6">

          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Save Settings
          </button>

        </div>

      </form>

    </div>
  );
}

export default Settings;