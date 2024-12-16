import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // Stores products added to the cart
  totalQuantity: 0, // Number of items in the cart
  totalPrice: 0, // Total price of the cart
  // totalPrice:0,
  // subTotal:0,
  // itemsCount:0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = { ...action.payload, quantity: action.payload.quantity || 1 }; 
      const existingItem = state.cartItems.find(item => item.id === newItem.id);
    
      if (existingItem) {
        existingItem.quantity += newItem.quantity; // Update quantity
        existingItem.totalPrice = parseFloat(existingItem.price) * existingItem.quantity; // Ensure numeric multiplication
      } else {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          price: parseFloat(newItem.price), // Ensure price is a number
          quantity: newItem.quantity,
          totalPrice: parseFloat(newItem.price) * newItem.quantity, // Calculate initial total price
          Image: newItem.Image,
          Description: newItem.Description,
        });
      }
    
      state.totalQuantity += newItem.quantity;
      state.totalPrice = state.cartItems.reduce((total, item) => total + item.totalPrice, 0); // Recalculate total price
    },
    
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;

        state.cartItems = state.cartItems.filter(item => item.id !== id);
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    decrementItemQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);

      if (existingItem) {
        // Reduce the quantity
        existingItem.quantity -= 1;
        existingItem.totalPrice = parseFloat(existingItem.price) * existingItem.quantity;

        // If quantity reaches 0, remove the item
        if (existingItem.quantity <= 0) {
          state.cartItems = state.cartItems.filter(item => item.id !== id);
        }

        // Update cart totals
        state.totalQuantity -= 1;
        state.totalPrice = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart,decrementItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
