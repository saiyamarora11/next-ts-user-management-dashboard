import { NextResponse } from "next/server";
import { demoUsers } from "@/data/users";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

let users = [...demoUsers];

export async function GET() {
	return NextResponse.json(users);
}

export async function POST(request: Request) {
	const {
		firstName,
		lastName,
		email,
		alternateEmail,
		password,
		age,
	} = await request.json();

	const existingUser = users.find((user) => user.email === email);

	if (existingUser) {
		return NextResponse.json(
			{ error: "User with this email already exists" },
			{ status: 400 },
		);
	}
	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = {
		id: uuidv4(),
		first_name: firstName,
		last_name: lastName,
		email,
		alternate_email: alternateEmail,
		password: hashedPassword,
		age,
	};

	users.push(newUser);

	return NextResponse.json(newUser);
}

export async function PUT(request: Request) {
	const { id, firstName, lastName, alternateEmail, age } =
		await request.json();

	const userIndex = users.findIndex(
		(user) => user.id === id.toString(),
	);

	if (userIndex === -1) {
		return NextResponse.json(
			{ error: "User not found" },
			{ status: 404 },
		);
	}

	const updatedUser = {
		...users[userIndex],
		first_name: firstName,
		last_name: lastName,
		alternate_email: alternateEmail,
		age,
	};

	users[userIndex] = updatedUser;

	return NextResponse.json(updatedUser);
}
export async function DELETE(request: Request) {
	try {
		const { ids } = await request.json();

		if (!ids.length) {
			return NextResponse.json(
				{ error: "Invalid input" },
				{ status: 400 },
			);
		}
		users = users.filter((user) => !ids.includes(user.id));

		return NextResponse.json({
			message: "Users deleted successfully",
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Error deleting users" },
			{ status: 500 },
		);
	}
}
