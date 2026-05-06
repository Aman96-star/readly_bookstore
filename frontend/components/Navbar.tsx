// components/Navbar.jsx

import Link from "next/link";

export default function Navbar() {
  return (
     <nav className="bg-green-600 text-white">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Left Section */}
        <div>
          <h1 className="text-2xl font-bold">
            Readly
          </h1>
        </div>

        {/* Center Section */}
        <div>
          <ul className="flex gap-6 text-lg">

            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/books">Books</Link>
            </li>

            <li>
              <Link href="/categories">Categories</Link>
            </li>

          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search books..."
            className="px-3 py-1 rounded text-black"
          />

          {/* Cart Button */}
          <button className="bg-white text-green-600 px-4 py-1 rounded">
            Cart
          </button>

          {/* Login Button */}
          <button className="bg-black px-4 py-1 rounded">
            Login
          </button>

        </div>

      </div>

     
    </nav>
  );
}