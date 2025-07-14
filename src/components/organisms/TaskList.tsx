import React, { useState, useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { TaskRow } from "../molecules/TaskRow";
import { Task } from "../../types";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";

export const TaskList: React.FC = () => {
	const tasks = useGameStore((state) => state.tasks);
	const completeTask = useGameStore((state) => state.completeTask);
	const deleteTask = useGameStore((state) => state.deleteTask);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const renderMobileView = () => {
		return (
			<div className="task-cards">
				{tasks.map((task) => (
					<div
						key={task.id}
						className={`task-card ${task.completed ? "completed" : ""}`}
					>
						<div className="task-card-header">
							<h3 className="task-card-title">{task.title}</h3>
							<span className={`difficulty-badge ${task.difficulty}`}>
								{task.difficulty === "easy"
									? "Facile"
									: task.difficulty === "medium"
									? "Moyen"
									: "Difficile"}
							</span>
						</div>
						<div className="task-card-actions">
							{!task.completed && (
								<Button variant="complete" onClick={() => completeTask(task.id)}>
									Terminer
								</Button>
							)}
							<Button variant="delete" onClick={() => deleteTask(task.id)}>
								Supprimer
							</Button>
						</div>
					</div>
				))}
			</div>
		);
	};

	const renderDesktopView = () => {
		return (
			<table className="retro-table">
				<thead>
					<tr>
						<th>Tâche</th>
						<th>Difficulté</th>
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
							<td>
								<span className={`difficulty-badge ${task.difficulty}`}>
									{task.difficulty === "easy"
										? "Facile"
										: task.difficulty === "medium"
										? "Moyen"
										: "Difficile"}
								</span>
							</td>
							<td>
								<div className="task-actions">
									{!task.completed && (
										<Button
											variant="complete"
											onClick={() => completeTask(task.id)}
										>
											✓
										</Button>
									)}
									<Button variant="delete" onClick={() => deleteTask(task.id)}>
										×
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return (
		<div className="task-list">
			{tasks.length === 0 ? (
				<p className="no-tasks">Aucune tâche pour le moment</p>
			) : isMobile ? (
				renderMobileView()
			) : (
				renderDesktopView()
			)}
		</div>
	);
};
