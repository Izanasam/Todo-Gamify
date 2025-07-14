export type TaskPriority = "Urgente" | "Modéré" | "Secondaire";

export interface Task {
	id: string;
	title: string;
	description?: string;
	priority: TaskPriority;
	difficulty: "easy" | "medium" | "hard";
	completed: boolean;
	createdAt: Date;
}

export interface Character {
	level: number;
	experience: number;
	experienceToNextLevel: number;
	title: string;
}

export interface GameState {
	tasks: Task[];
	character: Character;
}
