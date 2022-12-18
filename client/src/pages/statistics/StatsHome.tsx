import Card from "components/Card";
import TabBar from "components/Navigation/TabBar";
import { Outlet } from "react-router-dom";
import { role } from "shared/constants/roles";

function StatsHome() {

    return (
        <Card>
            <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Estadísticas</h1>
            <TabBar tabs={[
                { to: "./performance", label: "Productividad", roles: [role.ADMIN, role.SUPERVISOR] },
                { to: "./categories", label: "Categorías", roles: [role.ADMIN] },
            ]} />
            <Outlet />
        </Card>
    );
}

export default StatsHome;