import RangeInput from "@/shared/components/rangeInput";
import { useEffect, useState } from "react";
import styles from "./progressBar.module.scss";
import React from "react";

const notTriggerDraggingEventsKeys = ["ArrowDown", "ArrowUp"];
const controlKeyPress = [
	"ArrowRight",
	"ArrowLeft",
	"ArrowDown",
	"ArrowUp",
	" ",
];

interface ProgressBarProps {
	playerStatus: "PLAYING" | "PAUSED";
	currentTime: number;
	duration: number;
	onChange: (progress: number) => void;
	forKeyPress: {
		/**шаг изменения при нажатии на горизонтальные стрелки клавиатуры (к примеру left = -3s, right = +3s)*/
		durationStepValue: number;
	};
}

/** прогресс бар содержит в себе отдельный стейт (для возможности определять когда нужно менять прогресс аудио)
 *  без него каждое изменение будет менять прогресс аудио, что очень влияет на звук (нарезка шумов)
 *  поэтому условно стейт зависит от currentTime аудио, а когда происходит клик влияние currentTime исчезает,
 *  при кей апе будет установлен нужный стейт для аудио (change(progress))
 */

const ProgressBar = React.forwardRef<HTMLInputElement, ProgressBarProps>(
	function ProgressBar(
		{ currentTime, duration, onChange, playerStatus, forKeyPress },
		ref
	) {
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

		const handleArrowLeftPress = () => {
			if (progress - forKeyPress.durationStepValue < 0) {
				setProgress(0);
			} else {
				setProgress((progress) => progress - forKeyPress.durationStepValue);
			}
		};
		const handleArrowRightPress = () => {
			if (progress + forKeyPress.durationStepValue > duration) {
				setProgress(duration);
			} else {
				setProgress((progress) => progress + forKeyPress.durationStepValue);
			}
		};

		/**Связывает currentTime стейт (приходит в виде пропса) с progress стейтом */
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
					ref={ref}
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
					onKeyDown={(e) => {
						if (!controlKeyPress.includes(e.key)) {
							return;
						}
						if (
							playerStatus === "PLAYING" &&
							!isDragging &&
							!notTriggerDraggingEventsKeys.includes(e.key)
						) {
							setIsDragging(true);
						}
						switch (e.key) {
							case "ArrowLeft":
								handleArrowLeftPress();
								break;
							case "ArrowRight":
								handleArrowRightPress();
								break;
							/**ArrowUp, ArrowDown ивенты баблятся наверх (в контейнер плеера, где происходит вызов контролов)
							 * Нужен preventDefault для того, чтобы не происходило изменение инпута
							 * (по умолчанию для вертикальных стрелок происходит +- 1 step, что нам точно не нужно)
							 */
							case "ArrowUp":
								e.preventDefault();
								break;
							case "ArrowDown":
								e.preventDefault();
								break;
							default:
								break;
						}
					}}
					onKeyUp={() => {
						if (isDragging || playerStatus === "PAUSED") {
							setIsDragging(false);
							onChange(progress);
						}
					}}
				/>
			</div>
		);
	}
);

export default ProgressBar;
