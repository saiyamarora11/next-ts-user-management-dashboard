import * as z from "zod";

const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const addUserValidationSchema = z.object({
	firstName: z.string().min(3, { message: "First name is required" }),
	lastName: z.string().min(3, { message: "Last name is required" }),
	email: z.string().email({ message: "Invalid email address" }),
	alternateEmail: z.string().optional(),
	password: z
		.string()
		.min(8, {
			message:
				"Password is required. Password must be at least 8 characters long",
		})
		.regex(passwordRegex, {
			message:
				"Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
		}),
	age: z.string().refine(
		(age) => {
			return Number(age) >= 19;
		},
		{ message: "You must be 19 years or older" },
	),
});

export const EditValidationSchema = z.object({
	firstName: z.string().min(3, { message: "First name is required" }),
	lastName: z.string().min(3, { message: "Last name is required" }),
	alternateEmail: z.string().optional(),
	age: z.string().refine(
		(age) => {
			return Number(age) >= 19;
		},
		{ message: "You must be 19 years or older" },
	),
});
