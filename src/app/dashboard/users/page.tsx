"use client";

import { useState } from "react";
import UserTable from "@/components/user/UsersTable";
import AddUser from "@/components/user/AddUser";
import Modal from "@/components/common/Modal";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function UsersPage() {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="flex flex-grow flex-col p-4">
			<div className="mb-4">
				<p className="text-2xl font-bold">User Management</p>
			</div>
			<div className="mt-1 flex items-center justify-between">
				<p className="text-sm text-gray-500">Manage your users</p>
				<button
					className="btn-outline-blue btn flex !h-8 items-center text-xs"
					onClick={() => setShowModal(true)}>
					<PlusIcon className="mr-1 h-5 w-5 text-blue-600" /> Add User
				</button>
			</div>
			<div className="mt-4 flex-1 overflow-x-auto">
				<div className="min-w-full">
					<UserTable />
				</div>
			</div>
			<Modal
				openModal={showModal}
				id="add_user_modal"
				onClose={() => setShowModal(false)}>
				<AddUser closeModal={() => setShowModal(false)} />
			</Modal>
		</div>
	);
}
