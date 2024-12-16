import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  // Define menu items with paths
  const menuItems = [
    { name: "Dashboard", path: "/admin/AdminDashboard" },
    { name: "Add Products", path: "/admin/addproduct" },
    { name: "Remove Products", path: "/remove-products" },
    { name: "Order Lists", path: "/order-lists" },
    { name: "Product Stock", path: "/product-stock" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-100 shadow-md p-4">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Admin SideBar</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="text-gray-700 py-2 px-4 hover:bg-[#29339B] hover:text-white rounded-md cursor-pointer">
            <Link to={item.path} className="block w-full h-full">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


