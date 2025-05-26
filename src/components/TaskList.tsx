import { useGameStore } from "../store/gameStore";
import { TaskPriority } from "../types";

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

export const TaskList = () => {
	const tasks = useGameStore((state) => state.tasks);
	const completeTask = useGameStore((state) => state.completeTask);
	const deleteTask = useGameStore((state) => state.deleteTask);

	return (
		<div className="task-list">
			<table className="retro-table">
				<thead>
					<tr>
						<th>Tâche</th>
						<th>Description</th>
						<th>Priorité</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((task) => (
						<tr
							key={task.id}
							className={`task-row ${task.completed ? "completed" : ""}`}
						>
							<td>{task.title}</td>
							<td>{task.description}</td>
							<td>
								<span
									className={`priority-badge ${getPriorityColor(
										task.priority
									)}`}
								>
									{task.priority}
								</span>
							</td>
							<td>
								<div className="task-actions">
									{!task.completed && (
										<button
											onClick={() => completeTask(task.id)}
											className="retro-button complete"
										>
											✓
										</button>
									)}
									<button
										onClick={() => deleteTask(task.id)}
										className="retro-button delete"
									>
										×
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
