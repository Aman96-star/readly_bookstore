"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Accessible accordion-style FAQ item. Client component because it
// tracks open/closed state locally.
export default function FAQCard({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-slate-900 dark:text-white">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-brand-700 transition-transform duration-300 dark:text-amber-400 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
