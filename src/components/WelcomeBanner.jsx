import React from "react";

const WelcomeBanner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-100">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <img
            src="/public/images/BG.png" // Replace with your image URL
            alt="Shopping Cart"
            className="mx-auto w-48 h-auto"
          />
        </div>
        <h1 className="text-3xl font-bold mb-4">Welcome to Our CWM Store!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Here you will find unlimited products
        </p>
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          SHOP NOW!
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
