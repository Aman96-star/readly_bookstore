"use client";

import { useState, useRef, useEffect } from "react";
import { GENRES, Genre, Book } from "@/data/books";
import styles from "./BookExplorer.module.css";

/* ─── Rank medal helper ──────────────────────────────────────── */
function rankLabel(n: number) {
  if (n === 1) return "Gold";
  if (n === 2) return "Silver";
  if (n === 3) return "Bronze";
  return null;
}

/* ─── Single book row ────────────────────────────────────────── */
function BookRow({
  book,
  rank,
  accent,
  accentMuted,
  accentText,
  animDelay,
}: {
  book: Book;
  rank: number;
  accent: string;
  accentMuted: string;
  accentText: string;
  animDelay: number;
}) {
  const medal = rankLabel(rank);

  return (
    <li
      className={styles.bookRow}
      style={{ animationDelay: `${animDelay}ms` }}
    >
      {/* Rank number */}
      <span
        className={styles.rank}
        style={
          medal
            ? { backgroundColor: accentMuted, color: accentText }
            : undefined
        }
      >
        {rank}
      </span>

      {/* Title + author */}
      <div className={styles.bookMeta}>
        <span className={styles.bookTitle}>{book.title}</span>
        <span className={styles.bookAuthor}>{book.author}</span>
      </div>

      {/* Top-3 badge */}
      {medal && (
        <span
          className={styles.medal}
          style={{ backgroundColor: accentMuted, color: accentText }}
          aria-label={`${medal} pick`}
        >
          {medal}
        </span>
      )}
    </li>
  );
}

/* ─── Sidebar genre item ─────────────────────────────────────── */
function SidebarItem({
  genre,
  isActive,
  onClick,
}: {
  genre: Genre;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ""}`}
      style={
        isActive
          ? {
              backgroundColor: genre.accentMuted,
              color: genre.accentText,
              borderColor: genre.accentText + "30",
            }
          : {}
      }
    >
      <span className={styles.sidebarEmoji} aria-hidden="true">
        {genre.emoji}
      </span>
      <span className={styles.sidebarLabel}>{genre.label}</span>
      {isActive && (
        <span
          className={styles.sidebarDot}
          style={{ backgroundColor: genre.accent }}
        />
      )}
    </button>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function BookExplorer() {
  const [activeId, setActiveId] = useState<string>(GENRES[0].id);
  const [animKey, setAnimKey] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const active = GENRES.find((g) => g.id === activeId)!;

  function switchGenre(id: string) {
    if (id === activeId) {
      // Re-run the list animation even when the selected category is already active.
      setAnimKey((k) => k + 1);
    } else {
      setActiveId(id);
      setAnimKey((k) => k + 1);
    }
    // scroll list to top on mobile
    listRef.current?.scrollTo({ top: 0 });
  }

  return (
    <div className={styles.shell}>
      {/* ── Sidebar ── */}
      <nav className={styles.sidebar} aria-label="Book categories">
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle}>Categories</span>
          <span className={styles.sidebarCount}>{GENRES.length}</span>
        </div>
        <ul className={styles.sidebarList} role="list">
          {GENRES.map((g) => (
            <li key={g.id}>
              <SidebarItem
                genre={g}
                isActive={g.id === activeId}
                onClick={() => switchGenre(g.id)}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Main panel ── */}
      <main className={styles.panel}>
        {/* Panel header */}
        <header
          className={styles.panelHeader}
          style={{ borderBottomColor: active.accent + "18" }}
        >
          <div className={styles.panelHeadingRow}>
            <span className={styles.panelEmoji} aria-hidden="true">
              {active.emoji}
            </span>
            <h1 className={styles.panelTitle}>{active.label}</h1>
          </div>
          <p className={styles.panelMeta}>
            <span
              className={styles.panelBadge}
              style={{
                backgroundColor: active.accentMuted,
                color: active.accentText,
              }}
            >
              10 essential reads
            </span>
          </p>
        </header>

        {/* Book list */}
        <ul
          key={animKey}
          ref={listRef}
          className={styles.bookList}
          role="list"
          aria-label={`Top 10 ${active.label} books`}
        >
          {active.books.map((book, i) => (
            <BookRow
              key={book.title}
              book={book}
              rank={i + 1}
              accent={active.accent}
              accentMuted={active.accentMuted}
              accentText={active.accentText}
              animDelay={i * 40}
            />
          ))}
        </ul>

        {/* Footer */}
        <footer className={styles.panelFooter}>
          <span>120 books across 12 categories</span>
        </footer>
      </main>
    </div>
  );
}
