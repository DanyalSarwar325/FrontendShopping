import React from "react";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md px-6 py-4   " >
      <input type="text" placeholder="Search" className="border rounded-md px-4 py-2 w-1/3" />
      <div className="flex items-center gap-4">
        <span className="text-sm">English</span>
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

