import React from "react";
import { MainLayout } from "../components/templates/MainLayout";
import { CharacterProgress } from "../components/organisms/CharacterProgress";
import { TaskForm } from "../components/molecules/TaskForm";
import { TaskList } from "../components/organisms/TaskList";

export const HomePage: React.FC = () => {
	return (
		<MainLayout>
			<CharacterProgress />

			<section className="task-section">
				<h2 className="retro-subtitle">Nouvelle Tâche</h2>
				<TaskForm />
			</section>

			<section className="task-section">
				<h2 className="retro-subtitle">Liste des Tâches</h2>
				<TaskList />
			</section>
		</MainLayout>
	);
};
