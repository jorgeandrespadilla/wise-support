import { useMutation } from "@tanstack/react-query";
import Button from "components/Button";
import Card from "components/Card";
import { PasswordField, TextField } from "components/Form";
import { useAuth, useLoadingToast } from "hooks";
import { useForm } from "react-hook-form";
import { authenticate } from "services/authentication";
import { LoginRequest } from "types";
import { handleAPIError, InferSchemaType, schemaResolver } from "utils/validation";
import { LoginFormSchema } from "schemas/authentication";

type FormData = InferSchemaType<typeof LoginFormSchema>;

function LoginForm() {
    const { syncLogin } = useAuth();

    const { control, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: schemaResolver(LoginFormSchema)
    });

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
            return await authenticate(request);
        },
        {
            onSuccess: (data) => {
                loginToast.success();
                syncLogin({
                    accessToken: data.accessToken.token,
                    refreshToken: data.refreshToken.token,
                    expiresInMilliseconds: data.accessToken.expiresIn,
                });
            },
            onError: (e) => {
                loginToast.error();
                handleAPIError(e, { form, toastId: loginToast.toastId });
            },

        },
    );

    return (
        <form onSubmit={handleSubmit(data => handleLogin(data))}>
            <Card>
                <div className="flex flex-col pb-10 space-y-4">
                    <TextField name="email" label="Correo" control={control} />
                    <PasswordField name="password" label="Clave" control={control} togglePassword={true} />
                </div>
                <Button as="submit" rounded='full' size='lg'>Iniciar Sesión</Button>
            </Card>
        </form>
    );
}

export default LoginForm;