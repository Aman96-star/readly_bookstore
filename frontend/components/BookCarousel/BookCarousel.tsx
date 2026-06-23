"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./BookCarousel.module.css";

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
      "Between life and death there's a library. Its shelves go on forever. Every book provides a chance to try another life you could have lived — to see how things would be if you had made other choices.",
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
      "A young Andalusian shepherd journeys to the Egyptian pyramids after dreaming of treasure there. A philosophical novel about following your dreams and listening to the universe.",
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
    <section className={styles.wrapper} aria-label="Featured books carousel">
      <div className={styles.header}>
        <h2 className={styles.heading}>Featured Reads</h2>
        <span className={styles.counter}>
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(BOOKS.length).padStart(2, "0")}
        </span>
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.slideWrap}
          key={book.id}
          style={{ animation: "fadeSlide 0.5s ease" }}
        >
          {/* Book cover panel */}
          <div className={styles.coverPanel}>
            <div
              className={styles.bookCover}
              style={{ background: book.coverBg }}
            >
              <div
                className={styles.spine}
                style={{ background: book.spineColor }}
              />
              <span
                className={styles.coverTitle}
                style={{ color: book.titleColor }}
              >
                {book.title}
              </span>
              <span
                className={styles.coverAuthor}
                style={{ color: book.authorColor }}
              >
                {book.author}
              </span>
            </div>
            <p className={styles.genreTag}>{book.genre}</p>
          </div>

          {/* Book info panel */}
          <div className={styles.infoPanel}>
            <span
              className={styles.badge}
              style={{ background: book.badgeBg, color: book.badgeColor }}
            >
              <span className={styles.badgeIcon}>{book.badgeIcon}</span>
              {book.badge}
            </span>

            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.author}>by {book.author}</p>

            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < book.rating ? styles.starFull : styles.starEmpty
                  }
                >
                  ★
                </span>
              ))}
              <span className={styles.reviewCount}>{book.reviewCount}</span>
            </div>

            <p className={styles.description}>{book.description}</p>

            <div className={styles.priceRow}>
              <span className={styles.price}>{book.price}</span>
              <span className={styles.originalPrice}>{book.originalPrice}</span>
              <span className={styles.discount}>
                {Math.round(
                  (1 -
                    parseInt(book.price.replace(/\D/g, "")) /
                      parseInt(book.originalPrice.replace(/\D/g, ""))) *
                    100
                )}
                % off
              </span>
            </div>

            <div className={styles.actions}>
              <button className={styles.btnCart}>
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
              <button className={styles.btnWish} aria-label="Add to wishlist">
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
        <div className={styles.progressBar} aria-hidden="true">
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.dots} role="tablist" aria-label="Select book">
          {BOOKS.map((b, i) => ( 
            <button
              key={b.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to ${b.title}`}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              onClick={() => goTo(i, true)}
            />
          ))}
        </div>

        <div className={styles.navBtns}>
          <button
            className={styles.navBtn}
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
            className={styles.navBtn}
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
    </section>
  );
}
