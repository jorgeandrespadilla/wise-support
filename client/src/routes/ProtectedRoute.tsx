import { useAuth } from "hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
    redirectTo?: string;
    children: JSX.Element;
};

function ProtectedRoute({
    redirectTo = "/login",
    children,
}: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} state={{ pathname: location.pathname }} />;
    }

    return children;
}

export default ProtectedRoute;
