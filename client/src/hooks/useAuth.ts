import { useContext } from "react";
import { AuthContext } from "context/AuthProvider";

export const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
}
