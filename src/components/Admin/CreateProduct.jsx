import axios from "axios";
import React, { useState } from "react";
import {toast} from 'react-toastify';


export const CreateProduct = () => {
  const [product, setProduct] = useState({
    Name: "",
    Rating:"",
    Description: "",
    Price:"",
    Tag: "",
    Category: "",
    Image: null,
    subImages: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "Image" ? files[0] : Array.from(files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("Name", product.Name);
      formData.append("Rating", product.Rating);
      formData.append("Description", product.Description);
      formData.append("Price", product.Price);
      formData.append("Tag", product.Tag);
      formData.append("Category", product.Category);
      if (product.Image) {
        formData.append("Image", product.Image);
      }

      product.subImages.forEach((file) => {
        formData.append("subImages", file);
      });
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
console.log(product);

      // Send API request
      const response = await axios.post('/api/v1/addProducts', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Product added successfully!");
      toast.success("Product added successfully!");
      setProduct({
        Name: "",
        Rating: "",
        Description: "",
        Price: "",
        Tag: "Regular",
        Category: "",
        Image: null,
        subImages: [],
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to add product. Please try again.");
      setError("Failed to add product. Please try again.",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}

        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="Name"
            value={product.Name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Rating</label>
          <input
            type="number"
            name="Rating"
            value={product.Rating}
            onChange={handleChange}
            min="0"
            max="5"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="Description"
            value={product.Description}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            name="Price"
            value={product.Price}
            onChange={handleChange}
            min="0"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Tag</label>
          <select
            name="Tag"
            value={product.Tag}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Regular">Regular</option>
            <option value="Featured">Featured</option>
            <option value="Sale">Sale</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            type="text"
            name="Category"
            value={product.Category}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Main Image</label>
          <input
            type="file"
            name="Image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Additional Images</label>
          <input
            type="file"
            name="subImages"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button

          type="submit"
          onClick={handleSubmit}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};


