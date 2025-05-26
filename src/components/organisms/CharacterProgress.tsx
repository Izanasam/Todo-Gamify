import React, { useState, useEffect } from "react";
import { useCharacterStore } from "../../store/characterStore";

export const CharacterProgress: React.FC = () => {
	const character = useCharacterStore((state) => state.character);
	const progressPercentage =
		(character.experience / character.experienceToNextLevel) * 100;
	const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

	useEffect(() => {
		console.log("Character state updated:", character);
	}, [character]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 576);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="character-progress">
			<div className="character-info">
				<h2 className="retro-title">Niveau {character.level}</h2>
				<p className="character-title">{character.title}</p>
			</div>
			<div className="experience-bar-container">
				<div
					className="experience-bar"
					style={{ width: `${progressPercentage}%` }}
				/>
				<span className="experience-text">
					{isMobile
						? `${character.experience}/${character.experienceToNextLevel} XP`
						: `${character.experience} / ${character.experienceToNextLevel} XP`}
				</span>
			</div>

			{!isMobile && (
				<div className="character-stats">
					<p>Progression: {Math.round(progressPercentage)}%</p>
					<p>
						XP restant: {character.experienceToNextLevel - character.experience}
					</p>
				</div>
			)}
		</div>
	);
};
