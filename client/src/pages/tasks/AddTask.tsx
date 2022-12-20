import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from 'components/Button';
import { handleAPIError } from 'utils/validation';
import { NumberField, TextAreaField } from 'components/Form';
import { AddTaskRequest } from 'types';
import { useLoadingToast } from 'hooks/useLoadingToast';
import { useMutation } from '@tanstack/react-query';

import { addTask } from 'services/tasks';

type FormData = {
    description: string;
    timeSpent: number;
};

function AddTask() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { control, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            description: '',
            timeSpent: 0,
        },
    });

    const addTaskToast = useLoadingToast('addTask', {
        loading: 'Agregando tarea...',
        success: 'Tarea agregada',
    });
    const { mutate: handleAdd } = useMutation(
        async (ticket: FormData) => {
            if (!id) return;
            addTaskToast.loading();
            const request: AddTaskRequest = {
                description: ticket.description,
                timeSpent: ticket.timeSpent,
                ticketId: Number(id),
            };
            await addTask(request);
        },
        {
            onSuccess: () => {
                addTaskToast.success();
                navigate(-1);
            },
            onError: e => {
                addTaskToast.error();
                handleAPIError(e, { form, toastId: addTaskToast.toastId });
            },
        },
    );

    return (
        <>
            <h1 className="font-poppins text-xl text-neutral pb-4">
                Nueva Tarea
            </h1>
            <div className="flex flex-col pb-8 space-y-4">
                <TextAreaField
                    name="description"
                    label="Descripción"
                    control={control}
                />
                <NumberField
                    name="timeSpent"
                    label="Tiempo empleado (en horas)"
                    control={control}
                />
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleSubmit(data => handleAdd(data))}>
                    Guardar
                </Button>
                <Link to="../tasks">
                    <Button type="secondary">Cancelar</Button>
                </Link>
            </div>
        </>
    );
}

export default AddTask;
