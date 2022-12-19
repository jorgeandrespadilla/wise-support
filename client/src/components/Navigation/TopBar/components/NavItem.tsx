import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  label: string;
  icon?: React.ReactNode;
  index: number;
  size?: "md" | "lg";
  onClick?: () => void;
};

export const itemSize = {
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-md',
};

function NavItem({
  to,
  label,
  icon,
  index,
  size = "md",
  onClick = () => {},
}: NavItemProps) {
  return (
    <li>
      <NavLink className={
        ({ isActive }: { isActive: boolean }) => {
          return `block hover:bg-blue-100 dark:hover:bg-opacity-10 rounded transition-all duration-300 ${itemSize[size]} ${isActive ? "text-blue-500" : "text-gray-500 dark:text-gray-200"}`;
        }
      } key={index} to={to} onClick={onClick}>
        <div className="flex flex-row gap-2 items-center">
          {icon}
          {label}
        </div>
      </NavLink>
    </li>
  );
}

export default NavItem;