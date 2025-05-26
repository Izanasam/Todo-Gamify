import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

interface SyncManager {
	register(tag: string): Promise<void>;
}

interface ServiceWorkerRegistrationWithSync extends ServiceWorkerRegistration {
	sync: SyncManager;
}

// Enregistrement du Service Worker
if ("serviceWorker" in navigator) {
	window.addEventListener("load", async () => {
		try {
			const registration = (await navigator.serviceWorker.register(
				"/service-worker.js"
			)) as ServiceWorkerRegistrationWithSync;

			console.log("ServiceWorker enregistré avec succès:", registration);

			// Demander la permission pour la synchronisation en arrière-plan
			if ("sync" in registration) {
				const permission = await navigator.permissions.query({
					name: "background-sync" as PermissionName,
				});

				if (permission.state === "granted" && registration.sync) {
					await registration.sync.register("sync-tasks");
				}
			}
		} catch (error) {
			console.error("Erreur lors de l'enregistrement du ServiceWorker:", error);
		}
	});
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
