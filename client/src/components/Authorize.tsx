import { useCurrentUser } from "hooks/useCurrentUser";

type AuthorizeProps = {
    roles: string[];
    children: JSX.Element;
}

/**
 * A component that only renders its children if the current user is authorized, based on the given roles.
 */
function Authorize({
    roles,
    children,
}: AuthorizeProps) {
    const { isAuthorized } = useCurrentUser();

    if (!isAuthorized(roles)) {
        return null;
    }

    return children;
}

export default Authorize;