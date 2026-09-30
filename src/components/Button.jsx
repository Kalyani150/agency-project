import { Link } from "react-router-dom";

function Button({
  children,
  to,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition duration-300";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700",

    secondary:
      "border border-slate-300 bg-white text-slate-900 hover:border-indigo-600 hover:text-indigo-600",

    dark:
      "bg-slate-900 text-white hover:bg-slate-800",

    light:
      "bg-white text-indigo-600 hover:bg-slate-100",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}

export default Button;