import { LockClosedIcon } from '@heroicons/react/24/solid';
import Button from 'components/Button';
import Card from 'components/Card';
import { PasswordField, TextField } from 'components/Form';
import api from "utils/api";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleAPIError } from 'utils/validation';

interface LoginForm {
    email: string;
    password: string;
}

function Login() {
    const { control, setError, handleSubmit } = useForm<LoginForm>({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const navigate = useNavigate();

    const authenticateUser = (user: LoginForm) => {
        api.post("/login", user).then(() => {
            navigate("/");
        }).catch((err) => {
            handleAPIError(err, setError);
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex items-center flex-grow bg-gray-100 px-6 py-8 lg:px-20 lg:py-10">
                <div className="flex-grow">
                    <div className="max-w-md mx-auto mb-8">
                        <div className="text-3xl font-bold text-primary text-center mb-12">
                            <LockClosedIcon className="inline-block w-10 h-10 mr-3 text-primary align-middle" />
                            <h1 className="inline-block align-middle font-poppins pr-4">Inicio de Sesión</h1>
                        </div>
                        <Card>
                            <div className="flex flex-col pb-10 space-y-4">
                                <TextField name="email" label="Correo" control={control} />
                                <PasswordField name="password" label="Clave" control={control} togglePassword={true} />
                            </div>
                            <Button rounded='full' size='lg' onClick={handleSubmit(authenticateUser)}>Iniciar sesión</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;