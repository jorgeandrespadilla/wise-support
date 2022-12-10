import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import { handleAPIError } from "utils/validation";
import { NumberField, TextAreaField } from "components/Form";
import { AddTaskRequest } from "types";
import { useLoadingToast } from "hooks/useLoadingToast";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getTask, updateTask } from "services/tasks";

type FormData = {
    description: string;
    timeSpent: number;
}

function EditTask() {

    const { id, taskId } = useParams<{ id: string, taskId: string }>();
    const navigate = useNavigate();

    const { control, reset, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            description: "",
            timeSpent: 0,
        },
    });

    
    useQuery(['task', taskId],
        async () => {
            if (!taskId) return;
            const res = await getTask(taskId);
            return {
                description: res.description,
                timeSpent: res.timeSpent,
            } as FormData;
        },
        {
            onSuccess: (data) => {
                reset(data);
            },
            onError: (e) => {
                handleAPIError(e);
                navigate(-1);
            },
            refetchOnWindowFocus: false,
        }
    );

    const editTaskToast = useLoadingToast("editTask", {
        loading: "Modificando tarea...",
        success: "Tarea agregada",
    });
    const { mutate: handleUpdate } = useMutation(
        async (ticket: FormData) => {
            if (!id || !taskId) return;
            editTaskToast.loading();
            const request: AddTaskRequest = {
                description: ticket.description,
                timeSpent: ticket.timeSpent,
                ticketId: Number(id),
            };
            await updateTask(taskId, request);
        },
        {
            onSuccess: () => {
                editTaskToast.success();
                navigate(-1);
            },
            onError: (e) => {
                editTaskToast.error();
                handleAPIError(e, { form, toastId: editTaskToast.toastId });
            },

        },
    );

    return (
        <>
            <h1 className="font-poppins text-xl text-neutral pb-4">Tarea</h1>
            <div className="flex flex-col pb-8 space-y-4">
                <TextAreaField name="description" label="Descripción" control={control} />
                <NumberField name="timeSpent" label="Tiempo empleado (en horas)" control={control} />
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleSubmit(handleUpdate)}>Guardar</Button>
                <Link to="../tasks">
                    <Button type="secondary">Cancelar</Button>
                </Link>
            </div>
        </>
    );
}

export default EditTask;