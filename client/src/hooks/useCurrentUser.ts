import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/users";
import { handleAPIError } from "utils/validation";
import { useAuth } from "./useAuth";

export const useCurrentUser = () => {
    const { isAuthenticated } = useAuth();
    const userProfile = useQuery(['userProfile', isAuthenticated],
        async () => {
            return await getProfile();
        },
        {
            onError: (e) => {
                handleAPIError(e);
            },
            enabled: isAuthenticated,
        },
    );

    return {
        user: userProfile.data,
        isLoading: userProfile.isLoading,
    };
};