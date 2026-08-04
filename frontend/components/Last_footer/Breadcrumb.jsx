import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

// Dynamic breadcrumb trail. Pass an array of { label, href } items
// representing the path below Home. The last item is treated as the
// current page and is not linked.
export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
      <Link
        href="/"
        className="flex items-center gap-1 text-white/80 transition-colors hover:text-white"
      >
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-white/50" aria-hidden="true" />
            {isLast || !item.href ? (
              <span className="font-medium text-white" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-white/80 transition-colors hover:text-white">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
