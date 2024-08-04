import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Spinner from "@/components/common/Spinner";
import Modal from "@/components/common/Modal";
import { User } from "@/types/user";
import Filter from "../common/TableFilter";
import BulkActionControl from "./BulkActionControl";
import EditUser from "@/components/user/EditUser";
import { useColumns } from "@/components/user/Columns";
import useIsMobile from "@/hooks/useIsMobile";

const fetchUsers = async (): Promise<User[]> => {
	const response = await fetch("/api/users");
	if (!response.ok) {
		throw new Error("Error Fetching Users");
	}
	return response.json();
};

const UserTable: React.FC = () => {
	const queryClient = useQueryClient();
	const isMobile = useIsMobile();
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data, isLoading, error } = useQuery<User[], Error>({
		queryKey: ["users"],
		queryFn: fetchUsers,
		staleTime: 1000 * 60 * 5,
	});

	const openModal = (user: User) => {
		setSelectedUser(user);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedUser(null);
		setIsModalOpen(false);
	};
	const columns = useColumns(openModal);
	const table = useReactTable({
		data: data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		initialState: {
			pagination: {
				pageSize: 5,
			},
		},
	});

	const selectedRows = table
		?.getSelectedRowModel()
		?.flatRows.map((row) => row.original);

	const deleteSelectedRows = async () => {
		const shouldCancel = confirm(
			`Are you sure you want to delete selected users?`,
		);
		if (shouldCancel) {
			const idsToDelete = selectedRows.map((row) => row?.id);
			await fetch("/api/users", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ids: idsToDelete }),
			});
			queryClient.invalidateQueries({
				queryKey: ["users"],
				exact: true,
			});
		}
	};

	const clearSelectedItems = () => {
		table.toggleAllRowsSelected(false);
	};

	// if (isLoading) {
	// 	return (
	// 		<div className="flex w-full items-center justify-center">
	// 			<Spinner size={"spinner-lg"} />
	// 		</div>
	// 	);
	// }
	if (isLoading) {
		return (
			<div className="relative flex h-[calc(100vh-13rem)] w-full items-center justify-center">
				<Spinner size={"spinner-lg"} />
			</div>
		);
	}

	if (error) {
		return <div>Error loading data: {error.message}</div>;
	}

	return (
		<div>
			<div className="mt-4">
				<div className="absolute bottom-24 left-1/2 z-[10] -translate-x-1/2 transform">
					<BulkActionControl
						selectedItems={selectedRows}
						deleteSelectedRows={deleteSelectedRows}
						clearSelectedItems={clearSelectedItems}
					/>
				</div>
				<div className="relative h-[calc(100vh-13rem)] w-full overflow-auto rounded-lg border border-gray-200 shadow-sm">
					<table className="hidescroll table w-full">
						<thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id} className="bg-gray-200">
									{headerGroup.headers.map((header) => (
										<th key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder ? null : (
												<>
													<div
														{...{
															className: header.column.getCanSort()
																? "cursor-pointer select-none"
																: "",
															onClick:
																header.column.getToggleSortingHandler(),
														}}>
														{flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
														{{
															asc: " 🔼",
															desc: " 🔽",
														}[
															header.column.getIsSorted() as string
														] ?? null}
													</div>
													{header.column.getCanFilter() ? (
														<div>
															<Filter column={header.column} />
														</div>
													) : null}
												</>
											)}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row, index) => (
								<tr
									key={row.id}
									className={
										index % 2 === 0 ? "bg-white" : "bg-gray-50"
									}>
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className="whitespace-nowrap">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="mt-4 flex w-full items-center justify-between text-xs text-gray-500">
					<div>
						<div className="flex items-center gap-x-1 text-xs">
							Showing
							<span className="font-bold">
								{table.getState().pagination.pageIndex + 1} of{" "}
								{table.getPageCount()}
							</span>
							Rows
						</div>
					</div>
					<div className="join">
						<button
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
							className="btn-base btn join-item">
							«
						</button>
						<button className="btn-base btn join-item">
							Page {table.getState().pagination.pageIndex + 1}
						</button>
						<button
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
							className="btn-base btn join-item">
							»
						</button>
					</div>
					{!isMobile && (
						<div className="flex items-center gap-x-2 text-xs">
							<span>Display</span>
							<select
								value={table.getState().pagination.pageSize}
								className="select-box"
								onChange={(e) => {
									table.setPageSize(Number(e.target.value));
								}}>
								{[5, 10, 20, 50].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										{pageSize}
									</option>
								))}
							</select>
							<span>per page</span>
						</div>
					)}
				</div>
			</div>
			{isModalOpen && selectedUser && (
				<Modal
					openModal={isModalOpen}
					onClose={closeModal}
					id="edit_user_modal">
					<EditUser closeModal={closeModal} user={selectedUser} />
				</Modal>
			)}
		</div>
	);
};

export default UserTable;
