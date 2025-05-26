export interface Task {
	id: string;
	title: string;
	completed: boolean;
	difficulty: "easy" | "medium" | "hard";
	experience: number;
}

export interface Character {
	level: number;
	experience: number;
	health: number;
	maxHealth: number;
	gold: number;
	inventory: string[];
}
