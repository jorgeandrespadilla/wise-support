import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Auth0ProviderWithNavigate = ({ children }) => {
    const navigate = useNavigate();

    const onRedirectCallback = appState => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain="dev-elgicwj5ri55kw4p.us.auth0.com"
            clientId="S4LAGU6ylXdUHX8OIJlgvaoB4lujZN7u"
            authorizationParams={{
                redirect_uri: window.location.origin + '/login',
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};
