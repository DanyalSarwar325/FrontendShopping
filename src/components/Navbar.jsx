import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/logout");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-3 px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <img
              src="/images/Free.png"
              alt="Logo"
              className="w-8 h-8"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg">Styles Sphere</h1>
            <span className="text-sm">Online Shopping</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex items-center space-x-2 w-full sm:w-auto mt-3 sm:mt-0 sm:mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-48 md:w-64 lg:w-80 px-3 py-2 rounded-none border-none focus:ring focus:ring-blue-500 text-black"
          />
          <button className="bg-white text-blue-600 px-3 py-2 rounded-r-md hover:bg-blue-500 hover:text-white transition">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Account, Login, & Cart Section */}
        <div className="flex items-center space-x-4 mt-3 sm:mt-0">
          {/* Login Link */}
          <Link
            to="/login"
            className="text-white hover:text-gray-200 transition"
          >
            Login
          </Link>

          {/* Account Dropdown */}
          <div className="relative group hidden sm:block">
            <button className="flex items-center space-x-1 hover:text-gray-200">
              <span>My Account</span>
              <i className="fas fa-caret-down"></i>
            </button>
            <ul className="absolute hidden group-hover:block bg-white text-gray-700 rounded shadow-lg mt-2 w-40">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link to="/orders">Orders</Link>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Log Out
              </li>
            </ul>
          </div>

          {/* Cart Button */}
          <div className="relative">
            <Link
              to="/cart"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <i className="fas fa-shopping-cart"></i>
              <span className="hidden sm:inline">Cart</span>
            </Link>
            {totalQuantity > 0 && (
              <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs rounded-full px-2">
                {totalQuantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
