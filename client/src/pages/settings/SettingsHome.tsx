import Button from "components/Button";
import Card from "components/Card";
import CardHeader from "components/CardHeader";
import TabBar from "components/Navigation/TabBar";
import { Outlet, useNavigate } from "react-router-dom";
import { allRoles } from "shared/constants/roles";

function SettingsHome() {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    
    return (
        <Card>
            <CardHeader title="Ajustes" />
            <TabBar tabs={[
                { to: "./appearance", label: "Apariencia", roles: allRoles },
            ]} />
            <Outlet />
            <div className="flex justify-start items-center space-x-2 pt-8">
                <Button type="secondary" onClick={goBack}>Regresar</Button>
            </div>
        </Card>
    );
}

export default SettingsHome;