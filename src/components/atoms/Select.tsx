import React from "react";
import { TaskPriority } from "../../types";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
	label,
	error,
	options,
	className = "",
	...props
}) => {
	return (
		<div className="select-container">
			{label && <label className="retro-label">{label}</label>}
			<select
				className={`retro-select ${className} ${error ? "error" : ""}`}
				{...props}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error && <span className="error-message">{error}</span>}
		</div>
	);
};
