import { NavLink } from "react-router-dom";
import { ArrowLeftOnRectangleIcon, ChevronDownIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Authorize from "components/Authorize";
import Avatar from "components/Avatar";
import DropdownMenu from "components/DropdownMenu";
import NavItem from "./NavItem";
import { useAuth, useTheme, useCurrentUser } from "hooks";
import { DropdownMenuOption, LinkConfig } from "types/ui";
import logoLight from 'assets/logo-light.svg';
import logoDark from 'assets/logo-dark.svg';

type NavigationProps = {
  appTitle: string;
  links: LinkConfig[];
};

function TopBar({
  appTitle = "",
  links = []
}: NavigationProps) {
  const { syncLogout } = useAuth();
  const { isDarkTheme } = useTheme();
  const { user } = useCurrentUser();

  const dropdownMenuOptions: DropdownMenuOption[][] = [
    [
      {
        label: "Perfil",
        icon: <UserCircleIcon className="h-5 w-5" />,
        navigateTo: "/profile",
      },
      {
        label: "Ajustes",
        icon: <Cog6ToothIcon className="h-5 w-5" />,
        navigateTo: "/settings",
      }
    ],
    [
      {
        label: "Cerrar sesión",
        icon: <ArrowLeftOnRectangleIcon className="w-5 h-5" />,
        action: () => syncLogout()
      }
    ]
  ];

  return (
    <header className="flex flex-row justify-between items-center dark:bg-slate-800 border-b-2 border-gray-200 dark:border-gray-700 px-8 py-4">
      <div className="flex flex-row items-center space-x-10">
        <NavLink to="/">
          {
            isDarkTheme
              ? <img src={logoDark} alt={appTitle} title={appTitle} className="h-10" />
              : <img src={logoLight} alt={appTitle} title={appTitle} className="h-10" />
          }
        </NavLink>
        <ul className="flex flex-row space-x-2">
          {
            links.map((link, index) => (
              <Authorize roles={link.roles} key={index}>
                <NavItem to={link.to} icon={link.icon} label={link.label} index={index} />
              </Authorize>
            ))
          }
        </ul>
      </div>
      <DropdownMenu
        toggle={
          <div className="flex flex-row items-center space-x-2 cursor-pointer text-gray-600 dark:text-slate-300">
            <Avatar userName={user?.fullName ?? ""} />
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        }
        optionGroups={dropdownMenuOptions} />
    </header>
  );
}

export default TopBar;