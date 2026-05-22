import Image from "next/image";
import Link from "next/link";

// Navigation Links Configuration
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/categories", label: "Categories" },
];

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Section - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="transition-transform hover:scale-105">
              <Image 
                src="/Images/readly_logo.png"
                alt="Readly Logo"
                width={250}
                height={160}
                priority
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <ul className="flex gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-lg font-medium hover:text-green-100 transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Search, Cart & Auth */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Bar */}
            <div className="hidden sm:flex">
              <input
                type="text"
                placeholder="Search books..."
                className="px-4 py-2 rounded-l-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-r-lg transition-colors duration-200">
                🔍
              </button>
            </div>

            {/* Cart Button */}
            <button className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 whitespace-nowrap">
              🛒 Cart
            </button>

            {/* Login Button */}
            <button className="bg-black hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors duration-200 font-semibold whitespace-nowrap">
              Login
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}