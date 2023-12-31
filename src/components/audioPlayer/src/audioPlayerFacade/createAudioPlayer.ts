import { PlayerState, PlaylistItem } from "../../types";

export const DEFAULT_AUDIO_VOLUME = 0.6;

export function createAudioPlayer(
	playlist: PlaylistItem[],
	setPlayerState: (newState: PlayerState) => void
) {
	let currentItemIndex = 0;
	const player = new Audio();

	if (!playlist.length) {
		console.log("empty playlist");
		return;
	}

	/** State */

	function emitStateChange() {
		const newState = computePlayerState();
		setPlayerState(newState);
	}

	function computePlayerState(): PlayerState {
		return {
			trackTitle: playlist[currentItemIndex].name,
			author: playlist[currentItemIndex].author,
			status: getPlayerStatus(),
			volume: getPlayerVolume(),
			currentTime: getPlayerTrackCurrentTime(),
			duration: getPlayerTrackDuration(),
			previewImageSrc: playlist[currentItemIndex].previewImageSrc,
		};
	}

	function getPlayerStatus() {
		return player.paused ? "PAUSED" : "PLAYING";
	}

	function getPlayerTrackCurrentTime() {
		return player.currentTime;
	}
	function getPlayerTrackDuration() {
		return player.duration;
	}
	function getPlayerVolume() {
		return player.volume;
	}

	/** Loader */

	function loadPlayerItem(itemIndex: number) {
		player.src = playlist[itemIndex].audioSrc;
		player.load();
		currentItemIndex = itemIndex;
	}

	/**Controls */

	function setVolume(volume: number = DEFAULT_AUDIO_VOLUME) {
		let newVolume = volume;
		if (volume < 0) newVolume = 0;
		if (volume > 1) newVolume = 1;
		localStorage.setItem("audio-volume", String(volume));
		player.volume = newVolume;
		emitStateChange();
	}

	function setTrackCurrentTime(time: number) {
		let newTime = time;
		if (time > player.duration) {
			newTime = player.duration;
		}
		if (time < 0) {
			newTime = 0;
		}
		player.currentTime = newTime;
		emitStateChange();
	}

	function playNextItem() {
		if (currentItemIndex === playlist.length - 1) {
			currentItemIndex = 0;
		} else {
			currentItemIndex += 1;
		}
		loadPlayerItem(currentItemIndex);
		player.play();
	}

	function playPrevItem() {
		if (currentItemIndex === 0) {
			currentItemIndex = playlist.length - 1;
		} else {
			currentItemIndex -= 1;
		}
		loadPlayerItem(currentItemIndex);
		player.play();
	}

	function togglePlay() {
		if (player.paused) {
			player.play();
		} else {
			player.pause();
		}
		emitStateChange();
	}

	/** Event Listeners */

	function onPlayerTrackEnd() {
		playNextItem();
		emitStateChange();
	}

	function addEventListeners() {
		player.addEventListener("ended", onPlayerTrackEnd);
		player.addEventListener("volumechange", emitStateChange);
		player.addEventListener("timeupdate", emitStateChange);
		player.addEventListener("canplay", emitStateChange);
	}

	function removeEventListeners() {
		player.removeEventListener("ended", onPlayerTrackEnd);
		player.removeEventListener("volumechange", emitStateChange);
		player.removeEventListener("timeupdate", emitStateChange);
		player.addEventListener("canplay ", emitStateChange);
	}

	/** Init function */

	function init() {
		const volume = localStorage.getItem("audio-volume");
		if (volume) {
			player.volume = +volume;
		} else {
			player.volume = DEFAULT_AUDIO_VOLUME;
			localStorage.setItem("audio-volume", String(DEFAULT_AUDIO_VOLUME));
		}
		addEventListeners();
		loadPlayerItem(currentItemIndex);
	}

	function cleanUp() {
		removeEventListeners();
		player.pause();
	}

	init();
	return {
		setTrackCurrentTime,
		setVolume,
		playNextItem,
		playPrevItem,
		togglePlay,
		cleanUp,
	};
}
