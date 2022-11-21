import { useMutation } from "@tanstack/react-query";
import Button from "components/Button";
import Card from "components/Card";
import { PasswordField, TextField } from "components/Form";
import { useAuth, useLoadingToast } from "hooks";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateUser } from "services/authentication";
import { LoginRequest } from "types";
import { handleAPIError } from "utils/validation";

type FormData = {
    email: string;
    password: string;
}

function LoginForm() {

    const navigate = useNavigate();
    const location = useLocation();

    const { control, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { isAuthenticated, login } = useAuth();

    const loginToast = useLoadingToast("login", {
        loading: "Validando credenciales...",
    });
    const { mutate: handleLogin } = useMutation(
        async (credentials: FormData) => {
            loginToast.loading();
            const request: LoginRequest = {
                email: credentials.email,
                password: credentials.password,
            };
            return await authenticateUser(request);
        },
        {
            onSuccess: (data) => {
                loginToast.success();
                const targetPath = location.state ? location.state.pathname : "/";
                login(data.authToken);
                navigate(targetPath);
            },
            onError: (e) => {
                loginToast.error();
                handleAPIError(e, { form, toastId: loginToast.toastId });
            },

        },
    );

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