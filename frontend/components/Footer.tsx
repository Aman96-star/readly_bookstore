
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white mt-10">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Left Section */}
        <div className="md:col-span-2">

          <h1 className="text-3xl font-bold mb-4">
            Readly
          </h1>

          <p className="text-sm leading-7">
            Readly Bookstore brings book lovers together to
            discover amazing books, explore new genres,
            and enjoy reading anytime.
          </p>

          <div className="mt-6 space-y-2">
            <p>support@readly.com</p>
            <p>+91 98765 43210</p>
          </div>

        </div>

        {/* Category */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Category
          </h2>

          <ul className="space-y-2">

            <li>
              <Link href="/">Fiction</Link>
            </li>

            <li>
              <Link href="/">Self Help</Link>
            </li>

            <li>
              <Link href="/">Educational</Link>
            </li>

            <li>
              <Link href="/">Comics</Link>
            </li>

          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Useful Links
          </h2>

          <ul className="space-y-2">

            <li>
              <Link href="/">Privacy Policy</Link>
            </li>

            <li>
              <Link href="/">Terms & Conditions</Link>
            </li>

            <li>
              <Link href="/">Shipping Policy</Link>
            </li>

            <li>
              <Link href="/">Returns</Link>
            </li>

          </ul>
        </div>

        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            About
          </h2>

          <ul className="space-y-2">

            <li>
              <Link href="/">About Us</Link>
            </li>

            <li>
              <Link href="/">Contact</Link>
            </li>

            <li>
              <Link href="/">Blogs</Link>
            </li>

            <li>
              <Link href="/">Careers</Link>
            </li>

          </ul>
        </div>

      </div>

      {/* Popular Searches */}
      <div className="max-w-7xl mx-auto px-6 pb-8">

        <h2 className="text-2xl font-bold mb-5">
          Popular Searches
        </h2>

        <div className="flex flex-wrap gap-3">

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-green-600 transition">
            New Arrivals
          </button>

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-green-600 transition">
            Best Sellers
          </button>

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-green-600 transition">
            Romance
          </button>

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-green-600 transition">
            Mystery
          </button>

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-green-600 transition">
            Self Help
          </button>

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-green-600 transition">
            Educational
          </button>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-green-400">

        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">

          <p className="text-sm">
            © 2026 Readly. All Rights Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">

            <div className="bg-white text-green-600 w-8 h-8 rounded-full flex items-center justify-center">
              f
            </div>

            <div className="bg-white text-green-600 w-8 h-8 rounded-full flex items-center justify-center">
              in
            </div>

            <div className="bg-white text-green-600 w-8 h-8 rounded-full flex items-center justify-center">
              x
            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}