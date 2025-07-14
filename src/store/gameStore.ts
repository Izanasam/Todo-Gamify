import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameState, Task } from "../types";

const calculateExperienceToNextLevel = (level: number) => {
	return Math.floor(100 * Math.pow(1.5, level - 1));
};

const calculateTitle = (level: number): string => {
	if (level < 5) return "Novice";
	if (level < 10) return "Apprenti";
	if (level < 15) return "Adepte";
	if (level < 20) return "Expert";
	return "Maître";
};

const getExperienceForTask = (priority: Task["priority"]): number => {
	switch (priority) {
		case "Urgente":
			return 50;
		case "Modéré":
			return 30;
		case "Secondaire":
			return 15;
	}
};

interface GameStore extends GameState {
	addTask: (task: Omit<Task, "id" | "createdAt" | "completed">) => void;
	completeTask: (taskId: string) => void;
	deleteTask: (taskId: string) => void;
	updateTask: (taskId: string, updates: Partial<Task>) => void;
}

export const useGameStore = create<GameStore>()(
	persist(
		(set, get) => ({
			tasks: [],
			character: {
				level: 1,
				experience: 0,
				experienceToNextLevel: 100,
				title: "Novice",
			},

			addTask: (taskData) => {
				const newTask: Task = {
					...taskData,
					id: crypto.randomUUID(),
					createdAt: new Date(),
					completed: false,
				};
				set((state) => ({ tasks: [...state.tasks, newTask] }));
			},

			completeTask: (taskId) => {
				const task = get().tasks.find((t) => t.id === taskId);
				if (!task || task.completed) return;

				const experienceGained = getExperienceForTask(task.priority);
				const { character } = get();
				let newExperience = character.experience + experienceGained;
				let newLevel = character.level;
				let newExperienceToNextLevel = character.experienceToNextLevel;

				while (newExperience >= newExperienceToNextLevel) {
					newExperience -= newExperienceToNextLevel;
					newLevel += 1;
					newExperienceToNextLevel = calculateExperienceToNextLevel(newLevel);
				}

				set((state) => ({
					tasks: state.tasks.map((t) =>
						t.id === taskId ? { ...t, completed: true } : t
					),
					character: {
						level: newLevel,
						experience: newExperience,
						experienceToNextLevel: newExperienceToNextLevel,
						title: calculateTitle(newLevel),
					},
				}));
			},

			deleteTask: (taskId) => {
				set((state) => ({
					tasks: state.tasks.filter((t) => t.id !== taskId),
				}));
			},

			updateTask: (taskId, updates) => {
				set((state) => ({
					tasks: state.tasks.map((t) =>
						t.id === taskId ? { ...t, ...updates } : t
					),
				}));
			},
		}),
		{
			name: "todo-game-storage",
		}
	)
);
