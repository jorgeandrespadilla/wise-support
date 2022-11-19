import { CellProps } from "./types";

function HeaderCell({
    children,
}: CellProps) {
    return (
        <th className="font-bold font-poppins text-gray-800 p-4 border-0">
            {children}
        </th>
    );
}

export default HeaderCell;