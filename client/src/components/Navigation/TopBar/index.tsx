import { useEffect, useState } from 'react';
import {
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    ChevronDownIcon,
    Cog6ToothIcon,
    UserCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import { Transition } from '@headlessui/react';
import Authorize from 'components/Authorize';
import Avatar from 'components/Avatar';
import DropdownMenu from 'components/DropdownMenu';
import NavItem from './components/NavItem';
import HomeLink from './components/HomeLink';
import NavToggle from './components/NavToggle';
import Divider from 'components/Divider';
import { useAuth, useCurrentUser, useMediaQuery } from 'hooks';
import { DropdownMenuConfig, LinksConfig } from 'types/ui';
import { breakpoints } from 'shared/constants/themes';
import { useAuth0 } from '@auth0/auth0-react';

type NavigationProps = {
    appTitle: string;
    links: LinksConfig;
};

function TopBar({ appTitle = '', links = [] }: NavigationProps) {
    const { syncLogout } = useAuth();
    const { user } = useCurrentUser();
    const isDesktop = useMediaQuery(breakpoints.up('md'));
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const { logout: logoutAuth0 } = useAuth0();

    useEffect(() => {
        if (isDesktop) {
            setIsNavbarOpen(false);
        }
    }, [isDesktop]);

    useEffect(() => {
        if (isNavbarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isNavbarOpen]);

    const openNavbar = () => {
        setIsNavbarOpen(true);
    };

    const closeNavbar = () => {
        setIsNavbarOpen(false);
    };

    const dropdownMenuConfig: DropdownMenuConfig = [
        {
            key: 1,
            options: [
                {
                    key: 'profile',
                    label: 'Perfil',
                    icon: <UserCircleIcon className="h-5 w-5" />,
                    navigateTo: '/profile',
                },
                {
                    key: 'settings',
                    label: 'Ajustes',
                    icon: <Cog6ToothIcon className="h-5 w-5" />,
                    navigateTo: '/settings',
                },
            ],
        },
        {
            key: 2,
            options: [
                {
                    key: 'logout',
                    label: 'Cerrar sesión',
                    icon: <ArrowLeftOnRectangleIcon className="w-5 h-5" />,
                    action: () => {
                        logoutAuth0();
                        syncLogout();
                    },
                },
            ],
        },
    ];

    return (
        <>
            <header
                className={`flex flex-row justify-between items-center dark:bg-slate-800 border-b-2 border-gray-200 dark:border-gray-700 ${
                    isDesktop ? 'px-8 py-4' : 'px-6 py-3'
                }`}
            >
                {isDesktop ? (
                    <div className="flex flex-row items-center space-x-10">
                        <HomeLink appTitle={appTitle} />
                        <ul className="flex flex-row space-x-2">
                            {links.map((link, index) => (
                                <Authorize roles={link.roles} key={link.key}>
                                    <NavItem
                                        to={link.to}
                                        icon={link.icon}
                                        label={link.label}
                                        index={index}
                                    />
                                </Authorize>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <NavToggle onClick={openNavbar}>
                        <Bars3Icon
                            className="w-10 h-10"
                            aria-hidden="true"
                            focusable="false"
                        />
                        <span className="hidden">Abrir menú</span>
                    </NavToggle>
                )}
                <DropdownMenu
                    toggle={
                        <div className="flex flex-row items-center space-x-2 cursor-pointer text-gray-600 dark:text-slate-300">
                            <Avatar userName={user?.fullName ?? ''} />
                            <ChevronDownIcon className="w-5 h-5" />
                        </div>
                    }
                    config={dropdownMenuConfig}
                />
            </header>

            {/* Side navigation bar (mobile) */}
            {isDesktop ? null : (
                <Transition
                    show={isNavbarOpen}
                    className="fixed inset-0 z-50 shadow-lg"
                    enter="transform transition ease-in-out duration-500"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <div
                        className={`w-full min-h-screen h-screen overflow-y-auto bg-white dark:bg-slate-800`}
                    >
                        <div className="flex flex-col px-6 py-6 w-full">
                            <div className="flex flex-row justify-between items-center">
                                <HomeLink
                                    appTitle={appTitle}
                                    onClick={closeNavbar}
                                />
                                <NavToggle onClick={closeNavbar}>
                                    <XMarkIcon
                                        className="w-10 h-10"
                                        aria-hidden="true"
                                        focusable="false"
                                    />
                                    <span className="hidden">Cerrar menú</span>
                                </NavToggle>
                            </div>
                            <Divider vertical="lg" showRule />
                            <ul className="flex flex-col justify-center space-y-2 w-full">
                                {links.map((link, index) => (
                                    <Authorize
                                        roles={link.roles}
                                        key={link.key}
                                    >
                                        <NavItem
                                            size="lg"
                                            to={link.to}
                                            icon={link.icon}
                                            label={link.label}
                                            index={index}
                                            onClick={closeNavbar}
                                        />
                                    </Authorize>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Transition>
            )}
        </>
    );
}

export default TopBar;
