import { useQuery } from "@tanstack/react-query";
import { getRoles } from "services/roles";
import { sortAsc } from "utils/dataHelpers";
import { handleAPIError } from "utils/validation";

export const useRolesData = () => {
    const { data, isLoading, error, refetch } = useQuery(['roles'],
        async () => {
            const roles = await getRoles();
            return sortAsc(roles, (role) => role.name);
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