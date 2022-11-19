import { useQuery } from "@tanstack/react-query";
import { getUsersByRole } from "services/users";
import { sortAsc } from "utils/dataHelpers";
import { handleAPIError } from "utils/validation";

export const useUsersData = (role: string) => {
    const { data, isLoading, error, refetch } = useQuery([`users_${role}`],
        async () => {
            const users = await getUsersByRole(role);
            return sortAsc(users, (user) => user.fullName);
        },
        {
            onError: (e) => {
                handleAPIError(e);
            },
        }
    );

    return {
        data,
        isLoading,
        error,
        refetch,
    };
}