import Button from "components/Button";
import Card from "components/Card";
import DatePicker from "components/DatePicker";
import Input from "components/Input";
import MainLayout from "components/MainLayout";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserInput } from "types";
import api from "utils/api";
import toast from "utils/toast";

function AddUser() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());

    const addUser = () => {
        api.post("/users", {
            firstName,
            lastName,
            email,
            password,
            birthDate,
        }).then(() => {
            toast.success("Usuario agregado");
            navigate("/users");
        }).catch((err) => {
            console.error(err);
            toast.error(err.message);
        });
    };

    return (
        <MainLayout>
            <Card>
                <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Nuevo Usuario</h1>
                <div className="flex flex-col pb-8 space-y-4">
                    <Input label="Nombre" value={firstName} onChange={setFirstName} />
                    <Input label="Apellido" value={lastName} onChange={setLastName} />
                    <Input label="Correo" value={email} onChange={setEmail} />
                    <Input label="Clave" value={password} onChange={setPassword} type="password" />
                    <DatePicker label="Fecha de nacimiento" value={birthDate} onChange={setBirthDate} />
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => addUser()}>Guardar</Button>
                    <Link to="/users">
                        <Button type="secondary">Cancelar</Button>
                    </Link>
                </div>
            </Card>
        </MainLayout>
    );
}

export default AddUser;