import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md max-w-[100%]">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <div className="bg-orange-500 text-white font-bold p-2 rounded">
          TEMU
        </div>
        <ul className="hidden md:flex space-x-4 text-gray-700">
          <li className="hover:text-orange-500 cursor-pointer">Best Sellers</li>
          <li className="hover:text-orange-500 cursor-pointer">5-Star Rated</li>
          <li className="hover:text-orange-500 cursor-pointer">Great Friday</li>
          <li className="hover:text-orange-500 cursor-pointer">New Arrivals</li>
        </ul>
      </div>

      {/* Search Section */}
      <div className="flex items-center space-x-2 w-full max-w-md">
        <select
          className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-l-md text-gray-700"
        >
          <option>Categories</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-3 py-1 border border-gray-300 focus:outline-none"
        />
        <button className="px-4 py-1 bg-black text-white rounded-r-md">
          Search
        </button>
      </div>

      {/* Utility Links */}
      <div className="flex items-center space-x-4 text-gray-700">
       
        <button className="hover:text-orange-500">Support</button>
        <div className="relative">
          <button className="hover:text-orange-500">EN</button>
        </div>
        <div className="relative">
          <button className="hover:text-orange-500">
            <Link to={'/cart'}><span><i class="fa-solid fa-cart-shopping" ></i></span></Link>
            <span className="absolute top-[-7px] right-2  bg-orange-500 text-white text-xs rounded-full px-1">
            ({totalQuantity})
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
