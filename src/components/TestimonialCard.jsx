import {
  Star,
  Quote,
} from "lucide-react";

function TestimonialCard({
  testimonial,
}) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

      <div className="absolute right-6 top-6 text-indigo-100">
        <Quote size={45} />
      </div>

      {/* Rating */}

      <div className="flex gap-1">

        {Array.from({
          length: testimonial.rating || 5,
        }).map((_, index) => (
          <Star
            key={index}
            size={17}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}

      </div>

      {/* Message */}

      <p className="relative mt-5 text-base leading-7 text-slate-600">
        "{testimonial.message}"
      </p>

      {/* User */}

      <div className="mt-6">

        <p className="font-bold text-slate-900">
          {testimonial.name}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {testimonial.role}
        </p>

      </div>

    </div>
  );
}

export default TestimonialCard;