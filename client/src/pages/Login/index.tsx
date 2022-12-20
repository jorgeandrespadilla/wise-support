import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import LoginForm from './components/LoginForm';
import LoginLayout from './components/LoginLayout';
import { useCallback, useEffect } from 'react';
import logoLight from 'assets/logo-light.svg';

function Login() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const navigateHome = useCallback(() => {
        const targetPath = location.state ? location.state.pathname : '/';
        navigate(targetPath, { replace: true });
    }, [location.state, navigate]);

    // Redirect to home if the user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigateHome();
        }
    }, [isAuthenticated, navigateHome]);

    // Avoid rendering the login page if the user is already authenticated (minimize flickering)
    if (isAuthenticated) {
        return null;
    }

    return (
        <LoginLayout>
            <div className="max-w-md mx-auto mb-8">
                <div className="flex flex-col gap-8 justify-center mb-12">
                    <img
                        src={logoLight}
                        alt={'Wise Support'}
                        title={'Wise Support'}
                        className="h-20"
                    />
                    <h1 className="font-bold font-poppins text-3xl text-primary text-center">
                        Inicio de Sesión
                    </h1>
                </div>
                <LoginForm />
            </div>
        </LoginLayout>
    );
}

export default Login;
