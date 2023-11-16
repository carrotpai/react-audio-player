import { Controls, ProgressBar, VolumeBar } from "./src/components";
import { useAudio } from "./src/hooks/useAudio";
import { PlaylistItem } from "./types";
import styles from "./audio.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LazyImage from "@/shared/components/lazyImage";

interface AudioPlayerProps {
	playlist?: PlaylistItem[];
}

function AudioPlayer({ playlist }: AudioPlayerProps) {
	const { playerState, controls } = useAudio(playlist ?? []);
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Controls
					audioStatus={playerState.status}
					onNextClick={controls.playNextItem}
					onPrevClick={controls.playPrevItem}
					onToggleClick={controls.togglePlay}
				/>
				<div className={styles["item-info"]}>
					<VolumeBar
						value={playerState.volume}
						onMuteClick={() => controls.setVolume(0)}
						onMaxClick={() => controls.setVolume(1)}
						onChange={(e) => {
							const value = +e.target.value / 100;
							controls.setVolume(value);
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
						currentTime={playerState.currentTime}
						duration={playerState.duration}
						playerStatus={playerState.status}
						onChange={(progress) => {
							controls.setTrackCurrentTime(progress);
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
