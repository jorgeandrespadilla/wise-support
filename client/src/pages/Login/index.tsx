import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import LoginForm from './components/LoginForm';
import LoginLayout from './components/LoginLayout';
import { useCallback, useEffect } from 'react';


function Login() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const navigateHome = useCallback(() => {
        const targetPath = location.state ? location.state.pathname : "/";
        navigate(targetPath, { replace: true });
    }, [location.state, navigate])

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
                <div className="text-3xl font-bold text-primary text-center mb-12">
                    <LockClosedIcon className="inline-block w-10 h-10 mr-3 text-primary align-middle" />
                    <h1 className="inline-block align-middle font-poppins pr-4">Inicio de Sesión</h1>
                </div>
                <LoginForm />
            </div>
        </LoginLayout>
    );
}

export default Login;