"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Menu, X, ShoppingCart, Search } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-white">
            <BookOpen className="h-5 w-5" />
          </span>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-brand-800 dark:text-slate-200 dark:hover:text-amber-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button aria-label="Search" className="text-slate-600 transition-colors hover:text-brand-800 dark:text-slate-300">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="View cart" className="text-slate-600 transition-colors hover:text-brand-800 dark:text-slate-300">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>

        <button
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="text-slate-700 md:hidden dark:text-slate-200"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-slate-200 bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-slate-900"
        >
          <ul className="flex flex-col gap-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
