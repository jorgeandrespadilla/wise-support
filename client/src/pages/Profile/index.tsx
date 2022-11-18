import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import Button from "components/Button";
import Card from "components/Card";
import InfoLabel from "components/InfoLabel";
import Loader from "components/Loader";
import { useNavigate } from "react-router-dom";
import { getProfile } from "services/users";
import { isDefined } from "utils/dataHelpers";
import { formatDate, parseISODate } from "utils/dateHelpers";
import { handleAPIError } from "utils/validation";

function Profile() {

    const navigate = useNavigate();

    const { data: user, isLoading } = useQuery(['user'],
        async () => {
            return await getProfile();
        },
        {
            onError: (e) => {
                handleAPIError(e);
            },
        }
    );

    return (
        <Card>
            <div className="text-2xl font-bold text-gray-800 pb-4">
                <UserCircleIcon className="inline-block w-8 h-8 mr-2 align-middle" />
                <h1 className="inline-block align-middle font-poppins pr-4">Perfil de Usuario</h1>
            </div>
            {
                isLoading
                    ? (
                        <div className="flex justify-center p-4 py-3">
                            <Loader />
                        </div>
                    ) : (isDefined(user)
                        ? (
                            <>
                                <div className="flex flex-col pb-8 space-y-4">
                                    <InfoLabel label="Nombre" value={user.fullName} />
                                    <InfoLabel label="Correo" value={user.email} />
                                    <InfoLabel label="Rol" value={user.role.name} />
                                    <InfoLabel label="Fecha de nacimiento" value={formatDate(parseISODate(user.birthDate))} />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                    <Button type="secondary" onClick={() => navigate(-1)}>Volver</Button>
                                </div>

                            </>
                        )
                        : (
                            <div className="flex justify-center p-4 py-3">
                                <p className="text-sm text-neutral font-poppins">No se pudo recuperar la información de su perfil</p>
                            </div>
                        )
                    )
            }
        </Card>
    );
}

export default Profile;