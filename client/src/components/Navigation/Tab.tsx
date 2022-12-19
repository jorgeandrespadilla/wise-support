import { NavLink } from "react-router-dom";

type TabProps = {
    to: string;
    label: string;
}

function Tab({ to, label }: TabProps) {
    return (
        <NavLink className={
            ({ isActive }: { isActive: boolean }) => {
                return `block hover:bg-blue-100 dark:hover:bg-opacity-10 px-4 py-2 rounded-t-md transition-all duration-300 border-b-2 ${isActive ? "text-blue-500 border-blue-500" : "text-gray-500 dark:text-gray-400 border-transparent"}`;
            }
        } to={to}>
            {label}
        </NavLink>
    );
}

export default Tab;