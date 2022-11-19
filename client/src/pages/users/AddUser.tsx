import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import Card from "components/Card";
import { today } from "utils/dateHelpers";
import { handleAPIError } from "utils/validation";
import { DatePicker, DropdownField, PasswordField, TextField } from "components/Form";
import { addUser } from "services/users";
import { useRolesData } from "hooks/useRolesData";
import { AddUserRequest } from "types";
import { useLoadingToast } from "hooks/useLoadingToast";
import { useMutation } from "@tanstack/react-query";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
    roleId: string;
}

function AddUser() {

    const navigate = useNavigate();
    
    const { control, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            roleId: "",
            password: "",
            birthDate: today().toISO(),
        },
    });

    const roles = useRolesData();

    const addUserToast = useLoadingToast("addUser", {
        loading: "Agregando usuario...",
        success: "Usuario agregado",
    });
    const { mutate: handleAdd } = useMutation(
        async (user: FormData) => {
            addUserToast.loading();
            const request: AddUserRequest = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roleId: Number(user.roleId),
                password: user.password,
                birthDate: user.birthDate,
            };
            await addUser(request);
        },
        {
            onSuccess: () => {
                addUserToast.success();
                navigate("/users");
            },
            onError: (e) => {
                addUserToast.error();
                handleAPIError(e, { form, toastId: addUserToast.toastId });
            },

        },
    );

    return (
        <Card>
            <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Nuevo Usuario</h1>
            <div className="flex flex-col pb-8 space-y-4">
                <TextField name="firstName" label="Nombre" control={control} />
                <TextField name="lastName" label="Apellido" control={control} />
                <TextField type="email" name="email" label="Correo" control={control} />
                <PasswordField name="password" label="Clave" control={control} />
                <DatePicker name="birthDate" label="Fecha de nacimiento" control={control} />
                <DropdownField name="roleId" label="Rol" placeholder="Seleccione un rol" control={control}>
                    {roles.data?.map((role) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </DropdownField>
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleSubmit(handleAdd)}>Guardar</Button>
                <Link to="/users">
                    <Button type="secondary">Cancelar</Button>
                </Link>
            </div>
        </Card>
    );
}

export default AddUser;