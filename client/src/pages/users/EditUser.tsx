import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import Card from "components/Card";
import DatePicker from "components/Form/DatePicker";
import PasswordField from "components/Form/PasswordField";
import api from "utils/api";
import toast from "utils/toast";
import { today } from "utils/dateHelpers";
import { UserInput } from "types";
import TextField from "components/Form/TextField";
import { handleAPIError } from "utils/validation";

type EditUserForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
};

function EditUser() {
    const { id } = useParams<{ id: string }>();
    const { control, reset, setError, handleSubmit } = useForm<EditUserForm>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            birthDate: today().toISO(),
        },
    });
    const navigate = useNavigate();

    useEffect(() => {
        api.get<UserInput>(`/users/${id}`).then(reset).catch((err) => {
            handleAPIError(err);
            navigate("/users");
        });
    }, [id, reset, navigate]);

    function updateUser(user: EditUserForm) {
        api.put(`/users/${id}`, user).then(() => {
            toast.success("Usuario actualizado");
            navigate("/users");
        }).catch((err) => {
            handleAPIError(err, setError);
        });
    }

    return (
        <Card>
            <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Usuario</h1>
            <div className="flex flex-col pb-8 space-y-4">
                <TextField name="firstName" label="Nombre" control={control} />
                <TextField name="lastName" label="Apellido" control={control} />
                <TextField type="email" name="email" label="Correo" control={control} />
                <PasswordField name="password" label="Clave" control={control} />
                <DatePicker name="birthDate" label="Fecha de nacimiento" control={control} />
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleSubmit(updateUser)}>Guardar</Button>
                <Link to="/users">
                    <Button type="secondary">Cancelar</Button>
                </Link>
            </div>
        </Card>
    );
}

export default EditUser;
