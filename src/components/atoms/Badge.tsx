import React from "react";
import { TaskPriority } from "../../types";

interface BadgeProps {
	priority: TaskPriority;
}

export const Badge: React.FC<BadgeProps> = ({ priority }) => {
	const getPriorityColor = (priority: TaskPriority): string => {
		switch (priority) {
			case "Urgente":
				return "priority-urgent";
			case "Modéré":
				return "priority-moderate";
			case "Secondaire":
				return "priority-low";
		}
	};

	return (
		<span className={`priority-badge ${getPriorityColor(priority)}`}>
			{priority}
		</span>
	);
};
