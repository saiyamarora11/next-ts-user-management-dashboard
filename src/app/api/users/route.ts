import { NextResponse } from "next/server";
import { demoUsers } from "@/data/users";
import bcrypt from "bcryptjs";

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
		id: users.length ? users[users.length - 1].id + 1 : 1,
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
