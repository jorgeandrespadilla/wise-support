import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { auth0 } from 'shared/constants/config';

type Auth0ProviderWithNavigateProps = {
    children: React.ReactNode;
};

export const Auth0ProviderWithNavigate = ({
    children,
}: Auth0ProviderWithNavigateProps) => {
    const navigate = useNavigate();

    const onRedirectCallback = (appState: AppState | undefined) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={auth0.domain}
            clientId={auth0.clientId}
            authorizationParams={{
                redirect_uri: window.location.origin + '/login',
                display: 'page',
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};
