import { PlaylistItem } from "@/components/audioPlayer/types";

import temporaryHighImg from "@/assets/songs/img/temporaryHigh.webp";
import audioTemporaryHigh from "@/assets/songs/audio/AuroraATemporaryHigh.mp3";

import audioHeathens from "@/assets/songs/audio/AuroraHeathens.mp3";
import heathensPreviewImg from "@/assets/songs/img/heathens.jpg";

import audioAllIsSoftInside from "@/assets/songs/audio/AuroraAllIsSoftInside.mp3";
import allIsSoftInsideImg from "@/assets/songs/img/allIsSoftInside.jpg";

import audioForgottenLove from "@/assets/songs/audio/AuroraForgottenLove.mp3";
import ForgottenLoveImg from "@/assets/songs/img/forgottenLove.jpg";

import audioConqueror from "@/assets/songs/audio/AuroraConqueror.mp3";
import ConquerorImg from "@/assets/songs/img/conqueror.jpg";

const getAbsolutePath = (importURL: string) =>
	new URL(importURL, import.meta.url).href;

export const playlist: PlaylistItem[] = [
	{
		name: "Heathens",
		author: "Aurora",
		previewImageSrc: getAbsolutePath(heathensPreviewImg),
		audioSrc: getAbsolutePath(audioHeathens),
	},
	{
		name: "Temporary High",
		author: "Aurora",
		previewImageSrc: getAbsolutePath(temporaryHighImg),
		audioSrc: getAbsolutePath(audioTemporaryHigh),
	},
	{
		name: "All is Soft inside",
		author: "Aurora",
		previewImageSrc: getAbsolutePath(allIsSoftInsideImg),
		audioSrc: getAbsolutePath(audioAllIsSoftInside),
	},
	{
		name: "Forgotten Love",
		author: "Aurora",
		previewImageSrc: getAbsolutePath(ForgottenLoveImg),
		audioSrc: getAbsolutePath(audioForgottenLove),
	},
	{
		name: "Conqueror",
		author: "Aurora",
		previewImageSrc: getAbsolutePath(ConquerorImg),
		audioSrc: getAbsolutePath(audioConqueror),
	},
];
