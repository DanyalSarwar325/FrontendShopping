import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setUserId } from "../Store/cartSlice";
import { getUserInfoFromCookies } from "../utils/cookieUtils";
import axios from "axios";
import { toast } from "react-toastify";

const Card = ({ Description, Image, Price, Rating, Name, id, Discount, originalPrice, subImages }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { UserId } = useSelector((state) => state.cart);

  React.useEffect(() => {
    // Set UserId once when the component mounts
    const userIdFromCookies = getUserInfoFromCookies()?._id;
    if (userIdFromCookies) {
      dispatch(setUserId(userIdFromCookies));
    }
  }, [dispatch]);

  const handleAddToCart = async (id) => {
    try {
      // Dispatch the product to Redux store
      dispatch(
        addToCart({
          id,
          name: Name,
          price: Price,
          quantity: 1,
          Image,
          Description,
        })
      );

      console.log("User ID from Redux:", UserId);

      const response = await axios.post("/api/v1/findUser", { ID: UserId });
      const data = response.data.user;

      if (!data) {
        toast.error("User not found!");
        return;
      }

      // Check if user has an address
      // if (!data?.addresses?.length || !data.addresses[0]?.country || !data.addresses[0]?.state) {
      //   // navigate("/address", { state: { userId: UserId } });
      // } else {
        toast.success("Successfully added to cart!");
        navigate("/dashboard", { state: { userId: UserId } });
      
    } catch (error) {
      console.error("Error while adding to cart:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-[250px] p-3 bg-white rounded-lg shadow-lg overflow-hidden border">
      <Link
        className="relative"
        to={{
          pathname: "/productDescription",
        }}
        state={{ Description, Image, Price, Rating, subImages }}
      >
        <img className="w-full h-[200px] object-cover" src={Image} alt={Name} />
        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {Discount}%
        </span>
      </Link>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-700 line-clamp-2">{Description}</h3>
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-lg font-semibold text-green-600">Rs.{Price}</span>
          {/* <span className="text-sm text-gray-500 line-through">{String(originalPrice)}</span> */}
        </div>
        <div className="mt-2 flex items-center text-gray-500 text-sm">
          <span>11K+ sold</span>
        </div>
        <div className="mt-2 flex items-center">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, index) => (
              <svg key={index} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.088 2.24a1 1 0 00-.364 1.118l1.18 3.63c.3.921-.755 1.688-1.538 1.118l-3.088-2.24a1 1 0 00-1.176 0l-3.088 2.24c-.783.57-1.838-.197-1.538-1.118l1.18-3.63a1 1 0 00-.364-1.118l-3.088-2.24c-.783-.57-.381-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.18-3.63z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-gray-600 text-sm">(120)</span>
        </div>
        <button
          className="mt-4 w-full bg-blue-500 text-white text-sm py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => handleAddToCart(id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
