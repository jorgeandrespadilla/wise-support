import { CellProps } from "./types";

function HeaderCell({
    disabled = false,
    children,
}: CellProps) {
    return (
        <th className={`font-bold font-poppins ${disabled ? "text-gray-500" : "text-gray-800"} p-4 border-0`}>
            {children}
        </th>
    );
}

export default HeaderCell;