// "use client";

// import Image from "next/image";
// import styles from "./BestSellers.module.css";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface Book {
//   id: number;
//   title: string;
//   author: string;
//   /** Cloudinary public ID, e.g. "bookstore/silent-patient" */
//   cloudinaryId: string;
//   originalPrice: number;
//   salePrice: number;
// }

// interface BestSellersProps {
//   /** Override the default book list from outside */
//   books?: Book[];
//   /** Your Cloudinary cloud name — set once here or via env */
//   cloudName?: string;
//   onShowAll?: () => void;
//   onAddToBag?: (book: Book) => void;
// }

// // ─── Default data (swap out cloudinaryId with your real public IDs) ───────────

// const DEFAULT_BOOKS: Book[] = [
//   {
//     id: 1,
//     title: "The Silent Patient",
//     author: "Alex Michaelides",
//     cloudinaryId: "https://res.cloudinary.com/dng2nnvlc/image/upload/v1782208076/dhdky320qsa11lxs8fk3.jpg",
//     originalPrice: 399,
//     salePrice: 320,
//   },
//   {
//     id: 2,
//     title: "Verity",
//     author: "Colleen Hoover",
//     cloudinaryId: "https://res.cloudinary.com/dng2nnvlc/image/upload/v1782208059/xsss9fxont5ymjoxvjc7.jpg",
//     originalPrice: 399,
//     salePrice: 320,
//   },
//   {
//     id: 3,
//     title: "A Thousand Splendid Suns",
//     author: "Khaled Hosseini",
//     cloudinaryId: "https://res.cloudinary.com/dng2nnvlc/image/upload/v1782208133/jozl203nbdo2sq3kskl8.jpg",
//     originalPrice: 599,
//     salePrice: 540,
//   },
//   {
//     id: 4,
//     title: "Tuesdays With Morrie",
//     author: "Mitch Albom",
//     cloudinaryId: "https://res.cloudinary.com/dng2nnvlc/image/upload/v1782208102/zcopsxomrpjiey4tkok2.jpg",
//     originalPrice: 299,
//     salePrice: 240,
//   },
//   {
//     id: 5,
//     title: "The Psychology of Money",
//     author: "Morgan Housel",
//     cloudinaryId: "https://res.cloudinary.com/dng2nnvlc/image/upload/v1782208093/n7qmmndradj4xkapnvxx.jpg",
//     originalPrice: 599,
//     salePrice: 510,
//   },
// ];

// // ─── Cloudinary URL builder ───────────────────────────────────────────────────

// function cloudinaryUrl(cloudName: string, publicId: string): string {
//   // Optimized: auto format, auto quality, resize to book cover dimensions
//   return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_240,h_340,c_fill/${publicId}`;
// }

// // ─── Discount badge helper ────────────────────────────────────────────────────

// function discountAmount(original: number, sale: number): number {
//   return original - sale;
// }

// // ─── Cart icon ────────────────────────────────────────────────────────────────

// function CartIcon() {
//   return (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2.2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//       <line x1="3" y1="6" x2="21" y2="6" />
//       <path d="M16 10a4 4 0 0 1-8 0" />
//     </svg>
//   );
// }

// // ─── Single book card ─────────────────────────────────────────────────────────

// interface BookCardProps {
//   book: Book;
//   cloudName: string;
//   onAddToBag?: (book: Book) => void;
//   index: number;
// }

// function BookCard({ book, cloudName, onAddToBag, index }: BookCardProps) {
//   const saved = discountAmount(book.originalPrice, book.salePrice);
// const imgSrc = book.cloudinaryId;  

//   return (
//     <article
//       className={styles.card}
//       style={{ animationDelay: `${index * 80}ms` }}
//     >
//       {/* Cover image */}
//       <div className={styles.coverWrap}>
//         <Image
//           src={imgSrc}
//           alt={`Cover of ${book.title}`}
//           width={240}
//           height={340}
//           className={styles.coverImg}
//           sizes="(max-width: 640px) 45vw, 200px"
//           priority={index < 3}
//         />
//         <div className={styles.hoverOverlay} aria-hidden="true" />
//       </div>

//       {/* Book meta */}
//       <div className={styles.meta}>
//         <h3 className={styles.bookTitle}>{book.title}</h3>
//         <p className={styles.bookAuthor}>{book.author}</p>

//         <div className={styles.pricing}>
//           <span className={styles.originalPrice}>₹ {book.originalPrice}</span>
//           <span className={styles.salePrice}>₹ {book.salePrice}</span>
//           <span className={styles.discountBadge}>₹ {saved} Off</span>
//         </div>

//         <button
//           className={styles.addBtn}
//           onClick={() => onAddToBag?.(book)}
//           aria-label={`Add ${book.title} to bag`}
//         >
//           <CartIcon />
//           Add to Bag
//         </button>
//       </div>
//     </article>
//   );
// }

// // ─── Main component ───────────────────────────────────────────────────────────

// export default function BestSellers({
//   books = DEFAULT_BOOKS,
//   cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "your-cloud-name",
//   onShowAll,
//   onAddToBag,
// }: BestSellersProps) {
//   return (
//     <section className={styles.section} aria-labelledby="bestsellers-heading">
//       {/* Header */}
//       <div className={styles.header}>
//         <div className={styles.headerLeft}>
//           <h2 id="bestsellers-heading" className={styles.heading}>
//             Best Se<span className={styles.headingAccent}>l</span>lers
//           </h2>
//           <p className={styles.subheading}>Read What Millions Have Loved!</p>
//         </div>

//         <button
//           className={styles.showAllBtn}
//           onClick={onShowAll}
//           aria-label="Show all bestsellers"
//         >
//           Show All
//           <svg
//             width="14"
//             height="14"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             aria-hidden="true"
//           >
//             <line x1="7" y1="17" x2="17" y2="7" />
//             <polyline points="7 7 17 7 17 17" />
//           </svg>
//         </button>
//       </div>

//       {/* Books grid / horizontal scroll */}
//       <div className={styles.grid} role="list">
//         {books.map((book, i) => (
//           <div key={book.id} role="listitem">
//             <BookCard
//               book={book}
//               cloudName={cloudName}
//               onAddToBag={onAddToBag}
//               index={i}
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────

export interface Book {
  id: number;
  title: string;
  author: string;
  cloudinaryId: string;
  originalPrice: number;
  salePrice: number;
}

interface BestSellersProps {
  books?: Book[];
  cloudName?: string;
  onShowAll?: () => void;
  onAddToBag?: (book: Book) => void;
}

// ─── Default Books ───────────────────────────────────────────────────────

const DEFAULT_BOOKS: Book[] = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cloudinaryId:
      "https://res.cloudinary.com/dng2nnvlc/image/upload/v1782208076/dhdky320qsa11lxs8fk3.jpg",
    originalPrice: 399,
    salePrice: 320,
  },
  {
    id: 2,
    title: "Verity",
    author: "Colleen Hoover",
    cloudinaryId:
      "https://res.cloudinary.com/dng2nnvlc/image/upload/v1782208059/xsss9fxont5ymjoxvjc7.jpg",
    originalPrice: 399,
    salePrice: 320,
  },
  {
    id: 3,
    title: "A Thousand Splendid Suns",
    author: "Khaled Hosseini",
    cloudinaryId:
      "https://res.cloudinary.com/dng2nnvlc/image/upload/v1782208133/jozl203nbdo2sq3kskl8.jpg",
    originalPrice: 599,
    salePrice: 540,
  },
  {
    id: 4,
    title: "Tuesdays With Morrie",
    author: "Mitch Albom",
    cloudinaryId:
      "https://res.cloudinary.com/dng2nnvlc/image/upload/v1782208102/zcopsxomrpjiey4tkok2.jpg",
    originalPrice: 299,
    salePrice: 240,
  },
  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cloudinaryId:
      "https://res.cloudinary.com/dng2nnvlc/image/upload/v1782208093/n7qmmndradj4xkapnvxx.jpg",
    originalPrice: 599,
    salePrice: 510,
  },
];

// ─── Helper ──────────────────────────────────────────────────────────────

function discountAmount(original: number, sale: number) {
  return original - sale;
}

// ─── Cart Icon ───────────────────────────────────────────────────────────

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
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

// ─── Book Card ───────────────────────────────────────────────────────────

interface BookCardProps {
  book: Book;
  cloudName: string;
  onAddToBag?: (book: Book) => void;
  index: number;
}

function BookCard({
  book,
  cloudName,
  onAddToBag,
  index,
}: BookCardProps) {
  const saved = discountAmount(book.originalPrice, book.salePrice);

  const imgSrc = book.cloudinaryId;

  return (
    <article
      className="flex flex-col gap-3 animate-fadeIn"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Cover */}

      <div
        className="
        group
        relative
        aspect-[2/3]
        overflow-hidden
        rounded-md
        bg-[#e8e4dc]
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
      >
        <Image
          src={imgSrc}
          alt={book.title}
          width={240}
          height={340}
          priority={index < 3}
          sizes="(max-width:640px)45vw,200px"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />

        <div
          className="
          absolute
          inset-0
          bg-black/0
          transition
          duration-300
          group-hover:bg-black/5
        "
        />
      </div>

      {/* Meta */}

      <div className="flex flex-col gap-1">
        <h3
          className="
          line-clamp-2
          text-sm
          font-bold
          leading-5
          text-[#111]
        "
        >
          {book.title}
        </h3>

        <p className="text-xs text-gray-500">
          {book.author}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400 line-through">
            ₹ {book.originalPrice}
          </span>

          <span className="text-lg font-bold">
            ₹ {book.salePrice}
          </span>

          <span
            className="
            rounded
            bg-[#803896]
            px-2
            py-1
            text-[10px]
            font-bold
            uppercase
            tracking-wide
            text-white
          "
          >
            ₹ {saved} Off
          </span>
        </div>

        <button
          onClick={() => onAddToBag?.(book)}
          className="
          mt-2
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-[#803896]
          py-3
          text-xs
          font-bold
          uppercase
          tracking-wider
          text-white
          transition
          duration-200
          hover:bg-[#421750]
          active:scale-95
        "
        >
          <CartIcon />
          Add to Bag
        </button>
      </div>
    </article>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────

export default function BestSellers({
  books = DEFAULT_BOOKS,
  cloudName = "",
  onShowAll,
  onAddToBag,
}: BestSellersProps) {
  return (
    <section className="w-full bg-[#f7f7f5] px-8 py-10 max-sm:px-4 max-sm:py-6">
      {/* Header */}

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2
            className="
            text-[clamp(1.75rem,4vw,2.5rem)]
            font-bold
            leading-none
            tracking-tight
            text-[#111]
          "
          >
            Best Se<span>l</span>lers
          </h2>

          <p className="text-xs tracking-wide text-gray-500">
            Read What Millions Have Loved!
          </p>
        </div>

        <button
          onClick={onShowAll}
          className="
          inline-flex
          items-center
          gap-2
          rounded-lg
          border
          border-black
          bg-white
          px-5
          py-2.5
          text-xs
          font-semibold
          uppercase
          tracking-wider
          transition
          hover:bg-black
          hover:text-white
        "
        >
          Show All

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </div>

      {/* Books */}

      {/* Books */}
<div
  className="
    flex
    flex-nowrap
    gap-5
    justify-between

    max-[600px]:
    overflow-x-auto
    max-[600px]:pb-2
    max-[600px]:snap-x
    max-[600px]:snap-mandatory
  "
>
  {books.map((book, i) => (
    <div
      key={book.id}
      className="
        flex-1
        min-w-0

        max-[600px]:
        flex-none
        max-[600px]:w-[160px]
        max-[600px]:snap-start
      "
    >
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