import { createContext, useState } from "react";
import { getAuthToken, removeAuthToken, setAuthToken } from "utils/authToken";

interface AuthContextData {
    isAuthenticated: boolean;
    login: (authToken: string) => void;
    logout: () => void;
}

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextData>({
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const authToken = getAuthToken();
        return authToken !== null;
    });

    const login = (authToken: string) => {
        setAuthToken(authToken);
        setIsAuthenticated(true);
    }

    const logout = () => {
        removeAuthToken();
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
