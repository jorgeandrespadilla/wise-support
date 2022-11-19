import { NavLink } from "react-router-dom";

type TabProps = {
    to: string;
    label: string;
}

function Tab({ to, label }: TabProps) {
    return (
        <NavLink className={
            ({ isActive }: { isActive: boolean }) => {
                return `block hover:bg-blue-100 px-4 py-2 rounded-t-md transition-all duration-300 text-gray-500 ${isActive ? "text-blue-500 border-b-2 border-blue-500" : ""}`;
            }
        } to={to}>
            {label}
        </NavLink>
    );
}

export default Tab;