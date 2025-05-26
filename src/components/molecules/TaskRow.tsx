import React from "react";
import { Task } from "../../types";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";

interface TaskRowProps {
	task: Task;
	onComplete: (id: string) => void;
	onDelete: (id: string) => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({
	task,
	onComplete,
	onDelete,
}) => {
	return (
		<tr className={`task-row ${task.completed ? "completed" : ""}`}>
			<td>{task.title}</td>
			<td>{task.description}</td>
			<td>
				<Badge priority={task.priority} />
			</td>
			<td>
				<div className="task-actions">
					{!task.completed && (
						<Button variant="complete" onClick={() => onComplete(task.id)}>
							✓
						</Button>
					)}
					<Button variant="delete" onClick={() => onDelete(task.id)}>
						×
					</Button>
				</div>
			</td>
		</tr>
	);
};
