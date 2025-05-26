import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Todo Game",
				short_name: "TodoGame",
				description: "Une application de gestion de tâches gamifiée",
				theme_color: "#ff6b6b",
				background_color: "#ffffff",
				display: "standalone",
				orientation: "portrait",
				start_url: "/",
				icons: [
					{
						src: "/icons/icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any maskable",
					},
					{
						src: "/icons/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,png,svg,json,webmanifest}"],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365,
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
			includeAssets: ["**/*"],
			strategies: "generateSW",
			devOptions: {
				enabled: true,
				type: "module",
			},
		}),
	],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
			},
			output: {
				manualChunks: {
					vendor: ["react", "react-dom"],
				},
			},
		},
		outDir: "dist",
		assetsDir: "assets",
		emptyOutDir: true,
	},
	server: {
		host: true,
		port: 4175,
		strictPort: true,
	},
	preview: {
		host: true,
		port: 4175,
		strictPort: true,
	},
	base: "/",
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
});
