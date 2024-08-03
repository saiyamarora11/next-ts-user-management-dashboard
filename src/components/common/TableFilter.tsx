import React, { useCallback } from "react";
import { Column } from "@tanstack/react-table";
import DebouncedInput from "./DebouncedInput";

type CustomColumnMeta = {
	filterVariant?: "range" | "text";
};

type FilterProps = {
	column: Column<any, unknown> & {
		columnDef: { meta?: CustomColumnMeta };
	};
};

const Filter: React.FC<FilterProps> = ({ column }) => {
	const columnFilterValue = column.getFilterValue();
	const { filterVariant } = column.columnDef.meta ?? {};

	if (filterVariant === "range") {
		return (
			<div className="flex space-x-2">
				<DebouncedInput
					type="number"
					value={(columnFilterValue as [number, number])?.[0] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [number, number]) => [
							value,
							old?.[1],
						])
					}
					placeholder={`Min`}
					className="input-box h-7"
				/>
				<DebouncedInput
					type="number"
					value={(columnFilterValue as [number, number])?.[1] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [number, number]) => [
							old?.[0],
							value,
						])
					}
					placeholder={`Max`}
					className="input-box h-7"
				/>
			</div>
		);
	}

	if (filterVariant === "text") {
		return (
			<DebouncedInput
				className="input-box h-7"
				onChange={(value) => column.setFilterValue(value)}
				placeholder={`Search...`}
				type="text"
				value={(columnFilterValue ?? "") as string}
			/>
		);
	}

	return null;
};

export default Filter;
