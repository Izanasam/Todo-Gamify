import { HomePage } from "./pages/HomePage";
import "./App.css";
import { InstallPWA } from "./components/atoms/InstallPWA";

function App() {
	return (
		<>
			<div className="app-container">
				<HomePage />
			</div>
			<InstallPWA />
		</>
	);
}

export default App;
