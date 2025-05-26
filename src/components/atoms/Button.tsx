import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "complete" | "delete";
	children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	children,
	className = "",
	...props
}) => {
	return (
		<button className={`retro-button ${variant} ${className}`} {...props}>
			{children}
		</button>
	);
};
