import { InboxArrowDownIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Outlet } from "react-router-dom";
import { allRoles, role } from "shared/constants/roles";
import { LinkConfig } from "types/ui";
import TopBar from "./Navigation/TopBar";

const links: LinkConfig[] = [
  { 
    to: "/tickets",
    label: "Tickets",
    icon: <InboxArrowDownIcon className="h-5 w-5 mr-2" />,
    roles: allRoles
  },
  { 
    to: "/users",
    label: "Usuarios",
    icon: <UserGroupIcon className="h-5 w-5 mr-2" />,
    roles: [role.ADMIN]
  },
  { 
    to: "/profile",
    label: "Perfil",
    icon: <UserCircleIcon className="h-5 w-5 mr-2" />,
    roles: allRoles
  },
];

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar title="Ingeniería Web" links={links} />
      <main className="flex-grow px-6 py-8 lg:px-20 lg:py-10 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;