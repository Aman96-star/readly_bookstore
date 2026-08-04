"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviewCount: string;
  badge: string;
  badgeIcon: string;
  genre: string;
  coverBg: string;
  spineColor: string;
  titleColor: string;
  authorColor: string;
  badgeBg: string;
  badgeColor: string;
}

const BOOKS: Book[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    description:
      "Between life and death there's a library. Its shelves go on forever. Every book provides a chance to try another life you could have lived .",
    price: "₹499",
    originalPrice: "₹699",
    rating: 5,
    reviewCount: "12.4k reviews",
    badge: "Bestseller",
    badgeIcon: "✦",
    genre: "Fiction",
    coverBg: "#E1F5EE",
    spineColor: "#0F6E56",
    titleColor: "#085041",
    authorColor: "#0F6E56",
    badgeBg: "#E1F5EE",
    badgeColor: "#085041",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "Tiny changes, remarkable results. An easy and proven way to build good habits and break bad ones — through the surprising power of small improvements compounded over time.",
    price: "₹399",
    originalPrice: "₹599",
    rating: 5,
    reviewCount: "38k reviews",
    badge: "Top Rated",
    badgeIcon: "↑",
    genre: "Self-Help",
    coverBg: "#EEEDFE",
    spineColor: "#534AB7",
    titleColor: "#26215C",
    authorColor: "#534AB7",
    badgeBg: "#EEEDFE",
    badgeColor: "#3C3489",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A young Andalusian shepherd journeys to the Egyptian pyramids after dreaming of treasure there. A philosophical novel about dreams and listening to the universe.",
    price: "₹299",
    originalPrice: "₹450",
    rating: 4,
    reviewCount: "55k reviews",
    badge: "Classic",
    badgeIcon: "★",
    genre: "Philosophy",
    coverBg: "#FAECE7",
    spineColor: "#993C1D",
    titleColor: "#4A1B0C",
    authorColor: "#993C1D",
    badgeBg: "#FAECE7",
    badgeColor: "#712B13",
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description:
      "A brief history of humankind — from the Stone Age through the 21st century. Explores how biology and history have defined us and challenges us to reconsider accepted beliefs.",
    price: "₹549",
    originalPrice: "₹799",
    rating: 5,
    reviewCount: "29k reviews",
    badge: "Non-Fiction",
    badgeIcon: "◈",
    genre: "History",
    coverBg: "#E6F1FB",
    spineColor: "#185FA5",
    titleColor: "#042C53",
    authorColor: "#185FA5",
    badgeBg: "#E6F1FB",
    badgeColor: "#0C447C",
  },
  {
    id: 5,
    title: "It Ends with Us",
    author: "Colleen Hoover",
    description:
      "Lily hasn't always had it easy, but she's worked hard to be strong and independent. A raw, emotional story about resilience, love, and the courage to start over.",
    price: "₹349",
    originalPrice: "₹499",
    rating: 5,
    reviewCount: "67k reviews",
    badge: "Trending",
    badgeIcon: "⌁",
    genre: "Romance",
    coverBg: "#FBEAF0",
    spineColor: "#993556",
    titleColor: "#4B1528",
    authorColor: "#993556",
    badgeBg: "#FBEAF0",
    badgeColor: "#72243E",
  },
];

const AUTO_INTERVAL = 4000;
const PAUSE_DURATION = 6000;

export default function BookCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const progressStartRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const clearAuto = () => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = null;
  };

  const clearRaf = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const startProgress = useCallback(() => {
    clearRaf();
    setProgress(0);
    progressStartRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - (progressStartRef.current ?? now);
      const pct = Math.min((elapsed / AUTO_INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const startAuto = useCallback(() => {
    clearAuto();
    startProgress();
    autoTimerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % BOOKS.length);
      startProgress();
    }, AUTO_INTERVAL);
  }, [startProgress]);

  const goTo = useCallback(
    (idx: number, manual = false) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(((idx % BOOKS.length) + BOOKS.length) % BOOKS.length);
      setTimeout(() => setIsAnimating(false), 500);

      if (manual) {
        pausedRef.current = true;
        clearAuto();
        clearRaf();
        setProgress(0);
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
          pausedRef.current = false;
          startAuto();
        }, PAUSE_DURATION);
      } else {
        startProgress();
      }
    },
    [isAnimating, startAuto, startProgress]
  );

  useEffect(() => {
    startAuto();
    return () => {
      clearAuto();
      clearRaf();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [startAuto]);

  const book = BOOKS[current];

  return (
    <section className="w-full bg-[#e0b9ec]">
      <div
        className="w-full max-w-[800px] mx-auto py-8 font-serif"
        aria-label="Featured books carousel"
      >
        {/* Keyframes for the slide-in animation — Tailwind has no built-in
            equivalent, so it's registered globally via styled-jsx and
            referenced below with the animate-[...] arbitrary utility. */}
      <style jsx global>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateX(16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Header row */}
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-serif text-[1.375rem] font-normal tracking-[0.04em] text-[#1a1a1a] m-0">
          Featured Reads
        </h2>
        <span className="font-mono text-xs text-[#888] tracking-[0.1em]">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(BOOKS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Viewport */}
      <div className="border border-[#e8e3dc] rounded-xl bg-[#faf9f6] overflow-hidden relative">
        <div
          key={book.id}
          className="grid grid-cols-1 min-[600px]:grid-cols-[200px_1fr] min-h-[320px] animate-[fadeSlide_0.45s_cubic-bezier(0.4,0,0.2,1)]"
        >
          {/* Cover panel */}
          <div className="flex flex-row min-[600px]:flex-col items-start min-[600px]:items-center justify-center gap-4 min-[600px]:gap-[14px] py-6 min-[600px]:py-8 px-4 min-[600px]:px-5 border-b min-[600px]:border-b-0 min-[600px]:border-r border-[#e8e3dc] bg-white">
            <div
              className="relative w-20 h-[116px] min-[600px]:w-[112px] min-[600px]:h-[162px] rounded-tl-[3px] rounded-tr-[6px] rounded-br-[6px] rounded-bl-[3px] flex flex-col items-center justify-center shadow-[4px_4px_12px_rgba(0,0,0,0.1),1px_1px_3px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-[3px] hover:rotate-1 hover:shadow-[6px_8px_18px_rgba(0,0,0,0.14)] flex-shrink-0"
              style={{ background: book.coverBg }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[10px]"
                style={{ background: book.spineColor }}
              />
              <span
                className="font-serif text-[11px] font-bold text-center px-[14px] leading-[1.45] z-[1]"
                style={{ color: book.titleColor }}
              >
                {book.title}
              </span>
              <span
                className="font-mono text-[9px] text-center px-[14px] mt-[6px] z-[1] opacity-80"
                style={{ color: book.authorColor }}
              >
                {book.author}
              </span>
            </div>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#aaa] m-0 mt-1 min-[600px]:mt-0">
              {book.genre}
            </p>
          </div>

          {/* Info panel */}
          <div className="flex flex-col justify-center gap-2 min-[600px]:gap-[10px] py-5 px-4 min-[600px]:pt-8 min-[600px]:pr-8 min-[600px]:pb-8 min-[600px]:pl-7">
            <span
              className="inline-flex items-center gap-[5px] font-mono text-[10px] tracking-[0.08em] uppercase font-bold py-1 px-[10px] rounded w-fit"
              style={{ background: book.badgeBg, color: book.badgeColor }}
            >
              <span className="text-[11px]">{book.badgeIcon}</span>
              {book.badge}
            </span>

            <h3 className="font-serif text-[1.15rem] min-[600px]:text-[1.4rem] font-normal text-[#1a1a1a] m-0 leading-[1.3]">
              {book.title}
            </h3>
            <p className="font-mono text-[0.8rem] text-[#888] m-0 tracking-[0.02em]">
              by {book.author}
            </p>

            <div className="flex items-center gap-[2px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < book.rating
                      ? "text-[13px] text-[#c8902a]"
                      : "text-[13px] text-[#ddd]"
                  }
                >
                  ★
                </span>
              ))}
              <span className="font-mono text-[11px] text-[#aaa] ml-[6px]">
                {book.reviewCount}
              </span>
            </div>

            <p className="font-serif text-[0.85rem] text-[#555] leading-[1.7] m-0 line-clamp-3 min-[600px]:line-clamp-none">
              {book.description}
            </p>

            <div className="flex items-baseline gap-[10px] mt-[2px]">
              <span className="font-serif text-2xl font-bold text-[#1a1a1a]">
                {book.price}
              </span>
              <span className="font-mono text-[0.8rem] text-[#bbb] line-through">
                {book.originalPrice}
              </span>
              <span className="font-mono text-[0.7rem] font-bold text-[#2e7d32] bg-[#e8f5e9] py-[2px] px-[7px] rounded-[3px] tracking-[0.04em]">
                {Math.round(
                  (1 -
                    parseInt(book.price.replace(/\D/g, "")) /
                      parseInt(book.originalPrice.replace(/\D/g, ""))) *
                    100
                )}
                % off
              </span>
            </div>

            <div className="flex gap-[10px] mt-1">
              <button className="inline-flex items-center gap-2 bg-[#1a1a1a] text-[#faf9f6] font-mono text-xs tracking-[0.06em] uppercase py-[10px] px-5 border-none rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#333] active:scale-[0.98]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Add to cart
              </button>
              <button
                className="inline-flex items-center justify-center w-10 h-10 bg-transparent text-[#888] border border-[#e0d8cc] rounded-md cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 hover:bg-[#fff0f3] hover:text-[#c0395a] hover:border-[#f5b8c8]"
                aria-label="Add to wishlist"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-[#ede8e0]" aria-hidden="true">
          <div
            className="h-full bg-[#1a1a1a] transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4 px-[0.125rem]">
        <div className="flex items-center gap-2" role="tablist" aria-label="Select book">
          {BOOKS.map((b, i) => (
            <button
              key={b.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to ${b.title}`}
              className={`h-[6px] border-none p-0 cursor-pointer transition-all duration-[250ms] ease-in-out ${
                i === current
                  ? "w-[22px] rounded-[3px] bg-[#1a1a1a]"
                  : "w-[6px] rounded-full bg-[#d5cfc5]"
              }`}
              onClick={() => goTo(i, true)}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            className="w-9 h-9 flex items-center justify-center bg-white text-[#1a1a1a] border border-[#e0d8cc] rounded-md cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#f5f0e8] hover:border-[#c8bfb0] active:scale-95"
            onClick={() => goTo(current - 1, true)}
            aria-label="Previous book"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="w-9 h-9 flex items-center justify-center bg-white text-[#1a1a1a] border border-[#e0d8cc] rounded-md cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#f5f0e8] hover:border-[#c8bfb0] active:scale-95"
            onClick={() => goTo(current + 1, true)}
            aria-label="Next book"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}


