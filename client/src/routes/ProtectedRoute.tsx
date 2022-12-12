import { useCurrentUser } from "hooks/useCurrentUser";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
    redirectTo?: string;
    /** The roles that are allowed to access the route. If not specified, all roles are allowed. */
    allowed?: string[];
    children: JSX.Element;
};

/**
 * A component that secures a route based on session status and role.
 */
function ProtectedRoute({
    redirectTo = "/login",
    allowed: roles,
    children,
}: ProtectedRouteProps) {
    const { isAuthorized } = useCurrentUser();
    const location = useLocation();

    if (!isAuthorized()) {
        return <Navigate to={redirectTo} state={{ pathname: location.pathname }} replace />;
    }
    else if (!isAuthorized(roles)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return children;
}

export default ProtectedRoute;
