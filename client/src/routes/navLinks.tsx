import {
    BookOpenIcon,
    ChartPieIcon,
    RectangleStackIcon,
    TagIcon,
    UsersIcon,
} from '@heroicons/react/24/solid';
import { allRoles, role } from 'shared/constants/roles';
import { LinkConfig } from 'types';

const navLinks: LinkConfig[] = [
    {
        key: 'tickets',
        to: '/tickets',
        label: 'Tickets',
        icon: <RectangleStackIcon className="h-5 w-5" />,
        roles: allRoles,
    },
    {
        key: 'users',
        to: '/users',
        label: 'Usuarios',
        icon: <UsersIcon className="h-5 w-5" />,
        roles: [role.ADMIN],
    },
    {
        key: 'categories',
        to: '/categories',
        label: 'Categorías',
        icon: <TagIcon className="h-5 w-5" />,
        roles: [role.ADMIN],
    },
    {
        key: 'stats',
        to: '/stats',
        label: 'Estadísticas',
        icon: <ChartPieIcon className="h-5 w-5" />,
        roles: [role.ADMIN, role.SUPERVISOR],
    },
    {
        key: 'articles',
        to: '/articles',
        label: 'Base de conocimientos',
        icon: <BookOpenIcon className="h-5 w-5" />,
        roles: [role.ADMIN],
    },
];

export default navLinks;
