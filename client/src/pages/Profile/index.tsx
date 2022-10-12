import { UserCircleIcon } from "@heroicons/react/24/solid";
import Button from "components/Button";
import Card from "components/Card";
import InfoLabel from "components/InfoLabel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "types";
import api from "utils/api";
import { formatDate, parseISODate } from "utils/dateHelpers";

function Profile() {
    const [user, setUser] = useState<UserData>();
    const navigate = useNavigate();

    useEffect(() => {
        api.get<UserData>("/users/me").then((data) => {
            setUser(data);
        });
    }, []);

    return (
        <Card>
            <div className="text-2xl font-bold text-gray-800 pb-4">
                <UserCircleIcon className="inline-block w-8 h-8 mr-2 align-middle" />
                <h1 className="inline-block align-middle font-poppins pr-4">Perfil de Usuario</h1>
            </div>
            {
                user && (
                    <>
                        <div className="flex flex-col pb-8 space-y-4">
                            <InfoLabel label="Nombre" value={user.fullName} />
                            <InfoLabel label="Correo" value={user.email} />
                            <InfoLabel label="Fecha de nacimiento" value={formatDate(parseISODate(user.birthDate))} />
                        </div>
                        <div className="flex justify-start items-center space-x-2">
                            <Button type="secondary" onClick={() => navigate(-1)}>Volver</Button>
                        </div>

                    </>
                )
            }
        </Card>
    );
}

export default Profile;