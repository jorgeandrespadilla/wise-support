import { useAuth } from "hooks";
import { useCurrentUser } from "hooks/useCurrentUser";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
    redirectTo?: string;
    /** The roles that are allowed to access the route. If not specified, all roles are allowed. */
    allowed?: string[];
    children: JSX.Element;
};

let initialRender = true;

/**
 * A component that secures a route based on session status and role.
 */
function ProtectedRoute({
    redirectTo = "/login",
    allowed: roles,
    children,
}: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();
    const { isAuthorized, isLoading } = useCurrentUser();
    const location = useLocation();

    if (!isAuthenticated || (!isLoading && !isAuthorized())) {
        const state = initialRender ? { pathname: location.pathname } : undefined;
        return <Navigate to={redirectTo} state={state} replace />;
    }
    else if (!isAuthenticated || (!isLoading && !isAuthorized(roles))) {
        return <Navigate to="/unauthorized" replace />;
    }
    initialRender = false;

    return children;
}

export default ProtectedRoute;
