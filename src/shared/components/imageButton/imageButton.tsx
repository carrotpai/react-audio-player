import styles from "./imageButton.module.scss";

interface ImageButtonProps {
	onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
	icon: React.ReactNode;
	clear?: boolean;
	size?: "small" | "medium" | "big";
	transformDeg?: `${number}deg`;
}

const sizes = {
	small: { height: 36, width: 36 },
	medium: { height: 54, width: 54 },
	big: { height: 64, width: 64 },
};

function ImageButton({
	onClick,
	icon,
	size = "medium",
	transformDeg,
	clear,
}: ImageButtonProps) {
	return (
		<button
			style={{ ...sizes[size], transform: `rotate(${transformDeg})` }}
			className={`${styles.button} ${clear && styles.button_clear}`}
			onClick={onClick}
			type='button'
		>
			<span className={styles.button__icon}>{icon}</span>
		</button>
	);
}

export default ImageButton;
