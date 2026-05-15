"use client";

import Image from "next/image";
import styles from "./BestSellers.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Book {
  id: number;
  title: string;
  author: string;
  /** Cloudinary public ID, e.g. "bookstore/silent-patient" */
  cloudinaryId: string;
  originalPrice: number;
  salePrice: number;
}

interface BestSellersProps {
  /** Override the default book list from outside */
  books?: Book[];
  /** Your Cloudinary cloud name — set once here or via env */
  cloudName?: string;
  onShowAll?: () => void;
  onAddToBag?: (book: Book) => void;
}

// ─── Default data (swap out cloudinaryId with your real public IDs) ───────────

const DEFAULT_BOOKS: Book[] = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cloudinaryId: "bookstore/silent-patient",
    originalPrice: 399,
    salePrice: 320,
  },
  {
    id: 2,
    title: "Verity",
    author: "Colleen Hoover",
    cloudinaryId: "bookstore/verity",
    originalPrice: 399,
    salePrice: 320,
  },
  {
    id: 3,
    title: "A Thousand Splendid Suns",
    author: "Khaled Hosseini",
    cloudinaryId: "bookstore/thousand-splendid-suns",
    originalPrice: 599,
    salePrice: 540,
  },
  {
    id: 4,
    title: "Tuesdays With Morrie",
    author: "Mitch Albom",
    cloudinaryId: "bookstore/tuesdays-with-morrie",
    originalPrice: 299,
    salePrice: 240,
  },
  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cloudinaryId: "bookstore/psychology-of-money",
    originalPrice: 599,
    salePrice: 510,
  },
];

// ─── Cloudinary URL builder ───────────────────────────────────────────────────

function cloudinaryUrl(cloudName: string, publicId: string): string {
  // Optimized: auto format, auto quality, resize to book cover dimensions
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_240,h_340,c_fill/${publicId}`;
}

// ─── Discount badge helper ────────────────────────────────────────────────────

function discountAmount(original: number, sale: number): number {
  return original - sale;
}

// ─── Cart icon ────────────────────────────────────────────────────────────────

function CartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

// ─── Single book card ─────────────────────────────────────────────────────────

interface BookCardProps {
  book: Book;
  cloudName: string;
  onAddToBag?: (book: Book) => void;
  index: number;
}

function BookCard({ book, cloudName, onAddToBag, index }: BookCardProps) {
  const saved = discountAmount(book.originalPrice, book.salePrice);
  const imgSrc = cloudinaryUrl(cloudName, book.cloudinaryId);

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Cover image */}
      <div className={styles.coverWrap}>
        <Image
          src={imgSrc}
          alt={`Cover of ${book.title}`}
          width={240}
          height={340}
          className={styles.coverImg}
          sizes="(max-width: 640px) 45vw, 200px"
          priority={index < 3}
        />
        <div className={styles.hoverOverlay} aria-hidden="true" />
      </div>

      {/* Book meta */}
      <div className={styles.meta}>
        <h3 className={styles.bookTitle}>{book.title}</h3>
        <p className={styles.bookAuthor}>{book.author}</p>

        <div className={styles.pricing}>
          <span className={styles.originalPrice}>₹ {book.originalPrice}</span>
          <span className={styles.salePrice}>₹ {book.salePrice}</span>
          <span className={styles.discountBadge}>₹ {saved} Off</span>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => onAddToBag?.(book)}
          aria-label={`Add ${book.title} to bag`}
        >
          <CartIcon />
          Add to Bag
        </button>
      </div>
    </article>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BestSellers({
  books = DEFAULT_BOOKS,
  cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "your-cloud-name",
  onShowAll,
  onAddToBag,
}: BestSellersProps) {
  return (
    <section className={styles.section} aria-labelledby="bestsellers-heading">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 id="bestsellers-heading" className={styles.heading}>
            Best Se<span className={styles.headingAccent}>l</span>lers
          </h2>
          <p className={styles.subheading}>Read What Millions Have Loved!</p>
        </div>

        <button
          className={styles.showAllBtn}
          onClick={onShowAll}
          aria-label="Show all bestsellers"
        >
          Show All
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </div>

      {/* Books grid / horizontal scroll */}
      <div className={styles.grid} role="list">
        {books.map((book, i) => (
          <div key={book.id} role="listitem">
            <BookCard
              book={book}
              cloudName={cloudName}
              onAddToBag={onAddToBag}
              index={i}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
