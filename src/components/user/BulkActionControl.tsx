import React from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { User } from "@/types/user";

type Props = {
	selectedItems: User[];
	deleteSelectedRows: () => void;
	clearSelectedItems: () => void;
};

const BulkActionControl: React.FC<Props> = ({
	selectedItems,
	clearSelectedItems,
	deleteSelectedRows,
}) => {
	return (
		selectedItems.length > 0 && (
			<div className="bulk-action-container">
				<p className="border-r border-white pr-4 text-white">
					{selectedItems.length} selected
				</p>

				<button
					onClick={deleteSelectedRows}
					className="flex items-center gap-x-1 text-xs text-white">
					<TrashIcon className="h-5 w-5 stroke-[2px]" />
					Delete
				</button>
				<button onClick={clearSelectedItems} className="pl-2">
					<XMarkIcon className="h-5 w-5 stroke-[2px] text-white" />
				</button>
			</div>
		)
	);
};

export default BulkActionControl;
