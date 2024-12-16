import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/login",
        { email, password },
        { withCredentials: true } // Includes cookies in the request
      );

      if (response.status === 200) {
        // Show success toast
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle error and show error toast
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message); // Display error message from server
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[400px] rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Log In</h1>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Create one
          </a>
        </p>

        <form className="mt-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-2 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-6 w-full rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
