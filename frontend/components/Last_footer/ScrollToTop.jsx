"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Automatically scrolls the window to the top whenever the route changes,
// so navigating between footer pages always starts at the top.
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
