import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  label: string;
  index: number;
};

function NavItem({
  to,
  label,
  index
}: NavItemProps) {
  return (
    <li className="mr-4">
      <NavLink key={index} className={
        (isActive: boolean) => {
          return `text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded transition-all duration-300 px-4 py-2 ${isActive ? "underline" : ""}`;
        }
      } to={to}>
        {label}
      </NavLink>
    </li>
  );
}

export default NavItem;