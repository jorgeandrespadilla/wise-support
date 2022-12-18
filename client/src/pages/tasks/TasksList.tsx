import { useState } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import Button from "components/Button";
import ConfirmDialog from "components/ConfirmDialog";
import IconButton from "components/IconButton";
import Input from "components/Input";
import { Cell, HeaderCell, TableContainer, TableEmpty, TableLoader } from "components/Table";
import { handleAPIError } from "utils/validation";
import { useModal } from "hooks/useModal";
import { useLoadingToast } from "hooks/useLoadingToast";
import { isDefined, pluralize, sortDescByDateTime } from "utils/dataHelpers";
import { deleteTask, getTasksByTicketId } from "services/tasks";
import Authorize from "components/Authorize";
import { role } from "shared/constants/roles";
import StatsItem from "components/StatsItem";

function TasksList() {
    const { id } = useParams<{ id: string }>();

    const [selectedTaskId, setSelectedTaskId] = useState(0);
    const [search, setSearch] = useState("");
    const confirmDialog = useModal();

    const tasks = useQuery(['tasks', id],
        async () => {
            if (!id) return;
            const data = await getTasksByTicketId(id);
            return sortDescByDateTime(data, (task) => task.createdAt);
        },
        {
            onError: (e) => {
                handleAPIError(e);
            },
        }
    );

    const deleteTaskToast = useLoadingToast("deleteTask", {
        loading: "Eliminando tarea...",
        success: "Tarea eliminada",
    });
    const { mutate: handleDelete } = useMutation(
        async (id: number) => {
            deleteTaskToast.loading();
            await deleteTask(id.toString());
        },
        {
            onSuccess: () => {
                deleteTaskToast.success();
                tasks.refetch();
            },
            onError: (e) => {
                deleteTaskToast.error();
                handleAPIError(e, { toastId: deleteTaskToast.toastId });
            }
        }
    );

    const filteredTasks = tasks.data?.filter((task) => {
        return task.description.toLowerCase().includes(search.toLowerCase());
    });

    const totalTasks = tasks.data?.length || 0;
    const totalTimeSpent = tasks.data?.reduce((acc, task) => acc + task.timeSpent, 0) || 0;

    return (
        <>
            <div className="flex flex-row justify-between items-center pb-4 space-x-2">
                <Input value={search} onChange={setSearch} placeholder="Buscar" width="half" prefixContent={
                    <div className="pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                } />
                <Authorize roles={[role.AGENT]}>
                    <Button as="link" navigateTo="./new">Agregar</Button>
                </Authorize>
            </div>
            <div className="flex flex-row gap-8 my-4">
                <StatsItem 
                    label="Tareas" 
                    value={totalTasks.toString()} />
                <StatsItem 
                    label="Tiempo total"
                    value={totalTimeSpent.toString()}
                    measurement={pluralize(totalTimeSpent, "hora", "horas")} />
            </div>
            <TableContainer>
                <thead>
                    <tr className="border-0 border-b-2 text-left">
                        <HeaderCell>Descripción</HeaderCell>
                        <HeaderCell>Tiempo empleado (en horas)</HeaderCell>
                        <Authorize roles={[role.AGENT]}>
                            <HeaderCell>Acciones</HeaderCell>
                        </Authorize>
                    </tr>
                </thead>
                <tbody>
                    {tasks.isLoading
                        ? (
                            <TableLoader />
                        )
                        : (isDefined(filteredTasks) && !filteredTasks.isEmpty()
                            ? (
                                filteredTasks!.map((task, index) => {
                                    return (
                                        <tr key={task.id} className={`table-row ${!filteredTasks.isLast(index) ? "border-b" : ""}`}>
                                            <Cell>{task.description}</Cell>
                                            <Cell>{task.timeSpent}</Cell>
                                            <Authorize roles={[role.AGENT]}>
                                                <Cell>
                                                    <div className="flex space-x-2">
                                                        <IconButton as="link" navigateTo={`./${task.id}`} icon={<PencilSquareIcon className="h-5 w-5 text-blue-500" />} />
                                                        <IconButton icon={<TrashIcon className="h-5 w-5 text-danger" />} onClick={() => {
                                                            setSelectedTaskId(task.id);
                                                            confirmDialog.open();
                                                        }} />
                                                    </div>
                                                </Cell>
                                            </Authorize>
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
            <ConfirmDialog
                title="Eliminar tarea"
                description="¿Estás seguro de que quieres eliminar esta tarea?"
                confirmText="Eliminar"
                cancelText="Cancelar"
                visible={confirmDialog.visible}
                setVisible={confirmDialog.setVisible}
                onCancel={() => {
                    confirmDialog.close();
                    setSelectedTaskId(0);
                }}
                onConfirm={() => {
                    confirmDialog.close();
                    handleDelete(selectedTaskId);
                }}
            />
        </>
    );
}

export default TasksList;