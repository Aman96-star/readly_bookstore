import Link from "next/link";

export default function CTASection({
  title,
  subtitle,
  primaryLabel = "Start Shopping",
  primaryHref = "/",
  secondaryLabel,
  secondaryHref,
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-amber-800 px-6 py-14 text-center sm:px-12 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-14 left-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      </div>
      <div className="relative mx-auto max-w-2xl">
        <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl">{title}</h2>
        {subtitle && <p className="mb-8 text-black">{subtitle}</p>}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-sm transition-transform duration-300 hover:scale-105"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
