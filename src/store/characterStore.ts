import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Character {
	level: number;
	experience: number;
	experienceToNextLevel: number;
	title: string;
}

interface CharacterStore {
	character: Character;
	gainExperience: (amount: number) => void;
	resetCharacter: () => void;
}

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

const initialState: Character = {
	level: 1,
	experience: 0,
	experienceToNextLevel: 100,
	title: "Novice",
};

export const useCharacterStore = create<CharacterStore>()(
	persist(
		(set, get) => ({
			character: initialState,

			gainExperience: (amount) => {
				console.log("Gaining experience:", amount);
				const { character } = get();
				let newExperience = character.experience + amount;
				let newLevel = character.level;
				let newExperienceToNextLevel = character.experienceToNextLevel;

				while (newExperience >= newExperienceToNextLevel) {
					newExperience -= newExperienceToNextLevel;
					newLevel += 1;
					newExperienceToNextLevel = calculateExperienceToNextLevel(newLevel);
				}

				const newCharacter = {
					level: newLevel,
					experience: newExperience,
					experienceToNextLevel: newExperienceToNextLevel,
					title: calculateTitle(newLevel),
				};

				console.log("New character state:", newCharacter);
				set({ character: newCharacter });
			},

			resetCharacter: () => {
				set({ character: initialState });
			},
		}),
		{
			name: "character-storage",
			version: 1,
			partialize: (state) => ({ character: state.character }),
		}
	)
);
