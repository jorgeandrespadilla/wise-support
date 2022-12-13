import { CellProps } from "./types";

const contentPosition = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
}

function Cell({
    colSpan = 1,
    align = "start",
    disabled = false,
    children,
}: CellProps) {
    return (
        <td colSpan={colSpan} className={`font-poppins ${disabled ? "text-gray-500" : "text-gray-800"} p-4 py-2 border-0`}>
            <div className={`flex ${contentPosition[align]} items-center`}>
                {children}
            </div>
        </td>
    );
}

export default Cell;