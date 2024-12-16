import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";


export const ProductDescription = () => {
  const location = useLocation();
  const { Description, Image, Price, Rating ,orignalPrice,Discount,subImages} = location.state || {};
  console.log(subImages);
  const [MainImage,setMainImage]=useState(Image)
  const handleImageChange=(image)=>{
    setMainImage(image)
  }

   
        
      
    
  // console.log(Description);
  
  
  return (
    
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 mt-7">
      <div className="flex flex-col md:flex-row">
        {/* Left Section: Product Images */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="mb-4">
            <img
              src={MainImage}
              alt="Main Product"
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex gap-2">
  {subImages?.map((itm, index) => (
    <img
      key={index}
      src={itm.img} // Assuming each object in subImages has an `img` property
      alt={`Thumbnail ${index + 1}`}
      className="w-16 h-16 border border-gray-200 rounded-lg cursor-pointer"
      onClick={()=>{
        handleImageChange(itm.img)
      }}
    />
  ))}
</div>
        </div>

        {/* Right Section: Product Details */}
        <div className="md:w-2/3 p-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">
            {Description}
            </h1>
            {/* <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
              Limited-time offer
            </span> */}
          </div>
          <p className="text-gray-500 text-sm mb-4">#1 Best Seller in Women's Canvas Shoes</p>

          <div className="mb-4">
            <span className="text-2xl text-orange-500 font-bold">{Price}</span>
            <span className="text-gray-400 line-through ml-2">6,453</span>
            <span className="bg-yellow-200 text-yellow-700 px-2 py-1 ml-4 rounded">
              -73%
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-4">Free shipping for you</p>

        
          

          

          {/* <div className="mb-6">
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
              Ends in <strong>02:07:35:51</strong>
            </div>
          </div> */}

          <button className="w-full mt-10 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold">
            Add to cart
          </button>
        </div>
      </div>
       {/* Shipping and Features Section */}
       <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="text-green-600 text-xl mr-3">🚚</div>
            <div>
              <strong className="text-green-600">Free shipping on all orders</strong>
              <p className="text-gray-500">Delivery: 7-11 business days</p>
              <p className="text-gray-500">Get a Rs.280 credit for late delivery</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="text-green-600 text-xl mr-3">🔄</div>
            <div>
              <strong className="text-green-600">Free returns · Price adjustment</strong>
              <p className="text-gray-500">Temu's Tree Planting Program (15M+ trees)</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="text-green-600 text-xl mr-3">✅</div>
            <div>
              <strong className="text-green-600">Shopping security</strong>
              <ul className="text-gray-500 list-disc list-inside">
                <li>Safe Payment Options</li>
                <li>Secure logistics</li>
                <li>Secure privacy</li>
                <li>Purchase protection</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  
    
  );
};


