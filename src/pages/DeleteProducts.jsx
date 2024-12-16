import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { toast } from "react-toastify"; // For error notifications (optional)

export const DeleteProducts = () => {
  const [productData, setProductData] = useState([]); // Initialize as an empty array

  // Log product data when it changes (only when productData is updated)
  useEffect(() => {
    console.log("Updated productData:", productData);
  }, [productData]); // This will run every time productData is updated

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/v1/products"); // API call
        console.log("API Response:", response.data);
        const data=response.data
        console.log(data);
        

        // Assuming API returns products in response.data.products
        if (response.data && Array.isArray(response.data)) {
          setProductData(data); // Set product data if it's an array
        } else {
          setProductData([]); // Default to empty array if no products or invalid data
        }
      } catch (error) {
        console.error("Error while fetching products:", error);
        toast.error("Something went wrong. Please try again.");
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle product deletion
  const handleDelete = async (id) => {
    try {
        console.log(id);
        
      // Call delete endpoint to remove the product on the server
      await axios.delete(`/api/v1/products/${id}`);

      // Update local state to remove the product from UI
      const updatedProducts = productData.filter((product) => product._id !== id);
      setProductData(updatedProducts);

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <table className="w-full border-collapse shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">SubCategory</th>
            <th className="border px-4 py-2">Tag</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {productData.length > 0 ? (
            productData.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 text-gray-600 text-center"
              >
                <td className="border px-4 py-2">{product.Name}</td>
                <td className="border px-4 py-2">{product.Price}</td>
                <td className="border px-4 py-2">{product.subCategory}</td>
                <td className="border px-4 py-2">{product.Tag}</td>
                <td className="border px-4 py-2">{product.Category}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center text-gray-500 py-4"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-500">
          Showing data 1 to {productData.length} of 256K entries
        </p>
        <div className="space-x-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            1
          </button>
          <button className="px-3 py-1 border rounded bg-blue-500 text-white">
            2
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            3
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            ...
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            40
          </button>
        </div>
      </div>
    </div>
  );
};
