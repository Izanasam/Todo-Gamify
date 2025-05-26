import { Task, Character } from "../types";

interface CombinedStore {
	tasks: Task[];
	character: Character;
	addTask: (task: Omit<Task, "id" | "completed">) => void;
	toggleTask: (id: string) => void;
	deleteTask: (id: string) => void;
	updateCharacter: (character: Partial<Character>) => void;
}

export const createCombinedStore = (set: any, get: any): CombinedStore => ({
	tasks: [],
	character: {
		level: 1,
		experience: 0,
		health: 100,
		maxHealth: 100,
		gold: 0,
		inventory: [],
	},

	addTask: (task) => {
		const newTask = {
			...task,
			id: crypto.randomUUID(),
			completed: false,
		};

		set((state: CombinedStore) => ({
			tasks: [...state.tasks, newTask],
		}));
	},

	toggleTask: (id) => {
		set((state: CombinedStore) => {
			const updatedTasks = state.tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			);

			const completedTasks = updatedTasks.filter(
				(task) => task.completed
			).length;
			const totalTasks = updatedTasks.length;
			const progress = (completedTasks / totalTasks) * 100;

			// Mise à jour du personnage en fonction de la progression
			const experienceGain = Math.floor(progress / 10);
			const goldGain = Math.floor(progress / 5);

			return {
				tasks: updatedTasks,
				character: {
					...state.character,
					experience: state.character.experience + experienceGain,
					gold: state.character.gold + goldGain,
					level: Math.floor(state.character.experience / 100) + 1,
				},
			};
		});
	},

	deleteTask: (id) => {
		set((state: CombinedStore) => ({
			tasks: state.tasks.filter((task) => task.id !== id),
		}));
	},

	updateCharacter: (character) => {
		set((state: CombinedStore) => ({
			character: { ...state.character, ...character },
		}));
	},
});
