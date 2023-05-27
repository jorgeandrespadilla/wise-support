import Avatar from 'components/Avatar';
import Card from 'components/Card';
import Divider from 'components/Divider';
import Loader from 'components/Loader';
import UserInfo from './components/UserInfo';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { user, isLoading } = useCurrentUser();
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Card>
            <div className="text-2xl font-bold text-gray-800 pb-4 flex flex-row items-center gap-4">
                <Avatar userName={user?.fullName ?? ''} />
                <h1 className="inline-block align-middle font-poppins pr-4 dark:text-white">
                    Perfil de Usuario
                </h1>
            </div>
            <Divider vertical="sm" showRule />
            {isLoading ? (
                <div className="flex justify-center p-4 py-3 pt-4">
                    <Loader />
                </div>
            ) : (
                <UserInfo user={user} onGoBack={goBack} />
            )}
        </Card>
    );
}

export default Profile;
