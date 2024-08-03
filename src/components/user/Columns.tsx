import { createColumnHelper } from "@tanstack/react-table";
import { User } from "@/types/user";

const columnHelper = createColumnHelper<User>();

export const columns = [
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
		header: "Actions",
		cell: ({ row }) => (
			<div tabIndex={0} role="button" className="btn m-1">
				Click
			</div>
		),
	}),
];
