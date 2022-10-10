import { LinkConfig } from "types/ui";
import NavItem from "./NavItem";

type NavigationProps = {
  title: string;
  links: LinkConfig[];
};

function Navigation({
  title = "",
  links = []
}: NavigationProps) {
  return (
    <header className="flex flex-row justify-between items-center border-b-2 border-gray-200 px-6 py-4">
      <h1 className="font-bold text-xl text-blue-500">{title}</h1>
      <nav className="flex flex-row justify-between">
        <ul className="flex flex-row">
          {
            links.map((link, index) => (
              <NavItem key={index} to={link.to} label={link.label} index={index} />
            ))
          }
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;