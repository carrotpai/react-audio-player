import { Controls, ProgressBar, VolumeBar } from "./src/components";
import { useAudio } from "./src/hooks/useAudio";
import { PlaylistItem } from "./types";
import styles from "./audio.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LazyImage from "@/shared/components/lazyImage";
import React from "react";

interface AudioPlayerProps {
	playlist?: PlaylistItem[];
}

function AudioPlayer({ playlist }: AudioPlayerProps) {
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const [progressBarRef, volumeBarRef] = [
		React.useRef<HTMLInputElement>(null),
		React.useRef<HTMLInputElement>(null),
	];
	const { playerState, controls } = useAudio(playlist ?? []);

	React.useEffect(() => {
		wrapperRef.current?.focus();
	}, []);

	const dispatchArrowPressEvent = (
		e: React.KeyboardEvent,
		type: "keydown" | "keyup",
		key: "ArrowRight" | "ArrowLeft"
	) => {
		if (
			e.target === progressBarRef.current ||
			e.target === volumeBarRef.current
		)
			return;
		progressBarRef.current?.dispatchEvent(
			new KeyboardEvent(type, { bubbles: true, key: key })
		);
	};
	return (
		<div
			ref={wrapperRef}
			className={styles.wrapper}
			onKeyDown={(e) => {
				switch (e.key) {
					case " ":
						if (!(e.target instanceof HTMLButtonElement)) {
							controls.togglePlay();
						}
						break;
					case "ArrowUp":
						controls.setVolume(playerState.volume + 0.03);
						break;
					case "ArrowDown":
						controls.setVolume(playerState.volume - 0.03);
						break;
					case "ArrowRight":
						dispatchArrowPressEvent(e, "keydown", "ArrowRight");
						break;
					case "ArrowLeft":
						dispatchArrowPressEvent(e, "keydown", "ArrowLeft");
						break;
					default:
						break;
				}
			}}
			onKeyUp={(e) => {
				if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
					dispatchArrowPressEvent(e, "keyup", e.key);
				}
			}}
			tabIndex={0}
		>
			<div className={styles.container}>
				<Controls
					audioStatus={playerState.status}
					onNextClick={controls.playNextItem}
					onPrevClick={controls.playPrevItem}
					onToggleClick={controls.togglePlay}
				/>
				<div className={styles["item-info"]}>
					<VolumeBar
						ref={volumeBarRef}
						value={playerState.volume}
						onMuteClick={() => controls.setVolume(0)}
						onMaxClick={() => controls.setVolume(1)}
						onChange={(e) => {
							const value = +e.target.value / 100;
							controls.setVolume(value);
						}}
						onKeyDown={(e) => {
							const { value } = e.target as HTMLInputElement;
							switch (e.key) {
								case "ArrowLeft":
									controls.setVolume(+value / 100 - 0.03);
									break;
								case "ArrowRight":
									controls.setVolume(+value / 100 + 0.03);
									break;
								default:
									break;
							}
						}}
					/>
					<div className={styles["text-block"]}>
						<p className={styles["text-block__text-author"]}>
							{playerState.author}
						</p>
						<p className={styles["text-block__text-title"]}>
							{playerState.trackTitle}
						</p>
					</div>
					<ProgressBar
						ref={progressBarRef}
						currentTime={playerState.currentTime}
						duration={playerState.duration}
						playerStatus={playerState.status}
						onChange={(progress) => {
							controls.setTrackCurrentTime(progress);
						}}
						forKeyPress={{
							durationStepValue: 3,
						}}
					/>
				</div>
			</div>
			<div
				className={`${styles["preview-wrapper"]} ${
					playerState.status === "PLAYING" &&
					styles["preview-wrapper_track-playing"]
				}`}
			>
				<LazyImage
					className={styles.preview}
					src={playerState.previewImageSrc}
					alt={`image preview for audio track ${playerState.author} ${playerState.trackTitle}`}
					width={280}
					height={280}
					placeholder={
						<Skeleton
							circle
							width={280}
							height={280}
							style={{ display: "block" }}
						/>
					}
				/>
			</div>
		</div>
	);
}

export default AudioPlayer;
