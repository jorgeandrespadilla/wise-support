import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import Card from "components/Card";
import { handleAPIError } from "utils/validation";
import { DropdownField, NumberField, TextAreaField, TextField } from "components/Form";
import { UpdateTicketRequest } from "types";
import { useLoadingToast } from "hooks/useLoadingToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCategoriesData } from "hooks/useCategoriesData";
import { useUsersData } from "hooks/useUsersData";
import { userRole } from "shared/constants/roles";
import { getTicket, updateTicket } from "services/tickets";
import { ticketPriorityOptions, ticketStatusOptions } from "shared/constants/options";

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

function EditTicket() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { control, reset, handleSubmit, ...form } = useForm<FormData>({
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
    const assignees = useUsersData(userRole.agent);
    const supervisors = useUsersData(userRole.supervisor);

    useQuery(['ticket', id],
        async () => {
            if (!id) return;
            const res = await getTicket(id);
            return {
                title: res.title,
                categoryId: res.categoryId.toString(),
                description: res.description,
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
                navigate("/users");
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
        <Card>
           <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Ticket</h1>
            <div className="flex flex-col pb-8 space-y-4">
                <TextField name="title" label="Asunto" control={control} />
                <DropdownField name="categoryId" label="Categoría" placeholder="Seleccione una categoría" control={control}>
                    {categories.data?.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </DropdownField>
                <TextAreaField name="description" label="Descripción" control={control} />
                <DropdownField name="status" label="Estado" placeholder="Seleccione una opción" control={control}>
                    {ticketStatusOptions.map((status) => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                </DropdownField>
                <DropdownField name="priority" label="Prioridad" placeholder="Seleccione una opción" control={control}>
                    {ticketPriorityOptions.map((priority) => (
                        <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                </DropdownField>
                <DropdownField name="supervisorId" label="Supervisor" placeholder="Seleccione un supervisor" control={control}>
                    {supervisors.data?.map((supervisor) => (
                        <option key={supervisor.id} value={supervisor.id}>{supervisor.fullName}</option>
                    ))}
                </DropdownField>
                <DropdownField name="assigneeId" label="Asignado" placeholder="Seleccione un agente" control={control}>
                    {assignees.data?.map((assignee) => (
                        <option key={assignee.id} value={assignee.id}>{assignee.fullName}</option>
                    ))}
                </DropdownField>
                <NumberField name="timeEstimated" label="Tiempo estimado (en horas)" control={control} />
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleSubmit(handleUpdate)}>Guardar</Button>
                <Link to="/tickets">
                    <Button type="secondary">Cancelar</Button>
                </Link>
            </div>
        </Card>
    );
}

export default EditTicket;