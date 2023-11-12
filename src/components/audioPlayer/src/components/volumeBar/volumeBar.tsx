import { ImageButton } from "@/shared/components";
import MuteIcon from "@/assets/icons/volume-cross.svg";
import LoudIcon from "@/assets/icons/volume-loud.svg";
import styles from "./volumeBar.module.scss";
import RangeInput from "@/shared/components/rangeInput";

interface VolumeBarProps {
	value: number;
	onMuteClick?: () => void;
	onMaxClick?: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**value [0, 1] */

function VolumeBar({
	value,
	onChange,
	onMuteClick,
	onMaxClick,
}: VolumeBarProps) {
	return (
		<div className={styles.container}>
			<ImageButton
				clear
				size='small'
				onClick={onMuteClick}
				icon={<MuteIcon />}
			/>
			<RangeInput
				min={0}
				step={1}
				max={100}
				value={value * 100}
				onChange={onChange}
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

export default VolumeBar;
