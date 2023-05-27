import Button from 'components/Button';
import InfoLabel from 'components/InfoLabel';
import { UserProfile } from 'types';
import { isDefined } from 'utils/dataHelpers';
import { formatDateForDisplay } from 'utils/dateHelpers';

type UserInfoProps = {
    user?: UserProfile;
    onGoBack?: () => void;
};

function UserInfo({ user, onGoBack = () => {} }: UserInfoProps) {
    function handleGoBack() {
        onGoBack();
    }

    if (!isDefined(user)) {
        return (
            <div className="flex justify-center p-4 py-3">
                <p className="text-sm text-neutral font-poppins">
                    No se pudo recuperar la información de su perfil
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col pb-8 space-y-4 pt-4">
                <InfoLabel label="Nombre" value={user.fullName} />
                <InfoLabel label="Correo" value={user.email} />
                <InfoLabel label="Rol" value={user.role.name} />
                <InfoLabel
                    label="Fecha de nacimiento"
                    value={formatDateForDisplay(new Date(user.birthDate))}
                />
            </div>
            <div className="flex justify-start items-center space-x-2">
                <Button type="secondary" onClick={handleGoBack}>
                    Regresar
                </Button>
            </div>
        </>
    );
}

export default UserInfo;
