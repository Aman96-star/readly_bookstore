import Breadcrumb from "./Breadcrumb";

// Reusable hero/banner section used at the top of every interior page.
// Provides a consistent, modern gradient banner with a breadcrumb,
// eyebrow badge, title, and supporting subtitle.
export default function PageHero({ eyebrow, title, subtitle, breadcrumbItems = [], icon: Icon }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-amber-800 py-16 sm:py-20 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:24px_24px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="max-w-3xl animate-fade-in">
          {eyebrow && (
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-amber-700 ring-1 ring-inset ring-white/20">
              {Icon && <Icon className="h-4 w-4" />}
              {eyebrow}
            </span>
          )}
          <h1 className="mb-5 text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg leading-relaxed text-black md:text-xl">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
