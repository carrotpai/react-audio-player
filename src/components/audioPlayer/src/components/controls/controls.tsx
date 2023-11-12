import { ImageButton } from "@/shared/components";
import RewindBackIcon from "@/assets/icons/rewind-back.svg";
import PlayIcon from "@/assets/icons/pause-stream.svg";
import PauseIcon from "@/assets/icons/pause.svg";
import styles from "./control.module.scss";

type ControlClickEvent = (e: React.SyntheticEvent<HTMLButtonElement>) => void;

interface ControlsProps {
	audioStatus: "PAUSED" | "PLAYING";
	onNextClick: ControlClickEvent;
	onPrevClick: ControlClickEvent;
	onToggleClick: ControlClickEvent;
}

function Controls({
	audioStatus,
	onNextClick,
	onPrevClick,
	onToggleClick,
}: ControlsProps) {
	const toggleStatusButtons = {
		PAUSED: <ImageButton icon={<PlayIcon />} onClick={onToggleClick} />,
		PLAYING: <ImageButton icon={<PauseIcon />} onClick={onToggleClick} />,
	};

	return (
		<div className={styles.container}>
			<ImageButton icon={<RewindBackIcon />} onClick={onPrevClick} />
			{toggleStatusButtons[audioStatus]}
			<ImageButton
				transformDeg='180deg'
				icon={<RewindBackIcon />}
				onClick={onNextClick}
			/>
		</div>
	);
}

export default Controls;
