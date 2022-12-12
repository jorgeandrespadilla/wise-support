import { useQuery } from "@tanstack/react-query";
import { useSessionRefresh } from "hooks/useRefreshSession";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getProfile } from "services/users";
import { GetUserProfileResponse } from "types";
import { accessToken, refreshToken } from "utils/auth";
import { addStorageListener, removeStorageListener, triggerStorageEvent } from "utils/storageHelpers";
import { handleAPIError } from "utils/validation";

// see https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

interface LoginData {
    accessToken: string;
    refreshToken: string;
    expiresInMilliseconds: number;
}

interface AuthContextData {
    isAuthenticated: boolean;
    userProfile: {
        data?: GetUserProfileResponse,
        isLoading: boolean,
    }
    syncLogin: (data: LoginData) => void;
    syncLogout: () => void;
    validateSession: () => void;
    refreshSession: () => void;
}

type AuthProviderProps = {
    children: React.ReactNode;
};

const authEvent = {
    logout: "logout",
};

export const AuthContext = createContext<AuthContextData>({
    isAuthenticated: false,
    userProfile: {
        data: undefined,
        isLoading: false,
    },
    syncLogin: () => { },
    syncLogout: () => { },
    validateSession: () => { },
    refreshSession: () => { },
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return accessToken.get() !== null;
    });

    const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null);

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

    const { handleRefresh } = useSessionRefresh({
        onSuccess: (data) => {
            syncLogin({
                accessToken: data.accessToken.token,
                refreshToken: data.refreshToken.token,
                expiresInMilliseconds: data.accessToken.expiresIn,
            });
        },
        onError: () => {
            toast.error("La sesión ha expirado");
            syncLogout();
        },
    });

    const logout = useCallback(() => {
        if (!isAuthenticated) {
            return;
        }
        accessToken.remove();
        refreshToken.remove();
        setIsAuthenticated(false);

        // Clear the timeout
        if (sessionTimeout) {
            clearTimeout(sessionTimeout);
        }
        setSessionTimeout(null);
    }, [isAuthenticated, sessionTimeout]);

    /**
     * Login and synchronize session across tabs
     */
    const syncLogin = (data: LoginData) => {
        accessToken.set(data.accessToken);
        refreshToken.set(data.refreshToken);
        setIsAuthenticated(true);

        // Add a timeout to logout the user when the token expires
        if (sessionTimeout) {
            clearTimeout(sessionTimeout);
        }
        setSessionTimeout(setTimeout(() => {
            const token = refreshToken.get();
            if (token) {
                handleRefresh(token);
            }
            else {
                toast.error("La sesión ha expirado");
                syncLogout();
            }
        }, data.expiresInMilliseconds - 1000));
    }

    /**
     * Logout and synchronize session across tabs
     */
    const syncLogout = () => {
        logout();
        triggerStorageEvent(authEvent.logout, String(Date.now()));
    }

    /**
     * Refresh the session
     */
    const refreshSession = useCallback(() => {
        const token = refreshToken.get();
        if (token) {
            handleRefresh(token);
        }
    }, [handleRefresh]);

    /**
     * Validate the session
     */
    const validateSession = () => {
        setIsAuthenticated(accessToken.get() !== null && refreshToken.get() !== null);
    }

    // Listen for logout events
    useEffect(() => {
        const handleLogoutEvent = (event: StorageEvent) => {
            if (event.key === authEvent.logout) {
                logout();
            }
        }

        addStorageListener(handleLogoutEvent);
        return () => {
            removeStorageListener(handleLogoutEvent);
        };
    }, [logout]);

    return (
        <AuthContext.Provider value={{
            userProfile: {
                data: userProfile.data,
                isLoading: userProfile.isLoading,
            },
            isAuthenticated,
            syncLogin,
            syncLogout,
            validateSession,
            refreshSession,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
