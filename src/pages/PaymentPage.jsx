// PaymentPage.js
import React, { useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

// Load Stripe
const stripePromise = loadStripe("your-publishable-key-here");

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { totalPrice } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      setErrorMessage("Stripe has not loaded properly. Please try again.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      // Backend call to create payment intent
      const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice * 100 }), // Stripe works in cents
      });

      const { clientSecret } = await response.json();

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: "Customer Name", // Replace with actual customer name
          },
        },
      });

      if (paymentResult.error) {
        setErrorMessage(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
      }
    } catch (error) {
      setErrorMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow text-center">
          <h1 className="text-xl font-bold text-green-500">Payment Successful!</h1>
          <p className="mt-4">Thank you for your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-full max-w-md" onSubmit={handlePayment}>
        <h1 className="text-xl font-bold mb-4">Payment</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Card Number</label>
          <div className="border border-gray-300 p-2 rounded">
            <CardNumberElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date</label>
            <div className="border border-gray-300 p-2 rounded">
              <CardExpiryElement options={{ style: { base: { fontSize: "16px" } } }} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">CVC</label>
            <div className="border border-gray-300 p-2 rounded">
              <CardCvcElement options={{ style: { base: { fontSize: "16px" } } }} />
            </div>
          </div>
        </div>

        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        <button
          type="submit"
          className={`w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : `Pay ₹${totalPrice}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
