import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import Button from "components/Button";
import Card from "components/Card";
import ConfirmDialog from "components/ConfirmDialog";
import IconButton from "components/IconButton";
import Input from "components/Input";
import { formatDate, parseISODate } from "utils/dateHelpers";
import api from "utils/api";
import toast from "utils/toast";
import { handleAPIError } from "utils/validation";
import { getUsers } from "services/users";
import { useQuery, useMutation } from '@tanstack/react-query';

type ColumnProps = {
    colSpan?: number;
    align?: "start" | "center" | "end";
    children: ReactNode;
}

const contentPosition = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
}

function HeaderColumn({
    children,
}: ColumnProps) {
    return (
        <th className="font-bold font-poppins text-gray-800 p-4 border-0">
            {children}
        </th>
    );
}

function BodyColumn({
    colSpan = 1,
    align = "start",
    children,
}: ColumnProps) {
    return (
        <td colSpan={colSpan} className={`font-poppins text-gray-800 p-4 py-2 border-0`}>
            <div className={`flex ${contentPosition[align]} items-center`}>
                {children}
            </div>
        </td>
    );
}

function UsersList() {

    const [currentUserId, setCurrentUserId] = useState(0);
    const [search, setSearch] = useState("");
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const users = useQuery(['users'],
        async () => {
            const users = await getUsers();
            return users.sort((a, b) => a.fullName.localeCompare(b.fullName));
        },
        {
            onError: (e) => {
                handleAPIError(e);
            }
        }
    );

    const { mutate: deleteUser } = useMutation(
        async (id: number) => {
            await api.delete(`/users/${id}`);
        },
        {
            onSuccess: () => {
                toast.success("Usuario eliminado");
                users.refetch();
            },
            onError: (e) => {
                handleAPIError(e);
            }
        }
    )

    const filteredUsers = users.data?.filter((user) => {
        return user.fullName.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <Card>
                <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Usuarios</h1>
                <div className="flex flex-row justify-between items-center pb-4 space-x-2">
                    <Input value={search} onChange={setSearch} placeholder="Buscar" width="half" prefixContent={
                        <div className="pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                    } />
                    <Link to="/users/new">
                        <Button>Agregar</Button>
                    </Link>
                </div>
                <div className="overflow-x-auto rounded-md border border-gray-200">
                    <table className="w-full table-auto border-collapse border-spacing-0 p-0 m-0" cellPadding={0} cellSpacing={0}>
                        <thead>
                            <tr className="border-0 border-b-2 text-left">
                                <HeaderColumn>Nombre</HeaderColumn>
                                <HeaderColumn>Correo</HeaderColumn>
                                <HeaderColumn>Fecha de nacimiento</HeaderColumn>
                                <HeaderColumn>Acciones</HeaderColumn>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredUsers && filteredUsers.length > 0
                                    ? (
                                        filteredUsers.map((user, index) => {
                                            const isLast = index === filteredUsers.length - 1;
                                            return (
                                                <tr key={user.id} className={`table-row ${!isLast ? "border-b" : ""}`}>
                                                    <BodyColumn>{user.fullName}</BodyColumn>
                                                    <BodyColumn>{user.email}</BodyColumn>
                                                    <BodyColumn>{formatDate(parseISODate(user.birthDate))}</BodyColumn>
                                                    <BodyColumn>
                                                        <div className="flex space-x-2">
                                                            <Link to={`/users/${user.id}`}>
                                                                <IconButton icon={<PencilSquareIcon className="h-5 w-5 text-blue-500" />} />
                                                            </Link>
                                                            <IconButton icon={<TrashIcon className="h-5 w-5 text-danger" />} onClick={() => {
                                                                setCurrentUserId(user.id);
                                                                setIsConfirmDialogOpen(true);
                                                            }} />
                                                        </div>
                                                    </BodyColumn>
                                                </tr>
                                            );
                                        })
                                    )
                                    : (
                                        <tr>
                                            <BodyColumn colSpan={4} align="center">
                                                <div className="text-sm text-neutral py-3">
                                                    No se encontraron resultados
                                                </div>
                                            </BodyColumn>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </Card>
            <ConfirmDialog
                title="Eliminar usuario"
                description="¿Estás seguro de que quieres eliminar este usuario?"
                confirmText="Eliminar"
                cancelText="Cancelar"
                isOpen={isConfirmDialogOpen}
                setIsOpen={setIsConfirmDialogOpen}
                onCancel={() => {
                    setIsConfirmDialogOpen(false);
                    setCurrentUserId(0);
                }}
                onConfirm={() => {
                    setIsConfirmDialogOpen(false);
                    deleteUser(currentUserId);
                }}
            />
        </>
    );
}

export default UsersList;