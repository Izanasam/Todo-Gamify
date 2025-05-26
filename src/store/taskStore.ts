import { create } from "zustand";
import { generateId } from "../utils/idGenerator";
import { useCharacterStore } from "./characterStore";

export interface Task {
	id: string;
	title: string;
	completed: boolean;
	difficulty: "easy" | "medium" | "hard";
	experience: number;
}

interface TaskStore {
	tasks: Task[];
	addTask: (title: string, difficulty: "easy" | "medium" | "hard") => void;
	toggleTask: (id: string) => void;
	deleteTask: (id: string) => void;
}

const getExperienceForDifficulty = (
	difficulty: "easy" | "medium" | "hard"
): number => {
	switch (difficulty) {
		case "easy":
			return 10;
		case "medium":
			return 20;
		case "hard":
			return 30;
	}
};

export const useTaskStore = create<TaskStore>((set) => ({
	tasks: [],
	addTask: (title, difficulty) =>
		set((state) => ({
			tasks: [
				...state.tasks,
				{
					id: generateId(),
					title,
					completed: false,
					difficulty,
					experience: getExperienceForDifficulty(difficulty),
				},
			],
		})),
	toggleTask: (id) =>
		set((state) => {
			const task = state.tasks.find((t) => t.id === id);
			if (!task || task.completed) return state;

			// Gagner de l'expérience lors de la complétion d'une tâche
			const characterStore = useCharacterStore.getState();
			if (characterStore) {
				characterStore.gainExperience(task.experience);
			}

			return {
				tasks: state.tasks.map((task) =>
					task.id === id ? { ...task, completed: !task.completed } : task
				),
			};
		}),
	deleteTask: (id) =>
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== id),
		})),
}));
