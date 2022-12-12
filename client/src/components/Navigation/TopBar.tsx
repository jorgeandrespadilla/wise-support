import Authorize from "components/Authorize";
import Button from "components/Button";
import { useAuth } from "hooks/useAuth";
import { NavLink } from "react-router-dom";
import { LinkConfig } from "types/ui";
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

  function handleLogout() {
    syncLogout();
  }

  return (
    <header className="flex flex-row justify-between items-center border-b-2 border-gray-200 px-6 py-4">
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
      <Button onClick={handleLogout}>Cerrar sesión</Button>
    </header>
  );
}

export default TopBar;