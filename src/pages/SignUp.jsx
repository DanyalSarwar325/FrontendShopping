import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const SignUp = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      const response = await axios.post(
        "http://localhost:5000/api/v1/register",
        formData
      );
      toast.success(response.data.message); // Show success toast
      navigate("/verify");
    } catch (error) {
      console.error(error.response?.data || "Error occurred");
      toast.error(error.response?.data?.message || "Failed to register"); // Show error toast
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[500px] rounded-lg bg-white p-10 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Welcome to My Daraz
        </h1>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Log in
          </Link>
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
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Username */}
          <div className="mt-4">
            <label htmlFor="username" className="block text-sm text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="name"
              className="mt-2 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Enter your username"
              value={formData.name}
              onChange={handleChange}
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
                name="password"
                className="w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              	<PasswordStrengthMeter password={formData.password} /> 
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
           
          </div>

          

          {/* Terms */}
          <p className="mt-4 text-xs text-gray-600">
            By creating an account, you agree to the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-6 w-full rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none"
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};
