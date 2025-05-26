import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export const Input: React.FC<InputProps> = ({
	label,
	error,
	className = "",
	...props
}) => {
	return (
		<div className="input-container">
			{label && <label className="retro-label">{label}</label>}
			<input
				className={`retro-input ${className} ${error ? "error" : ""}`}
				{...props}
			/>
			{error && <span className="error-message">{error}</span>}
		</div>
	);
};
