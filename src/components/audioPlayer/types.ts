export type PlaylistItem = {
	author?: string;
	name: string;
	audioSrc: string;
	previewImageSrc: string;
};

export type PlayerState = {
	trackTitle: string;
	author?: string;
	status: "PAUSED" | "PLAYING";
	volume: number;
	currentTime: number;
	duration: number;
	previewImageSrc?: string;
};
