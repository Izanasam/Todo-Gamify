import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { TaskPriority } from "../types";

export const TaskForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<TaskPriority>("Modéré");
	const addTask = useGameStore((state) => state.addTask);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		addTask({
			title: title.trim(),
			description: description.trim(),
			priority,
		});

		setTitle("");
		setDescription("");
		setPriority("Modéré");
	};

	return (
		<form onSubmit={handleSubmit} className="task-form">
			<div className="form-group">
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Nouvelle tâche..."
					className="retro-input"
					required
				/>
			</div>
			<div className="form-group">
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description (optionnelle)"
					className="retro-textarea"
				/>
			</div>
			<div className="form-group">
				<select
					value={priority}
					onChange={(e) => setPriority(e.target.value as TaskPriority)}
					className="retro-select"
				>
					<option value="Urgente">Urgente</option>
					<option value="Modéré">Modéré</option>
					<option value="Secondaire">Secondaire</option>
				</select>
			</div>
			<button type="submit" className="retro-button">
				Ajouter la tâche
			</button>
		</form>
	);
};
