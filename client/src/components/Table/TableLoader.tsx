import Loader from "components/Loader";
import Cell from "./Cell";

function TableLoader() {
    return (
        <tr>
            <Cell colSpan={100} align="center">
                <div className="flex py-3">
                    <Loader />
                </div>
            </Cell>
        </tr>
    );
}

export default TableLoader;