import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  label: string;
  icon?: React.ReactNode;
  index: number;
};

function NavItem({
  to,
  label,
  icon,
  index
}: NavItemProps) {
  return (
    <li>
      <NavLink className={
        ({ isActive }: { isActive: boolean }) => {
          return `block hover:bg-blue-100 px-4 py-2 rounded transition-all duration-300 ${isActive ? "text-blue-500" : "text-gray-500"}`;
        }
      } key={index} to={to}>
        <div className="flex flex-row gap-2 items-center">
          {icon}
          {label}
        </div>
      </NavLink>
    </li>
  );
}

export default NavItem;