import React, { useState, useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";

const difficultyOptions = [
	{ value: "easy", label: "Facile" },
	{ value: "medium", label: "Moyen" },
	{ value: "hard", label: "Difficile" },
];

export const TaskForm: React.FC = () => {
	const [title, setTitle] = useState("");
	const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
		"medium"
	);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
	const addTask = useGameStore((state) => state.addTask);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 576);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		addTask({
			title: title.trim(),
			description: "",
			priority: "Modéré",
			difficulty: "medium",
		});
		setTitle("");
		setDifficulty("medium");
	};

	return (
		<form onSubmit={handleSubmit} className="task-form">
			<Input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Nouvelle tâche..."
				required
				label={isMobile ? undefined : "Titre"}
			/>
			<Select
				value={difficulty}
				onChange={(e) =>
					setDifficulty(e.target.value as "easy" | "medium" | "hard")
				}
				options={difficultyOptions}
				label={isMobile ? undefined : "Difficulté"}
			/>
			<Button type="submit">{isMobile ? "Ajouter" : "Ajouter la tâche"}</Button>
		</form>
	);
};
