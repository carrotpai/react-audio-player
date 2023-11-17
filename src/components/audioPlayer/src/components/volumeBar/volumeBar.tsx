import { ImageButton } from "@/shared/components";
import MuteIcon from "@/assets/icons/volume-cross.svg";
import LoudIcon from "@/assets/icons/volume-loud.svg";
import styles from "./volumeBar.module.scss";
import RangeInput from "@/shared/components/rangeInput";
import React from "react";

interface VolumeBarProps {
	value: number;
	onMuteClick?: () => void;
	onMaxClick?: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**value [0, 1] */

const VolumeBar = React.forwardRef<HTMLInputElement, VolumeBarProps>(
	function VolumeBar(
		{ value, onChange, onMuteClick, onMaxClick, onKeyDown },
		ref
	) {
		return (
			<div className={styles.container}>
				<ImageButton
					clear
					size='small'
					onClick={onMuteClick}
					icon={<MuteIcon />}
				/>
				<RangeInput
					ref={ref}
					min={0}
					step={1}
					max={100}
					value={value * 100}
					onChange={onChange}
					onKeyDown={onKeyDown}
				/>
				<ImageButton
					clear
					size='small'
					onClick={onMaxClick}
					icon={<LoudIcon />}
				/>
			</div>
		);
	}
);

export default VolumeBar;
