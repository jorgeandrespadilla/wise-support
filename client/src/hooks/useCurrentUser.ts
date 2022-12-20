import { useQuery } from '@tanstack/react-query';
import { getProfile } from 'services/users';
import { isDefined } from 'utils/dataHelpers';
import { handleAPIError } from 'utils/validation';
import { useAuth } from './useAuth';

export const useCurrentUser = () => {
    const { isAuthenticated } = useAuth();

    const userProfile = useQuery(
        ['userProfile', isAuthenticated],
        async () => {
            return await getProfile();
        },
        {
            onError: e => {
                handleAPIError(e);
            },
            enabled: isAuthenticated,
        },
    );

    /**
     * Checks if the user is authorized to access a route or resource.
     * @param roles Roles to check against. If not defined, will return true if user is authenticated.
     * @returns Whether the user is authorized to access a route or resource.
     */
    const isAuthorized = (roles?: string[]) => {
        if (!isAuthenticated) return false;
        if (!isDefined(userProfile.data)) return false;
        if (!isDefined(roles)) return true;
        const { role } = userProfile.data;
        return roles.includes(role.code);
    };

    return {
        user: userProfile.data,
        isLoading: userProfile.isLoading,
        isAuthorized,
    };
};
