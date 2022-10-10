import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "components/Button";
import Card from "components/Card";
import DatePicker from "components/DatePicker";
import Input from "components/Input";
import PasswordInput from "components/PasswordInput";
import api from "utils/api";
import toast from "utils/toast";
import { parseISODate, today } from "utils/dateHelpers";
import { UserInput } from "types";

function EditUser() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState(today());

    useEffect(() => {
        api.get<UserInput>(`/users/${id}`).then((res) => {
            setFirstName(res.firstName);
            setLastName(res.lastName);
            setEmail(res.email);
            setBirthDate(parseISODate(res.birthDate));
        }).catch((err) => {
            console.error(err);
            toast.error(err.message);
            navigate("/users");
        });
    }, [id, navigate]);

    function updateUser() {
        api.put(`/users/${id}`, {
            firstName,
            lastName,
            email,
            password,
            birthDate,
        }).then(() => {
            toast.success("Usuario actualizado");
            navigate("/users");
        }).catch((err) => {
            console.error(err);
            toast.error(err.message);
        });
    }

    return (
        <Card>
            <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Nuevo Usuario</h1>
            <div className="flex flex-col pb-8 space-y-4">
                <Input label="Nombre" value={firstName} onChange={setFirstName} />
                <Input label="Apellido" value={lastName} onChange={setLastName} />
                <Input type="email" label="Correo" value={email} onChange={setEmail} />
                <PasswordInput label="Clave" value={password} onChange={setPassword} />
                <DatePicker label="Fecha de nacimiento" value={birthDate} onChange={setBirthDate} />
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={() => updateUser()}>Guardar</Button>
                <Link to="/users">
                    <Button type="secondary">Cancelar</Button>
                </Link>
            </div>
        </Card>
    );
}

export default EditUser;
