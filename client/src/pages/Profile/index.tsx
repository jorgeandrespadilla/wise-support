import Avatar from "components/Avatar";
import Button from "components/Button";
import Card from "components/Card";
import InfoLabel from "components/InfoLabel";
import Loader from "components/Loader";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { isDefined } from "utils/dataHelpers";
import { formatDateForDisplay } from "utils/dateHelpers";

function Profile() {
    const { user, isLoading } = useCurrentUser();
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Card>
            <div className="text-2xl font-bold text-gray-800 pb-4 flex flex-row items-center gap-4">
                <Avatar userName={user?.fullName ?? ""} />
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
                                    <InfoLabel label="Fecha de nacimiento" value={formatDateForDisplay(new Date(user.birthDate))} />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                    <Button type="secondary" onClick={goBack}>Regresar</Button>
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