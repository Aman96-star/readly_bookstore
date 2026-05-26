import { Suspense } from "react";
import BookExplorer from "@/components/BookExplorer";

export const metadata = {
  title: "Categories",
  description: "Explore books by category",
};

export default function CategoriesPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily: "DM Sans, Geist, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 900, marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 700,
            color: "#0f1117",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Categories
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#6b7280",
            margin: "4px 0 0",
          }}
        >
          Browse top books across all genres.
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: 900 }}>
        <Suspense fallback={null}>
          <BookExplorer />
        </Suspense>
      </div>
    </main>
  );
}
