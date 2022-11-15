import Cell from "./Cell";

type TableEmptyProps = {
    label?: string;
}

function TableEmpty({ label = "No se encontraron resultados" }: TableEmptyProps) {
    return (
        <tr>
            <Cell colSpan={100} align="center">
                <div className="text-sm text-neutral p-4 py-3">
                    {label}
                </div>
            </Cell>
        </tr>
    );
}

export default TableEmpty;