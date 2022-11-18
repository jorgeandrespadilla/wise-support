import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import Card from "components/Card";
import { DatePicker, DropdownField, PasswordField, TextField } from "components/Form";
import { today } from "utils/dateHelpers";
import { handleAPIError } from "utils/validation";
import { getUser, updateUser } from "services/users";
import { UpdateUserRequest } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRoles } from "hooks/useRoles";
import { useLoadingToast } from "hooks/useLoadingToast";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
    roleId: string;
}

function EditUser() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const { control, reset, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            roleId: "",
            password: "",
            birthDate: today().toISO(),
        },
    });

    const roles = useRoles();

    useQuery(['user', id],
        async () => {
            if (!id) return;
            const res = await getUser(id);
            return {
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                password: "",
                birthDate: res.birthDate,
                roleId: res.role.id.toString(),
            } as FormData;
        },
        {
            onSuccess: (data) => {
                reset(data);
            },
            onError: (e) => {
                handleAPIError(e);
                navigate("/users");
            },
            refetchOnWindowFocus: false,
        }
    );

    const editUserToast = useLoadingToast("editUser", {
        loading: "Modificando usuario...",
        success: "Usuario modificado",
    });
    const { mutate: handleUpdate } = useMutation(
        async (user: FormData) => {
            editUserToast.loading();
            const request: UpdateUserRequest = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roleId: Number(user.roleId),
                password: user.password,
                birthDate: user.birthDate,
            };
            await updateUser(id!, request);
        },
        {
            onSuccess: () => {
                editUserToast.success();
                navigate("/users");
            },
            onError: (e) => {
                editUserToast.error();
                handleAPIError(e, { form, toastId: editUserToast.toastId });
            },
        },
    );

    return (
        <Card>
            <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Usuario</h1>
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
                <Button onClick={handleSubmit(handleUpdate)}>Guardar</Button>
                <Link to="/users">
                    <Button type="secondary">Cancelar</Button>
                </Link>
            </div>
        </Card>
    );
}

export default EditUser;
