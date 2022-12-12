import Card from "components/Card";
import TabBar from "components/Navigation/TabBar";
import { Outlet } from "react-router-dom";
import { allRoles } from "shared/constants/roles";

function EditTicket() {

    return (
        <Card>
            <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Ticket</h1>
            <TabBar tabs={[
                { to: "./detail", label: "Detalle", roles: allRoles },
                { to: "./tasks", label: "Tareas", roles: allRoles },
            ]} />
            <Outlet />
        </Card>
    );
}

export default EditTicket;