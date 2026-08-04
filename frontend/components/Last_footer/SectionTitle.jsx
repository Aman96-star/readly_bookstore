export default function SectionTitle({ eyebrow, title, subtitle, align = "center" }) {
  const isCenter = align === "center";
  return (
    <div
      className={`mb-10 flex max-w-2xl flex-col gap-3 md:mb-14 ${
        isCenter ? "mx-auto items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-700 dark:text-amber-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-black">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-slate-600 md:text-lg dark:text-black">
          {subtitle}
        </p>
      )}
    </div>
  );
}
