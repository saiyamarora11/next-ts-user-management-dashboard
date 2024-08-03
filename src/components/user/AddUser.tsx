import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { addUserValidationSchema } from "@/utils/validation";
import FormInputBox from "@/components/user/FormInputBox";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type Props = {
	closeModal: () => void;
};

type FormFields = z.infer<typeof addUserValidationSchema>;

const AddUserForm: React.FC<Props> = ({ closeModal }) => {
	const queryClient = useQueryClient();
	const [showPassword, setShowPassword] = useState(false);

	const { mutate } = useMutation({
		mutationFn: async (userData: FormFields) => {
			const response = await fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				try {
					const errorData = await response.json();
					toast.error(errorData.error);
					throw new Error(errorData.error);
				} catch (error) {
					throw new Error("Error Fetching Users");
				}
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["users"],
				exact: true,
			});
			closeModal();
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		resolver: zodResolver(addUserValidationSchema),
		mode: "onSubmit",
	});

	const onSubmit: SubmitHandler<FormFields> = (data) => {
		mutate(data);
	};

	const passwordErrorMessage = errors.password?.message;
	return (
		<div>
			<p className="mt-2 text-center text-lg font-bold">
				Add a new user
			</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 p-4"
				autoComplete="off">
				<FormInputBox
					id="firstName"
					label="First Name"
					type="text"
					register={register}
					errors={errors}
					placeholder="First Name"
					isRequired
				/>
				<FormInputBox
					id="lastName"
					label="Last Name"
					type="text"
					register={register}
					errors={errors}
					placeholder="Last Name"
					isRequired
				/>
				<FormInputBox
					id="email"
					label="Email"
					type="email"
					register={register}
					errors={errors}
					placeholder="E-mail"
					isRequired
					autoComplete="new-email"
				/>
				<FormInputBox
					id="alternateEmail"
					label="Alternate Email"
					type="email"
					register={register}
					errors={errors}
					placeholder="Alternate E-mail"
				/>
				<div className="relative">
					<FormInputBox
						id="password"
						label="Password"
						type={showPassword ? "text" : "password"}
						register={register}
						errors={errors}
						placeholder="Password"
						isRequired
						autoComplete="new-password"
					/>
					<span
						className={`absolute right-3 flex cursor-pointer items-center pr-3 ${
							passwordErrorMessage ? "bottom-7" : "bottom-2"
						}`}
						onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? (
							<EyeIcon className="size-5 stroke-[2px] text-gray-500" />
						) : (
							<EyeSlashIcon className="size-5 stroke-[2px] text-gray-500" />
						)}
					</span>
				</div>

				<FormInputBox
					id="age"
					label="Age"
					type="number"
					register={register}
					errors={errors}
					isRequired
					placeholder="Age"
				/>
				<div className="mt-4 flex justify-end">
					<button type="submit" className="btn-blue btn !h-8 text-xs">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddUserForm;
