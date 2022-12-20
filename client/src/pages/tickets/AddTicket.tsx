import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from 'components/Button';
import Card from 'components/Card';
import { handleAPIError } from 'utils/validation';
import {
    DropdownField,
    NumberField,
    TextAreaField,
    TextField,
} from 'components/Form';
import { AddTicketRequest } from 'types';
import { useLoadingToast } from 'hooks/useLoadingToast';
import { useMutation } from '@tanstack/react-query';
import { useCategoriesData } from 'hooks/useCategoriesData';
import { useUsersData } from 'hooks/useUsersData';
import { role } from 'shared/constants/roles';
import { addTicket } from 'services/tickets';
import { ticketPriorityOptions } from 'shared/constants/options';
import CardHeader from 'components/CardHeader';

type FormData = {
    title: string;
    categoryId: string;
    description: string;
    priority: string;
    supervisorId: string;
    assigneeId: string;
    timeEstimated: number;
};

function AddTicket() {
    const navigate = useNavigate();

    const { control, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            title: '',
            categoryId: '',
            description: '',
            priority: '',
            supervisorId: '',
            assigneeId: '',
            timeEstimated: 0,
        },
    });

    const categories = useCategoriesData();
    const assignees = useUsersData(role.AGENT);
    const supervisors = useUsersData(role.SUPERVISOR);

    const addTicketToast = useLoadingToast('addTicket', {
        loading: 'Agregando ticket...',
        success: 'Ticket agregado',
    });
    const { mutate: handleAdd } = useMutation(
        async (ticket: FormData) => {
            addTicketToast.loading();
            const request: AddTicketRequest = {
                title: ticket.title,
                categoryId: Number(ticket.categoryId),
                description: ticket.description,
                priority: ticket.priority,
                assigneeId: Number(ticket.assigneeId),
                supervisorId: Number(ticket.supervisorId),
                timeEstimated: ticket.timeEstimated,
            };
            await addTicket(request);
        },
        {
            onSuccess: () => {
                addTicketToast.success();
                navigate('/tickets');
            },
            onError: e => {
                addTicketToast.error();
                handleAPIError(e, { form, toastId: addTicketToast.toastId });
            },
        },
    );

    return (
        <Card>
            <CardHeader title="Nuevo Ticket" />
            <div className="flex flex-col pt-8 pb-8 space-y-4">
                <TextField name="title" label="Asunto" control={control} />
                <DropdownField
                    name="categoryId"
                    label="Categoría"
                    placeholder="Seleccione una categoría"
                    control={control}
                >
                    {categories.data?.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </DropdownField>
                <TextAreaField
                    type="markdown"
                    name="description"
                    label="Descripción"
                    control={control}
                />
                <DropdownField
                    name="priority"
                    label="Prioridad"
                    placeholder="Seleccione una opción"
                    control={control}
                >
                    {ticketPriorityOptions.map(priority => (
                        <option key={priority.value} value={priority.value}>
                            {priority.label}
                        </option>
                    ))}
                </DropdownField>
                <DropdownField
                    name="supervisorId"
                    label="Supervisor"
                    placeholder="Seleccione un supervisor"
                    control={control}
                >
                    {supervisors.data?.map(supervisor => (
                        <option key={supervisor.id} value={supervisor.id}>
                            {supervisor.fullName}
                        </option>
                    ))}
                </DropdownField>
                <DropdownField
                    name="assigneeId"
                    label="Asignado"
                    placeholder="Seleccione un agente"
                    control={control}
                >
                    {assignees.data?.map(assignee => (
                        <option key={assignee.id} value={assignee.id}>
                            {assignee.fullName}
                        </option>
                    ))}
                </DropdownField>
                <NumberField
                    name="timeEstimated"
                    label="Tiempo estimado (en horas)"
                    control={control}
                />
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleSubmit(data => handleAdd(data))}>
                    Guardar
                </Button>
                <Link to="/tickets">
                    <Button type="secondary">Cancelar</Button>
                </Link>
            </div>
        </Card>
    );
}

export default AddTicket;
