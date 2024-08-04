import { createColumnHelper } from "@tanstack/react-table";
import { User } from "@/types/user";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { handleClick } from "@/utils/general";
import { useUserDeletion } from "@/hooks/useUserDeletion";

const columnHelper = createColumnHelper<User>();

export const useColumns = (openModal: (user: User) => void) => {
	const { handleDeleteUser } = useUserDeletion();

	return [
		columnHelper.display({
			id: "select",
			header: ({ table }) => (
				<input
					type="checkbox"
					checked={table.getIsAllRowsSelected()}
					onChange={(e) =>
						table.toggleAllRowsSelected(e.target.checked)
					}
				/>
			),
			cell: ({ row }) => (
				<input
					type="checkbox"
					checked={row.getIsSelected()}
					onChange={() => row.toggleSelected()}
				/>
			),
		}),
		columnHelper.accessor(
			(row) => `${row.first_name} ${row.last_name}`,
			{
				id: "full_name",
				header: "Full Name",
				cell: (info) => info.getValue() || "-",
				meta: {
					filterVariant: "text",
				},
			},
		),
		columnHelper.accessor("email", {
			header: "Email",
			cell: (info) => info.getValue() || "-",
			meta: {
				filterVariant: "text",
			},
		}),
		columnHelper.accessor("alternate_email", {
			header: "Alternate Email",
			cell: (info) => info.getValue() || "-",
			meta: {
				filterVariant: "text",
			},
		}),
		columnHelper.accessor("password", {
			header: "Password",
			cell: (info) => info.getValue() || "-",
		}),
		columnHelper.accessor("age", {
			header: "Age",
			cell: (info) => info.getValue() || "-",
			meta: {
				filterVariant: "range",
			},
		}),
		columnHelper.display({
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button">
						<EllipsisHorizontalIcon className="size-5 text-black" />
					</div>
					<ul
						onClick={handleClick}
						tabIndex={0}
						className="menu dropdown-content z-[10] mb-1 w-40 rounded-md border border-gray-200 bg-white p-2 text-[0.7rem] shadow-sm">
						<li>
							<a onClick={() => openModal(row.original)}>Edit User</a>
						</li>
						<li>
							<a onClick={() => handleDeleteUser(row.original)}>
								Delete User
							</a>
						</li>
					</ul>
				</div>
			),
		}),
	];
};
