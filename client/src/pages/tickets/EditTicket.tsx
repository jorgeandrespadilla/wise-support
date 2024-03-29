import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import TabBar from 'components/Navigation/TabBar';
import { Outlet } from 'react-router-dom';
import { allRoles } from 'shared/constants/roles';

function EditTicket() {
    return (
        <Card>
            <CardHeader title="Ticket" />
            <TabBar
                tabs={[
                    {
                        key: 'detail',
                        to: './detail',
                        label: 'Detalle',
                        roles: allRoles,
                    },
                    {
                        key: 'tasks',
                        to: './tasks',
                        label: 'Tareas',
                        roles: allRoles,
                    },
                ]}
            />
            <Outlet />
        </Card>
    );
}

export default EditTicket;
