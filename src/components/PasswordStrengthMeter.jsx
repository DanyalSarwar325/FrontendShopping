import { Check, X } from "lucide-react";

export const PasswordStrengthMeter = ({ password }) => {
	const criteria = [
		{ label: "At least 6 characters", met: password.length >= 6 },
		{ label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
		{ label: "Contains lowercase letter", met: /[a-z]/.test(password) },
		{ label: "Contains a number", met: /\d/.test(password) },
		{ label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
	];

	return (
		<div className='mt-2 space-y-1'>
			{criteria.map((item) => (
				<div key={item.label} className='flex items-center text-xs'>
					{item.met ? (
						<Check className='size-4 text-green-700 mr-2' /> // Dark green color for met conditions
					) : (
						<X className='size-4 text-green-700 mr-2' />
					)}
					<span
						className={`font-bold ${item.met ? "text-green-700" : "text-gray-400"}`} // Bold text always, green if condition is met
					>
						{item.label}
					</span>
				</div>
			))}
		</div>
	);
};


