import { playlist } from "./data/playlist/playlist";
import { AudioPlayer } from "./components";
import styles from "./app.module.scss";

function App() {
	return (
		<div className={styles["app-container"]}>
			<AudioPlayer playlist={playlist} />
		</div>
	);
}

export default App;
