import React, { useState, useEffect, useCallback } from "react";

type DebouncedInputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"onChange"
> & {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
};

const DebouncedInput: React.FC<DebouncedInputProps> = ({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}) => {
	const [value, setValue] = useState<string | number>(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return <input {...props} value={value} onChange={handleChange} />;
};

export default DebouncedInput;
