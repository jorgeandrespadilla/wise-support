import { ArrowLeftOnRectangleIcon, ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Authorize from "components/Authorize";
import Avatar from "components/Avatar";
import DropdownMenu from "components/DropdownMenu";
import { useAuth } from "hooks/useAuth";
import { useCurrentUser } from "hooks/useCurrentUser";
import { NavLink } from "react-router-dom";
import { DropdownMenuOption, LinkConfig } from "types/ui";
import NavItem from "./NavItem";

type NavigationProps = {
  title: string;
  links: LinkConfig[];
};

function TopBar({
  title = "",
  links = []
}: NavigationProps) {
  const { syncLogout } = useAuth();
  const { user } = useCurrentUser();

  const dropdownMenuOptions: DropdownMenuOption[][] = [
    [
      {
        label: "Perfil",
        icon: <UserCircleIcon className="h-5 w-5" />,
        navigateTo: "/profile",
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
    <header className="flex flex-row justify-between items-center border-b-2 border-gray-200 px-8 py-4">
      <div className="flex flex-row items-center space-x-10">
        <NavLink to="/">
          <h1 className="font-bold text-xl text-blue-500">{title}</h1>
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
          <div className="flex flex-row items-center space-x-2 cursor-pointer text-gray-600">
            <Avatar userName={user?.fullName ?? ""} />
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        } 
        optionGroups={dropdownMenuOptions} />
    </header>
  );
}

export default TopBar;