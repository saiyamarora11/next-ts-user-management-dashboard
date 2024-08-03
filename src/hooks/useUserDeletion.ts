// src/hooks/useUserDeletion.ts

import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";

export const useUserDeletion = () => {
	const queryClient = useQueryClient();

	const handleDeleteUser = async (user: User) => {
		const shouldCancel = confirm(
			`Are you sure you want to delete ${user.first_name} ${user.last_name}?`,
		);
		if (shouldCancel) {
			await fetch("/api/users", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ids: [user.id] }),
			});
			queryClient.invalidateQueries({
				queryKey: ["users"],
				exact: true,
			});
		}
	};

	return { handleDeleteUser };
};
