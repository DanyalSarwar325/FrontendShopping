import React, { useState } from 'react';

const ShippingAddress = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        setAddress(inputValue.trim());
        setIsEditing(false);
      }
    }
  };

  const handleEdit = () => {
    setInputValue(address);
    setIsEditing(true);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full  mb-6 ">
      <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

      {isEditing ? (
        <textarea
          className="w-full p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter your full address and press Enter to save..."
        />
      ) : (
        <div className="flex justify-between items-start">
          <div className="whitespace-pre-wrap text-gray-800">
            {address ? address : <span className="text-gray-400 italic">No address added.</span>}
          </div>
          <button
            onClick={address ? handleEdit : () => setIsEditing(true)}
            className="text-blue-600 hover:underline ml-4 whitespace-nowrap"
          >
            {address ? 'Edit address' : 'Add address'}
          </button>
        </div>
      )}

      <p className="mt-4 text-green-600 text-sm">Shipping: FREE</p>
      <p className="text-sm text-gray-500">Delivery: 7-11 business days</p>
      <p className="text-sm text-gray-500">Courier company: Speedaf, FEISU, Leopards, etc.</p>
    </div>
  );
};

export default ShippingAddress;
