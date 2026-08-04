
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#803896] text-white mt-10">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-10">
{/* asdiasd */}
        {/* Left Section */}
        <div className="md:col-span-2">

          <Image
                    src="/Images/readly_logo.png"
                    alt="Readly Logo"
                    width={120}
                    height={50}
                       />

          <p className="text-sm leading-7">
            Readly Bookstore brings book lovers together to
            discover amazing books, explore new genres,
            and enjoy reading anytime.
          </p>

          <div className="mt-6 space-y-2">
            <p>support@readly.com</p>
            <p>+91 9617**809</p>
          </div>

        </div>

        {/* Category */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Category
          </h2>

          <ul className="space-y-2">

            <li>
              <Link href="/books">Books</Link>
            </li>

            <li>
              <Link href="/categories">Categories</Link>
            </li>

            <li>
              <Link href="/featured-video">Featured Video</Link>
            </li>

            <li>
              <Link href="/faq">FAQ</Link>
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
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>

            <li>
              <Link href="/terms-of-use">Terms & Conditions</Link>
            </li>

            <li>
              <Link href="/shipping">Shipping Policy</Link>
            </li>

            <li>
              <Link href="/return">Returns</Link>
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
              <Link href="/about">About Us</Link>
            </li>

            <li>
              <Link href="/contact">Contact</Link>
            </li>

            <li>
              <Link href="/blog">Blogs</Link>
            </li>

            <li>
              <Link href="/career">Careers</Link>
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

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-[#421750] transition">
            New Arrivals
          </button>

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-[#421750] transition">
            Best Sellers
          </button>

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-[#421750] transition">
            Romance
          </button>

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-[#421750] transition">
            Mystery
          </button>

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-[#421750] transition">
            Self Help
          </button>

          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-[#421750] transition">
            Educational
          </button>

        </div>

      </div>
      {/* sdks */}

      {/* Bottom Section */}
      <div className="border-t border-green-400">

        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">

          <p className="text-sm">
            © 2026 Readly. All Rights Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">

            <div className="bg-white text-[#421750] w-8 h-8 rounded-full flex items-center justify-center">
              f
            </div>

            <div className="bg-white text-[#421750] w-8 h-8 rounded-full flex items-center justify-center">
              in
            </div>

            <div className="bg-white text-[#421750] w-8 h-8 rounded-full flex items-center justify-center">
              x
            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}