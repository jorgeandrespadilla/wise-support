import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import LoginLayout from './components/LoginLayout';
import { useCallback, useEffect } from 'react';
import { logo } from 'assets';
import { useAuth0 } from '@auth0/auth0-react';
import { useLoadingToast } from 'hooks';
import { useMutation } from '@tanstack/react-query';
import { handleAPIError } from 'utils/validation';
import { authenticate } from 'services/authentication';
import { LoginRequest } from 'types';

function Login() {
    const { isAuthenticated, syncLogin } = useAuth();
    const {
        isLoading,
        loginWithRedirect,
        isAuthenticated: isAuth0Authenticated,
        getIdTokenClaims,
    } = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();

    const navigateHome = useCallback(() => {
        const targetPath = location.state ? location.state.pathname : '/';
        navigate(targetPath, { replace: true });
    }, [location.state, navigate]);

    const loginToast = useLoadingToast('login', {
        loading: 'Iniciando sesión...',
    });
    const { mutate: handleLogin } = useMutation(
        async () => {
            loginToast.loading();
            const tokenClaims = await getIdTokenClaims();
            if (!tokenClaims) {
                throw new Error(
                    'No fue posible recuperar la información de sesión',
                );
            }
            const request: LoginRequest = {
                token: tokenClaims.__raw,
            };
            return await authenticate(request);
        },
        {
            onSuccess: data => {
                loginToast.success();
                syncLogin({
                    accessToken: data.accessToken.token,
                    refreshToken: data.refreshToken.token,
                    expiresInMilliseconds: data.accessToken.expiresIn,
                });
            },
            onError: e => {
                loginToast.error();
                handleAPIError(e, { toastId: loginToast.toastId });
            },
        },
    );

    // Redirect to home if the user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigateHome();
        }
    }, [isAuthenticated, navigateHome]);

    useEffect(() => {
        if (!isAuthenticated && !isLoading && !isAuth0Authenticated) {
            loginWithRedirect();
        }
        if (!isAuthenticated && isAuth0Authenticated) {
            handleLogin();
        }
    }, [
        isAuthenticated,
        isAuth0Authenticated,
        loginWithRedirect,
        isLoading,
        handleLogin,
    ]);

    // Avoid rendering the login page if the user is already authenticated (minimize flickering)
    if (isAuthenticated) {
        return null;
    }

    return (
        <LoginLayout>
            <div className="max-w-md mx-auto mb-8">
                <div className="flex flex-col gap-8 justify-center mb-12">
                    <img
                        src={logo.light}
                        alt={'Wise Support'}
                        title={'Wise Support'}
                        className="h-20"
                    />
                    <h1 className="font-bold font-poppins text-3xl text-primary text-center">
                        Wise Support
                    </h1>
                </div>
            </div>
        </LoginLayout>
    );
}

export default Login;
