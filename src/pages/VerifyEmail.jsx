import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
export const EmailVerificationPage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	// Handle input change
	const handleChange = (index, value) => {
		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		// Move focus to the next input if a digit is entered
		if (value && index < 5) {
			document.getElementById(`input-${index + 1}`).focus();
		}
	};

	// Handle backspace
	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			document.getElementById(`input-${index - 1}`).focus();
		}
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const verificationCode = code.join("");

		try {
      // Send the verification code to the server
     await axios.post("/api/v1/verify", { verificationCode });

      // Redirect to the login page
      navigate("/login");
    }
    catch (error) {
      setError("Invalid verification code. Please try again.");
      setIsLoading(false); 
    }
		
	};

	return (
		<div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8">
			<h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Verify Your Email</h2>
			<p className="text-center text-gray-700 mb-6">Enter the 6-digit code sent to your email address.</p>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="flex justify-between">
					{code.map((digit, index) => (
						<input
							key={index}
							id={`input-${index}`}
							type="text"
							maxLength="1"
							value={digit}
							onChange={(e) => handleChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							className="w-12 h-12 text-center text-2xl font-bold bg-gray-100 text-gray-800 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
						/>
					))}
				</div>
				{error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
				<button
					type="submit"
					disabled={isLoading || code.some((digit) => !digit)}
					className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 disabled:opacity-50"
				>
					{isLoading ? "Verifying..." : "Verify Code"}
				</button>
			</form>
		</div>
	);
};


