import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ShippingAddress = ({ ID }) => {
  const [shippingAddress, setShippingAddress] = useState({});

  useEffect(() => {
    const fetchShippingAddress = async () => {
      try {
        const response = await axios.post("/api/v1/findUser", { ID });
        setShippingAddress(response.data.user || {});
      } catch (error) {
        console.error("Error while fetching shipping address:", error);
        toast.error("Something went wrong. Please try again.");
      }
    };

    if (ID) {
      fetchShippingAddress();
    }
  }, [ID]);

  const { name, addresses } = shippingAddress || {};
  const address = addresses && addresses.length > 0 ? addresses[0] : null;
  const  phone = address?.phone


  return (
    <div className="bg-white p-6 mb-6 rounded shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Shipping address</h2>
        <button className="text-blue-500 hover:underline">Change address</button>
      </div>
      <div className="mt-4 text-sm">
        <p className="font-medium">{name || "Name not available"}</p>
        {address ? (
          <p>
             {address.address},
          </p>
        ) : (
          <p>Address not available</p>
        )}

{address ? (
          <p>
             {address.phone},
          </p>
        ) : (
          <p>Phone Number not available</p>
        )}
       
        {address ? (
          <p>
            {address.state}, {address.postalcode}, {address.country}
          </p>
        ) : (
          <p>Address details not available</p>
        )}
      </div>
      <p className="text-green-500 text-sm mt-4">Shipping: FREE</p>
      <p className="text-sm mt-1">
        Delivery: 7-11 business days
        <br />
        <span className="text-gray-500">
          Courier company: Speedaf, FEISU, Leopards, etc.
        </span>
      </p>
    </div>
  );
};
