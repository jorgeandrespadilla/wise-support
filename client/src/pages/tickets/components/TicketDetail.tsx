import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import { handleAPIError } from "utils/validation";
import { DropdownField, NumberField, TextAreaField, TextField } from "components/Form";
import { UpdateTicketRequest } from "types";
import { useLoadingToast } from "hooks/useLoadingToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCategoriesData } from "hooks/useCategoriesData";
import { useUsersData } from "hooks/useUsersData";
import { role } from "shared/constants/roles";
import { getTicket, updateTicket } from "services/tickets";
import { ticketPriorityOptions, ticketStatusOptions } from "shared/constants/options";
import { useCurrentUser } from "hooks/useCurrentUser";

type FormData = {
    title: string;
    categoryId: string;
    description: string;
    priority: string;
    status: string;
    supervisorId: string;
    assigneeId: string;
    timeEstimated: number;
}

function TicketDetail() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isAuthorized } = useCurrentUser();

    const { control, watch, reset, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            title: "",
            categoryId: "",
            description: "",
            status: "",
            priority: "",
            supervisorId: "",
            assigneeId: "",
            timeEstimated: 0,
        },
    });

    const categories = useCategoriesData();
    const assignees = useUsersData(role.AGENT);
    const supervisors = useUsersData(role.SUPERVISOR);

    const readonly = !isAuthorized([role.ADMIN, role.SUPERVISOR]);

    // Status options
    const limitedTicketStatus = ["OPEN", "IN_PROGRESS", "RESOLVED"];
    const readonlyStatus= readonly && !limitedTicketStatus.includes(watch('status'));
    const statusOptions = readonly
        ? (
            limitedTicketStatus.includes(watch('status'))
            ? ticketStatusOptions.filter((option) => limitedTicketStatus.includes(option.value))
            : ticketStatusOptions
        ) 
        : ticketStatusOptions;
    
    useQuery(['ticket', id],
        async () => {
            if (!id) return;
            const res = await getTicket(id);
            return {
                title: res.title,
                categoryId: res.categoryId.toString(),
                description: res.description ?? "",
                status: res.status,
                priority: res.priority,
                supervisorId: res.supervisorId.toString(),
                assigneeId: res.assigneeId.toString(),
                timeEstimated: res.timeEstimated,
            } as FormData;
        },
        {
            onSuccess: (data) => {
                reset(data);
            },
            onError: (e) => {
                handleAPIError(e);
                navigate("/tickets");
            },
            refetchOnWindowFocus: false,
        }
    );

    const editTicketToast = useLoadingToast("editTicket", {
        loading: "Modificando ticket...",
        success: "Ticket modificado",
    });
    const { mutate: handleUpdate } = useMutation(
        async (ticket: FormData) => {
            editTicketToast.loading();
            const request: UpdateTicketRequest = {
                title: ticket.title,
                categoryId: Number(ticket.categoryId),
                description: ticket.description,
                status: ticket.status,
                priority: ticket.priority,
                assigneeId: Number(ticket.assigneeId),
                supervisorId: Number(ticket.supervisorId),
                timeEstimated: ticket.timeEstimated,
            };
            await updateTicket(id!, request);
        },
        {
            onSuccess: () => {
                editTicketToast.success();
                navigate("/tickets");
            },
            onError: (e) => {
                editTicketToast.error();
                handleAPIError(e, { form, toastId: editTicketToast.toastId });
            },

        },
    );

    return (
        <>
            <div className="flex flex-col pb-8 space-y-4">
                <TextField name="title" label="Asunto" control={control} disabled={readonly} />
                <DropdownField name="categoryId" label="Categoría" placeholder="Seleccione una categoría" control={control} disabled={readonly}>
                    {categories.data?.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </DropdownField>
                <TextAreaField name="description" label="Descripción" control={control} />
                <DropdownField name="status" label="Estado" placeholder="Seleccione una opción" control={control} disabled={readonlyStatus}>
                    {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                </DropdownField>
                <DropdownField name="priority" label="Prioridad" placeholder="Seleccione una opción" control={control} disabled={readonly}>
                    {ticketPriorityOptions.map((priority) => (
                        <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                </DropdownField>
                <DropdownField name="supervisorId" label="Supervisor" placeholder="Seleccione un supervisor" control={control} disabled={readonly}>
                    {supervisors.data?.map((supervisor) => (
                        <option key={supervisor.id} value={supervisor.id}>{supervisor.fullName}</option>
                    ))}
                </DropdownField>
                <DropdownField name="assigneeId" label="Asignado" placeholder="Seleccione un agente" control={control} disabled={readonly}>
                    {assignees.data?.map((assignee) => (
                        <option key={assignee.id} value={assignee.id}>{assignee.fullName}</option>
                    ))}
                </DropdownField>
                <NumberField name="timeEstimated" label="Tiempo estimado (en horas)" control={control} disabled={readonly} />
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleSubmit(handleUpdate)}>Guardar</Button>
                <Link to="/tickets">
                    <Button type="secondary">Cancelar</Button>
                </Link>
            </div>
        </>
    );
}

export default TicketDetail;