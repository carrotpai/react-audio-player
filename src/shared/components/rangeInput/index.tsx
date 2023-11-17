import React from "react";
import styles from "./rangeInput.module.scss";

interface RangeInputProps extends React.HTMLProps<HTMLInputElement> {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** css переменная нужна для отображения прогресса трека */

const RangeInput = React.forwardRef<HTMLInputElement, RangeInputProps>(
	function RangeInput(props, ref) {
		const progress = (+(props.value ?? 0) / +(props.max ?? 1)) * 100;
		const style = {
			"--progress-bar-color": `linear-gradient(to right, var(--green-main) ${progress}%, var(--gray) ${progress}%)`,
		} as React.CSSProperties;
		return (
			<input
				ref={ref}
				style={style}
				className={styles.input}
				type='range'
				min={props.min}
				max={props.max}
				step={props.step}
				value={props.value}
				onKeyDown={props.onKeyDown}
				onKeyUp={props.onKeyUp}
				onChange={(e) => {
					props.onChange(e);
				}}
				onMouseDown={props.onMouseDown}
				onMouseUp={props.onMouseUp}
			/>
		);
	}
);

export default RangeInput;
