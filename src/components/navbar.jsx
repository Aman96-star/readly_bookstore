import React from "react";
import { FiUser, FiShoppingBag, FiHeart } from "react-icons/fi"; // Import icons from react-icons
import Weblogo from "../assets/images/readly.jpg"

export default function Navbar() {
  return (
    <>
    <div className="w-full h-16 bg-[#393280] flex items-center justify-between px-6">
      <img src={Weblogo} alt="Logo" className="w-32 h-full" />
    

      {/* Search Bar */}
      <form className="max-w-md w-full relative">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-4 h-4 text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
          required
        />
        <button
          type="submit"
          className="absolute right-2.5 bottom-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5"
        >
          Search
        </button>
      </form>

      {/* Account, Cart, Wishlist Section */}
      <div className="flex items-center space-x-6 text-white">
        <div className="flex items-center space-x-2">
          <FiUser className="text-xl" />
          <span className="text-sm font-medium">ACCOUNT</span>
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center space-x-2">
          <FiShoppingBag className="text-xl" />
          <span className="text-sm font-medium">CART: (0$)</span>
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center space-x-2">
          <FiHeart className="text-xl" />
          <span className="text-sm font-medium">WISHLIST</span>
        </div>
      </div>
    </div>
    <div className="div">
        <nav className="w-full ">
      <ul className="flex justify-center items-center gap-6 py-3 text-lg font-semibold text-gray-800">
        {[
          { name: "HOME", active: true },
          { name: "ABOUT US", active: false },
          { name: "BOOKS", active: false },
          { name: "NEW RELEASE", active: false },
          { name: "CONTACT US", active: false },
          { name: "BLOG", active: false },
        ].map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && <span className="m-2 text-gray-400">|</span>}
            <a
              href="#"
              className={`${
                item.active ? "text-red-600" : "text-gray-800"
              } hover:text-blue-600 transition duration-200`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    </div>
    </>
  );
}
