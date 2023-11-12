import { useEffect, useRef, useState } from "react";
import { createAudioPlayer } from "../audioPlayerFacade/createAudioPlayer";
import { PlayerState, PlaylistItem } from "../../types";

export function useAudio(playlist: PlaylistItem[]) {
	const initPlayerState: PlayerState = {
		status: "PAUSED",
		duration: 0,
		currentTime: 0,
		volume: +(localStorage.getItem("audio-volume") ?? 0.6),
		trackTitle: playlist[0].name,
		author: playlist[0].author,
		previewImageSrc: playlist[0].previewImageSrc,
	};
	const [playerState, setPlayerState] = useState<PlayerState>(initPlayerState);

	const audioControls = useRef<ReturnType<typeof createAudioPlayer> | null>(
		null
	);

	function playNextItem() {
		audioControls.current?.playNextItem();
	}

	function playPrevItem() {
		audioControls.current?.playPrevItem();
	}

	function togglePlay() {
		audioControls.current?.togglePlay();
	}

	function setVolume(volume: number) {
		audioControls.current?.setVolume(volume);
	}

	function setTrackCurrentTime(time: number) {
		audioControls.current?.setTrackCurrentTime(time);
	}

	useEffect(() => {
		audioControls.current = createAudioPlayer(playlist, setPlayerState);
		return () => {
			audioControls.current?.cleanUp();
		};
	}, [playlist]);

	return {
		playerState: {
			...playerState,
		},
		controls: {
			setTrackCurrentTime,
			setVolume,
			playNextItem,
			playPrevItem,
			togglePlay,
		},
	};
}
