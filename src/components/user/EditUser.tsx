import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { EditValidationSchema } from "@/utils/validation";
import FormInputBox from "@/components/user/FormInputBox";
import { toast } from "react-toastify";
import { User } from "@/types/user";

type Props = {
	closeModal: () => void;
	user: User;
};

type FormFields = z.infer<typeof EditValidationSchema>;

const EditUserForm: React.FC<Props> = ({ closeModal, user }) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: async (userData: FormFields) => {
			const response = await fetch(`/api/users`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: user.id,
					...userData,
				}),
			});

			if (!response.ok) {
				try {
					const errorData = await response.json();
					toast.error(errorData.error);
					throw new Error(errorData.error);
				} catch (error) {
					throw new Error("Error Updating User");
				}
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["users"],
				exact: true,
			});
			toast.success("User details updated successfully!");
			closeModal();
		},
		onError: (error) => {
			console.error("Error during mutation:", error);
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		resolver: zodResolver(EditValidationSchema),
		mode: "onChange",
		defaultValues: {
			firstName: user.first_name,
			lastName: user.last_name,
			alternateEmail: user.alternate_email || "",
			age: user.age.toString(),
		},
	});

	const onSubmit: SubmitHandler<FormFields> = (data) => {
		console.log("Form data submitted:", data);
		mutate(data);
	};

	return (
		<div>
			<p className="mt-2 text-center text-lg font-bold">Edit User</p>
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
					id="alternateEmail"
					label="Alternate Email"
					type="email"
					register={register}
					errors={errors}
					placeholder="Alternate E-mail"
				/>
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
						Edit Details
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditUserForm;
