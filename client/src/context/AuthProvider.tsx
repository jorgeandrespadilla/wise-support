import { useSessionRefresh } from "hooks/useRefreshSession";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { accessToken, refreshToken } from "utils/auth";
import { addStorageListener, getStorageUpdate, listenForStorageUpdates, removeStorageListener, triggerStorageEvent } from "utils/storageHelpers";

// see https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

interface LoginData {
    accessToken: string;
    refreshToken: string;
    expiresInMilliseconds: number;
}

interface AuthContextData {
    isAuthenticated: boolean;
    syncLogin: (data: LoginData) => void;
    syncLogout: () => void;
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
    syncLogin: () => { },
    syncLogout: () => { },
    refreshSession: () => { },
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return accessToken.get() !== null;
    });

    const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null);

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


    //#region Effects

    // Synchronize and validate session
    useEffect(() => {
        const onUpdateCompleted = () => {
            // Validate token
            setIsAuthenticated(accessToken.get() !== null && refreshToken.get() !== null);
        };
        const removeListener = listenForStorageUpdates(onUpdateCompleted);
        getStorageUpdate();
        return () => {
            removeListener();
        };
    }, []);

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

    // #endregion Effects


    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            syncLogin,
            syncLogout,
            refreshSession,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
