import Button from "components/Button";
import Card from "components/Card";
import { PasswordField, TextField } from "components/Form";
import { useAuth } from "hooks";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateUser } from "services/authentication";
import { LoginRequest } from "types";
import { handleAPIError } from "utils/validation";

type FormData = LoginRequest;

function LoginForm() {
    const { control, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (user: FormData) => {
        const targetPath = location.state ? location.state.pathname : "/";
        authenticateUser(user).then(data => {
            login(data.authToken);
            navigate(targetPath);
        }).catch((err) => {
            handleAPIError(err, { form });
        });
    };

    if (isAuthenticated) {
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <Card>
                <div className="flex flex-col pb-10 space-y-4">
                    <TextField name="email" label="Correo" control={control} />
                    <PasswordField name="password" label="Clave" control={control} togglePassword={true} />
                </div>
                <Button rounded='full' size='lg' submitForm>Iniciar Sesión</Button>
            </Card>
        </form>
    );
}

export default LoginForm;