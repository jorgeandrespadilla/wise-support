import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import LoginForm from './components/LoginForm';
import LoginLayout from './components/LoginLayout';


function Login() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) {
        navigate("/");
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