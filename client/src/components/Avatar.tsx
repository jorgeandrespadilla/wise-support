import { UserCircleIcon } from '@heroicons/react/24/solid';
import { getInitials } from 'utils/dataHelpers';

type AvatarProps = {
    userName: string;
};

function Avatar({ userName }: AvatarProps) {
    const initials = getInitials(userName);

    return (
        <div>
            {initials ? (
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                    {initials}
                </div>
            ) : (
                <UserCircleIcon className="w-12 h-12 text-blue-500" />
            )}
        </div>
    );
}

export default Avatar;
