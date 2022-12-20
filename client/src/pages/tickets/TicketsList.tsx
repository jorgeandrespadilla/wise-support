import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Button from 'components/Button';
import Card from 'components/Card';
import ConfirmDialog from 'components/ConfirmDialog';
import IconButton from 'components/IconButton';
import CardHeader from 'components/CardHeader';
import Divider from 'components/Divider';
import {
    Cell,
    HeaderCell,
    TableContainer,
    TableEmpty,
    TableLoader,
} from 'components/Table';
import { handleAPIError } from 'utils/validation';
import { useModal } from 'hooks/useModal';
import { useLoadingToast } from 'hooks/useLoadingToast';
import { isDefined, sortDescByDateTime } from 'utils/dataHelpers';
import { deleteTicket, getTickets } from 'services/tickets';
import {
    showAllFilter,
    ticketPriority,
    ticketStatus,
    ticketStatusOptions,
} from 'shared/constants/options';
import Authorize from 'components/Authorize';
import { role } from 'shared/constants/roles';
import Dropdown from 'components/Dropdown';
import { GetTicketsRequest } from 'types';

const statusFilterOptions = [
    { value: showAllFilter, label: 'Todos' },
    ...ticketStatusOptions,
];

function TicketsList() {
    const [selectedTicketId, setSelectedTicketId] = useState(0);
    const [selectedStatusFilter, setSelectedStatusFilter] =
        useState(showAllFilter);
    const confirmDialog = useModal();

    const tickets = useQuery(
        ['tickets', selectedStatusFilter],
        async () => {
            const statusFilter =
                selectedStatusFilter === showAllFilter
                    ? ''
                    : selectedStatusFilter;
            const request: GetTicketsRequest = {
                status: statusFilter,
            };
            const data = await getTickets(request);
            return sortDescByDateTime(data, ticket => ticket.createdAt);
        },
        {
            onError: e => {
                handleAPIError(e);
            },
        },
    );

    const deleteTicketToast = useLoadingToast('deleteTicket', {
        loading: 'Eliminando ticket...',
        success: 'Ticket eliminado',
    });
    const { mutate: handleDelete } = useMutation(
        async (id: number) => {
            deleteTicketToast.loading();
            await deleteTicket(id.toString());
        },
        {
            onSuccess: () => {
                deleteTicketToast.success();
                tickets.refetch();
            },
            onError: e => {
                deleteTicketToast.error();
                handleAPIError(e, { toastId: deleteTicketToast.toastId });
            },
        },
    );

    return (
        <>
            <Card>
                <CardHeader title="Tickets" />
                <Divider vertical="lg" showRule />
                <div className="flex flex-row justify-between items-end pb-4 gap-4">
                    <Dropdown
                        width="half"
                        label="Estado"
                        placeholder="Seleccione un estado"
                        value={selectedStatusFilter}
                        onChange={setSelectedStatusFilter}
                    >
                        {statusFilterOptions.map(status => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </Dropdown>
                    <Authorize roles={[role.ADMIN, role.SUPERVISOR]}>
                        <Button as="link" navigateTo="/tickets/new">
                            Agregar
                        </Button>
                    </Authorize>
                </div>
                <TableContainer>
                    <thead>
                        <tr className="border-0 border-b-2 text-left">
                            <HeaderCell>Asunto</HeaderCell>
                            <HeaderCell>Estado</HeaderCell>
                            <HeaderCell>Prioridad</HeaderCell>
                            <HeaderCell>Acciones</HeaderCell>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.isLoading ? (
                            <TableLoader />
                        ) : isDefined(tickets.data) &&
                          !tickets.data.isEmpty() ? (
                            tickets.data.map((ticket, index) => {
                                return (
                                    <tr
                                        key={ticket.id}
                                        className={`table-row ${
                                            !tickets.data?.isLast(index)
                                                ? 'border-b'
                                                : ''
                                        }`}
                                    >
                                        <Cell>{ticket.title}</Cell>
                                        <Cell>
                                            {ticketStatus[ticket.status]}
                                        </Cell>
                                        <Cell>
                                            {ticketPriority[ticket.priority]}
                                        </Cell>
                                        <Cell>
                                            <div className="flex space-x-2">
                                                <IconButton
                                                    title="Editar ticket"
                                                    as="link"
                                                    navigateTo={`/tickets/${ticket.id}/detail`}
                                                    icon={
                                                        <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                                                    }
                                                />
                                                <Authorize
                                                    roles={[
                                                        role.ADMIN,
                                                        role.SUPERVISOR,
                                                    ]}
                                                >
                                                    <IconButton
                                                        title="Eliminar ticket"
                                                        icon={
                                                            <TrashIcon className="h-5 w-5 text-danger" />
                                                        }
                                                        onClick={() => {
                                                            setSelectedTicketId(
                                                                ticket.id,
                                                            );
                                                            confirmDialog.open();
                                                        }}
                                                    />
                                                </Authorize>
                                            </div>
                                        </Cell>
                                    </tr>
                                );
                            })
                        ) : (
                            <TableEmpty />
                        )}
                    </tbody>
                </TableContainer>
            </Card>
            <ConfirmDialog
                title="Eliminar ticket"
                description="¿Estás seguro de que quieres eliminar este ticket?"
                confirmText="Eliminar"
                cancelText="Cancelar"
                visible={confirmDialog.visible}
                setVisible={confirmDialog.setVisible}
                onCancel={() => {
                    confirmDialog.close();
                    setSelectedTicketId(0);
                }}
                onConfirm={() => {
                    confirmDialog.close();
                    handleDelete(selectedTicketId);
                }}
            />
        </>
    );
}

export default TicketsList;
