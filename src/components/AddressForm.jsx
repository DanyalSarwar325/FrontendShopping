import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {useNavigate } from "react-router-dom";

export const AddressForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;
  console.log(userId);

  const [formData, setFormData] = useState({
    country: "",
    state: "",
    postalcode: "",
    address: "",
    phone: "", // New phone field
    id: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post("/api/v1/update", formData);
      if (response.data.success) {
        toast.success(response.data.message || "Address updated successfully!");
        navigate("/cart", { state: { userId: userId } });
      } else {
        toast.error(response.data.message || "Failed to update address.");
      }
    } catch (error) {
      console.error("Axios Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to update address. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[30%] mx-auto bg-white mt-10 p-6 rounded shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Add a New Address</h2>

      {/* Country Field */}
      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
          Country
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        >
          <option value="">Select Country</option>
          <option value="Pakistan">Pakistan</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
      </div>

      {/* Province Field */}
      <div className="mb-4">
        <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
          Province
        </label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        >
          <option value="">Select Province</option>
          <option value="Sindh">Sindh</option>
          <option value="Punjab">Punjab</option>
          <option value="KPK">Khyber Pakhtunkhwa</option>
          <option value="Balochistan">Balochistan</option>
        </select>
      </div>

      {/* ZIP Code Field */}
      <div className="mb-4">
        <label htmlFor="postalcode" className="block text-gray-700 font-medium mb-2">
          ZIP Code
        </label>
        <input
          type="text"
          id="postalcode"
          name="postalcode"
          value={formData.postalcode}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Enter ZIP Code"
          required
        />
      </div>

      {/* Phone Number Field */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Enter Phone Number"
          required
        />
      </div>

      {/* Address Field */}
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Street, building, house number"
          rows="3"
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-orange-500 text-white text-sm py-2 rounded-lg hover:bg-orange-600 transition"
      >
        Save
      </button>
    </form>
  );
};
