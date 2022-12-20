import {
    ChartPieIcon,
    RectangleStackIcon,
    TagIcon,
    UsersIcon,
} from '@heroicons/react/24/solid';
import { allRoles, role } from 'shared/constants/roles';
import { LinkConfig } from 'types';

const navLinks: LinkConfig[] = [
    {
        to: '/tickets',
        label: 'Tickets',
        icon: <RectangleStackIcon className="h-5 w-5" />,
        roles: allRoles,
    },
    {
        to: '/users',
        label: 'Usuarios',
        icon: <UsersIcon className="h-5 w-5" />,
        roles: [role.ADMIN],
    },
    {
        to: '/categories',
        label: 'Categorías',
        icon: <TagIcon className="h-5 w-5" />,
        roles: [role.ADMIN],
    },
    {
        to: '/stats',
        label: 'Estadísticas',
        icon: <ChartPieIcon className="h-5 w-5" />,
        roles: [role.ADMIN, role.SUPERVISOR],
    },
];

export default navLinks;
