import React from "react";
import { ShippingAddress } from "../components/ShippingAddress";
import {ItemDetails} from '../components/ItemDetails';
import { useSelector,useDispatch } from "react-redux";
import { removeFromCart, } from "../Store/cartSlice";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


 export const CartPage = () => {
    const location = useLocation();
const {UserId}=useSelector((state)=>state.cart)
console.log(UserId);


    
    
    const  navigate  = useNavigate();

    const { cartItems, totalQuantity, totalPrice } = useSelector(state => state.cart);
   console.log(cartItems);
   cartItems.map((itm)=>{
    const Id=itm.id;
    const quantity=itm.qauntity;

   })
   
    const dispatch = useDispatch();
 
  
  
    // const handleRemoveItem = (id) => {
    //   dispatch(removeFromCart(id));
    // };
    const handleCkeckout = () =>
    {

      navigate("/payment", { state: { cartItems, totalPrice } });

    }
    
  
    const handleClearCart = () => {
      dispatch(clearCart());
    };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Side: Shipping and Items */}
        <div className="lg:col-span-2">
          <ShippingAddress  ID={UserId}/>
         
          <ItemDetails />
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Order summary</h2>
          <div className="mb-4">
            <label htmlFor="coupon" className="block text-sm font-medium mb-2">
              Enter coupon code
            </label>
            <div className="flex">
              <input
                id="coupon"
                type="text"
                className="flex-1 border border-gray-300 rounded-l p-2"
              />
              <button className="bg-orange-500 text-white px-4 rounded-r">
                Apply
              </button>
            </div>
          </div>
          <ul className="mb-4 text-sm">
            <li className="flex justify-between">
              <span>Item(s) total:</span>
              <span> Rs: {Number(totalPrice)}</span>
            </li>
          
            <li className="flex justify-between ">
              <span>Subtotal:</span>
              <span>{totalPrice}</span>
            </li>
            <li className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-green-500">FREE</span>
            </li>
          </ul>
          <div className="flex justify-between font-bold text-lg">
            <span>Order total:</span>
            <span>{totalPrice}</span>
          </div>
          <button className="w-full bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-600" onClick={handleCkeckout}>
            Submit order
          </button>
        </div>
      </div>

    </div>
  );
};


