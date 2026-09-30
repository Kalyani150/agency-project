import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // ==================================================
    // ANY EMAIL + ANY PASSWORD
    // ==================================================
    // No fixed admin credentials are required.
    // If the required fields are filled, login succeeds.

    const enteredEmail = email.trim();

    if (!enteredEmail || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // Save login state
    localStorage.setItem("agency_admin_logged_in", "true");
    localStorage.setItem("adminLoggedIn", "true");

    // Open admin dashboard
    navigate("/admin", {
      replace: true,
    });
  };

  const alreadyLoggedIn =
    localStorage.getItem("agency_admin_logged_in") === "true" ||
    localStorage.getItem("adminLoggedIn") === "true";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        {/* Back to Website */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to website
          </button>

          {alreadyLoggedIn && (
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline"
            >
              Go to Dashboard →
            </button>
          )}
        </div>

        {/* Header */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <Lock size={30} />
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            Admin Login
          </h1>

         

        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <div className="relative">

              <Mail
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email"
                autoComplete="username"
                required
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.99]"
          >
            Login to Admin
          </button>

        </form>

        
      </div>

    </div>
  );
}

export default Login;