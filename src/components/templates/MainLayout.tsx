import React from "react";

interface MainLayoutProps {
	children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<div className="app-container">
			<header className="retro-header">
				<h1 className="retro-title">To-Do List Game</h1>
			</header>

			<main className="main-content">{children}</main>

			<footer className="retro-footer">
				<p>© 2025 To-Do List Game - Version 1.0</p>
			</footer>
		</div>
	);
};
