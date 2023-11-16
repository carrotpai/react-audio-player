import React from "react";

type LazyImageProps = Omit<
	React.ImgHTMLAttributes<HTMLImageElement>,
	"placeholder"
> & {
	placeholder?: React.ReactNode;
};

function LazyImage(props: LazyImageProps) {
	const { placeholder, src, width, height, ...otherProps } = props;
	const [isLoading, setIsLoading] = React.useState(true);
	const imgRef = React.useRef<HTMLImageElement>(null);
	const loadCallback = () => {
		setIsLoading(false);
	};
	React.useEffect(() => {
		const img = imgRef.current;
		img?.addEventListener("load", loadCallback);
		return () => {
			img?.removeEventListener("load", loadCallback);
			setIsLoading(true);
		};
	}, [src]);
	return (
		<div style={{ position: "relative" }}>
			{isLoading && (
				<div
					style={{
						position: "absolute",
						top: "0px",
						left: "0px",
					}}
				>
					{placeholder}
				</div>
			)}
			<img
				ref={imgRef}
				src={src}
				width={width}
				height={height}
				{...otherProps}
			/>
		</div>
	);
}

export default LazyImage;
