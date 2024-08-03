import React from "react";
import {
	UseFormRegister,
	FieldErrors,
	FieldError,
} from "react-hook-form";

type InputFieldProps = {
	id: string;
	label: string;
	type: string;
	placeholder?: string;
	register: UseFormRegister<any>;
	errors: FieldErrors;
	isRequired?: boolean;
	autoComplete?: string;
};

const InputField: React.FC<InputFieldProps> = ({
	id,
	label,
	type,
	placeholder,
	register,
	errors,
	isRequired = false,
	autoComplete = "off",
}) => {
	const errorMessage = (errors[id] as FieldError)?.message;
	return (
		<div className="relative">
			<label
				htmlFor={id}
				className="text-xs font-medium text-gray-500">
				{label}
				{isRequired && <span className="text-red-600">*</span>}
			</label>
			<input
				type={type}
				id={id}
				{...register(id)}
				placeholder={placeholder}
				className="input-box h-9"
				autoComplete={autoComplete}
			/>
			{errorMessage && (
				<p className="validation-error">{errorMessage}</p>
			)}
		</div>
	);
};

export default InputField;
