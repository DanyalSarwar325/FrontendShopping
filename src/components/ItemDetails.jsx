import { useSelector } from "react-redux";
import { removeFromCart,addToCart, decrementItemQuantity } from "../Store/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const ItemDetails = () => {
  const items = useSelector((state) => state.cart.cartItems);


  const dispatch=useDispatch();
  const handleDelete=(id)=>{
   dispatch(decrementItemQuantity(id))
  }
  const handleAddToCart = (item) => {
    console.log(item)
    dispatch(
      addToCart({
        id: item.id,
        name: item.Name,
        price: parseFloat(item.Price),
        quantity: Number(1),
        Image:item.Image,
        Description:item.Description // Default quantity
      })
    );
  };
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Item Details</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 border-b pb-4">
            {/* Item Image */}
            <img
              src={item.Image} // Replace with correct image source field
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />

            {/* Item Information */}
            <div className="flex-1">
              <p className="font-medium text-sm">{item.name}</p>
              {/* Description */}
              <p className="text-xs text-gray-500">{item.Description}</p>
              <p className="text-gray-500 text-xs line-through">{item.originalPrice}</p>
              <p className="font-bold text-orange-500 text-sm">{item.price}</p>
              
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center">
              <button className="px-2 py-1 bg-gray-200 rounded"onClick={()=>
                handleDelete(item.id)} >-</button>
              <span className="px-4 text-sm">{item.quantity || 1}</span>
              <button className="px-2 py-1 bg-gray-200 rounded" onClick={()=>{
                handleAddToCart(item)
              }}>+</button>
            </div>

            {/* Delete Icon */}
            <button className="text-gray-500 hover:text-red-500" onClick={()=>{
              handleDelete(item.id)
            }}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
};
