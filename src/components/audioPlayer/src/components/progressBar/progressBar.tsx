import RangeInput from "@/shared/components/rangeInput";
import { useEffect, useState } from "react";
import styles from "./progressBar.module.scss";

interface ProgressBarProps {
	playerStatus: "PLAYING" | "PAUSED";
	currentTime: number;
	duration: number;
	onChange: (progress: number) => void;
}

/** прогресс бар содержит в себе отдельный стейт (для возможности определять когда нужно менять прогресс аудио)
 *  без него каждое изменение будет менять прогресс аудио, что очень влияет на звук (нарезка шумов)
 *  поэтому условно стейт зависит от currentTime аудио, а когда происходит клик влияние currentTime исчезает,
 *  при кей апе будет установлен нужный стейт для аудио (change(progress))
 */

function ProgressBar({
	currentTime,
	duration,
	onChange,
	playerStatus,
}: ProgressBarProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [progress, setProgress] = useState(currentTime);
	const maxValue = isNaN(duration) ? 1 : duration;

	const formatMinutes = (timeInSeconds: number) => {
		return Math.floor(timeInSeconds / 60);
	};
	const formatSeconds = (timeInSeconds: number) => {
		const seconds = Math.floor(timeInSeconds % 60);
		if (seconds < 10) {
			return `0${seconds}`;
		}
		return seconds;
	};

	useEffect(() => {
		if (!isDragging) {
			setProgress(currentTime);
		}
	}, [currentTime, isDragging]);
	return (
		<div className={styles["track-time"]}>
			<div className={styles["track-time__time"]}>
				<span>{`${formatMinutes(progress)}:${formatSeconds(progress)}`}</span>
				<span>{`${formatMinutes(maxValue)}:${formatSeconds(maxValue)}`}</span>
			</div>
			<RangeInput
				min={0}
				max={maxValue}
				step={1}
				value={progress}
				onChange={(e) => {
					const value = +e.target.value;
					setProgress(value);
				}}
				onMouseDown={() => {
					if (playerStatus === "PLAYING" && !isDragging) {
						setIsDragging(true);
					}
				}}
				onMouseUp={() => {
					if (isDragging) {
						setIsDragging(false);
					}
					onChange(progress);
				}}
			/>
		</div>
	);
}

export default ProgressBar;