import React from "react";

const categories = [
  { name: "Wallets", img: "/images/wallet2.png", link: "#" },
  { name: "Women Shoes", img: "/images/shoes8.png", link: "#" },
  { name: "Women's Clothing", img: "/images/shirts25.png", link: "#" },
  { name: "Jewellery", img: "/images/bangles2.png", link: "#" },
  { name: "Men's Sweaters", img: "/images/sweaters4.png", link: "#" },
  { name: "Women Jackets", img: "/images/jackets39.png", link: "#" },
  { name: "Bags", img: "/images/bags10.png", link: "#" },
  { name: "Men Jeans", img: "/images/jeans7.png", link: "#" },
  { name: "Perfumes", img: "/images/perfumes15.png", link: "#" },
];

const Categories = () => {
  return (
    <div className="flex overflow-x-auto space-x-6 py-4 px-4">
      {categories.map((category, index) => (
        <a
          key={index}
          href={category.link}
          className="flex flex-col items-center space-y-2 text-center"
        >
          <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
            <img
              src={category.img}
              alt={category.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <p className="text-sm font-medium text-gray-700">{category.name}</p>
        </a>
      ))}
    </div>
  );
};

export default Categories;
