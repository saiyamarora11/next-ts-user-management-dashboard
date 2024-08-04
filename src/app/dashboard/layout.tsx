import React from "react";
import Link from "next/link";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="drawer drawer-end lg:drawer-open">
			<input
				id="my-drawer-2"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col">
				<header className="bg-blue-500 p-4 text-white">
					<h1 className="text-xl font-bold">Dashboard</h1>
				</header>
				<main className="flex-grow overflow-auto">{children}</main>
				{/* <label
					htmlFor="my-drawer-2"
					className="btn btn-primary drawer-button lg:hidden">
					Open drawer
				</label> */}
			</div>
			<div className="drawer-side right-0">
				{" "}
				<label
					htmlFor="my-drawer-2"
					aria-label="close sidebar"
					className="drawer-overlay"></label>
				<ul className="menu h-full w-72 border bg-gray-100 p-4 shadow">
					<li>
						<Link
							href="/dashboard/users"
							className="rounded-lg border-l-2 border-blue-500 bg-blue-100 text-sm font-bold">
							Users
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
