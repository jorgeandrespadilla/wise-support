import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import Card from "components/Card";
import api from "utils/api";
import toast from "utils/toast";
import { today } from "utils/dateHelpers";
import { handleAPIError } from "utils/validation";
import { DatePicker, PasswordField, TextField } from "components/Form";

type AddUserForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
};

function AddUser() {
    const { control, setError, handleSubmit } = useForm<AddUserForm>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            birthDate: today().toISO(),
        },
    });
    const navigate = useNavigate();

    const addUser = (user: AddUserForm) => {
        api.post("/users", user).then(() => {
            toast.success("Usuario agregado");
            navigate("/users");
        }).catch((err) => {
            handleAPIError(err, { setFormError: setError });
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
                <Button onClick={handleSubmit(addUser)}>Guardar</Button>
                <Link to="/users">
                    <Button type="secondary">Cancelar</Button>
                </Link>
            </div>
        </Card>
    );
}

export default AddUser;