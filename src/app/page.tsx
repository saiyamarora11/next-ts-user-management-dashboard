"use client";

import { useState } from "react";
import UserTable from "@/components/user/UsersTable";
import AddUser from "@/components/user/AddUser";
import Modal from "@/components/common/Modal";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Home() {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className="mx-4 pt-10 sm:mx-8 lg:mx-16">
			<p className="text-2xl font-bold">User Management</p>

			<div className="mt-1 flex items-center justify-between">
				<p className="text-sm text-gray-500">Manage your users</p>
				<button
					className="btn-outline-blue btn !h-8 text-xs"
					onClick={() => setShowModal(true)}>
					<PlusIcon className="size-5 text-blue-600" /> Add User
				</button>
			</div>
			<div>
				<UserTable />
			</div>
			<Modal
				openModal={showModal}
				id="add_user_modal"
				onClose={() => setShowModal(false)}>
				<>
					<AddUser closeModal={() => setShowModal(false)} />
				</>
			</Modal>
		</div>
	);
}
