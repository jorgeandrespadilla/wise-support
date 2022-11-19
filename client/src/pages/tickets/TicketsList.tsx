import { useState } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import Button from "components/Button";
import Card from "components/Card";
import ConfirmDialog from "components/ConfirmDialog";
import IconButton from "components/IconButton";
import CardHeader from "components/CardHeader";
import Input from "components/Input";
import Divider from "components/Divider";
import { Cell, HeaderCell, TableContainer, TableEmpty, TableLoader } from "components/Table";
import { handleAPIError } from "utils/validation";
import { useModal } from "hooks/useModal";
import { useLoadingToast } from "hooks/useLoadingToast";
import { isDefined, sortDescByDateTime } from "utils/dataHelpers";
import { deleteTicket, getTickets } from "services/tickets";
import { ticketPriority, ticketStatus } from "shared/constants/options";

function TicketsList() {

    const [selectedTicketId, setSelectedTicketId] = useState(0);
    const [search, setSearch] = useState("");
    const confirmDialog = useModal();

    const tickets = useQuery(['tickets'],
        async () => {
            const data = await getTickets();
            return sortDescByDateTime(data, (ticket) => ticket.createdAt);
        },
        {
            onError: (e) => {
                handleAPIError(e);
            },
        }
    );

    const deleteTicketToast = useLoadingToast("deleteTicket", {
        loading: "Eliminando ticket...",
        success: "Ticket eliminado",
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
            onError: (e) => {
                deleteTicketToast.error();
                handleAPIError(e, { toastId: deleteTicketToast.toastId });
            }
        }
    );

    const filteredTickets = tickets.data?.filter((ticket) => {
        return ticket.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <Card>
                <div className="flex flex-row justify-between items-center">
                    <CardHeader title="Tickets" />
                </div>
                <Divider vertical="lg" showRule />
                <div className="flex flex-row justify-between items-center pb-4 space-x-2">
                    <Input value={search} onChange={setSearch} placeholder="Buscar" width="half" prefixContent={
                        <div className="pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                    } />
                    <Link to="/tickets/new">
                        <Button>Agregar</Button>
                    </Link>
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
                        {tickets.isLoading
                            ? (
                                <TableLoader />
                            )
                            : (isDefined(filteredTickets) && !filteredTickets.isEmpty()
                                ? (
                                    filteredTickets!.map((ticket, index) => {
                                        return (
                                            <tr key={ticket.id} className={`table-row ${!filteredTickets.isLast(index) ? "border-b" : ""}`}>
                                                <Cell>{ticket.title}</Cell>
                                                <Cell>{ticketStatus[ticket.status]}</Cell>
                                                <Cell>{ticketPriority[ticket.priority]}</Cell>
                                                <Cell>
                                                    <div className="flex space-x-2">
                                                        <Link to={`/tickets/${ticket.id}`}>
                                                            <IconButton icon={<PencilSquareIcon className="h-5 w-5 text-blue-500" />} />
                                                        </Link>
                                                        <IconButton icon={<TrashIcon className="h-5 w-5 text-danger" />} onClick={() => {
                                                            setSelectedTicketId(ticket.id);
                                                            confirmDialog.open();
                                                        }} />
                                                    </div>
                                                </Cell>
                                            </tr>
                                        );
                                    })
                                )
                                : (
                                    <TableEmpty />
                                )
                            )
                        }
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