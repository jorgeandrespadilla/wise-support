import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import TabBar from 'components/Navigation/TabBar';
import { Outlet } from 'react-router-dom';
import { role } from 'shared/constants/roles';

function StatsHome() {
    return (
        <Card>
            <CardHeader title="Estadísticas" />
            <TabBar
                tabs={[
                    {
                        key: 'performance',
                        to: './performance',
                        label: 'Productividad',
                        roles: [role.ADMIN, role.SUPERVISOR],
                    },
                    {
                        key: 'categories',
                        to: './categories',
                        label: 'Categorías',
                        roles: [role.ADMIN],
                    },
                ]}
            />
            <Outlet />
        </Card>
    );
}

export default StatsHome;
