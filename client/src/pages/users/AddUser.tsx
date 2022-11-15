import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import Card from "components/Card";
import toast from "utils/toast";
import { today } from "utils/dateHelpers";
import { handleAPIError } from "utils/validation";
import { DatePicker, PasswordField, TextField } from "components/Form";
import { AddUserRequest } from "types";
import { addUser } from "services/users";

type FormData = AddUserRequest;

function AddUser() {
    const { control, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            birthDate: today().toISO(),
        },
    });
    const navigate = useNavigate();

    const handleAdd = (user: FormData) => {
        addUser(user).then(() => {
            toast.success("Usuario agregado");
            navigate("/users");
        }).catch((err) => {
            handleAPIError(err, { form });
        });
    };

    return (
        <Card>
            <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Nuevo Usuario</h1>
            <div className="flex flex-col pb-8 space-y-4">
                <TextField name="firstName" label="Nombre" control={control} />
                <TextField name="lastName" label="Apellido" control={control} />
                <TextField type="email" name="email" label="Correo" control={control} />
                <PasswordField name="password" label="Clave" control={control} />
                <DatePicker name="birthDate" label="Fecha de nacimiento" control={control} />
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