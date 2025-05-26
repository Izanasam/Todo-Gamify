import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createCombinedStore } from "./middleware";

export const useStore = create(
	persist((set, get) => createCombinedStore(set, get), {
		name: "todo-game-storage",
		version: 1,
	})
);
