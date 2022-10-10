import { ReactNode, useEffect, useState } from "react";
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
import { UserData } from "types";

type ColumnProps = {
    children: ReactNode;
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
    children,
}: ColumnProps) {
    return (
        <td className="font-poppins text-gray-800 p-4 py-2 border-0">
            {children}
        </td>
    );
}

function UsersList() {
    const [currentUserId, setCurrentUserId] = useState(0);
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<UserData[]>([]);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        api.get<UserData[]>("/users").then((res) => {
            setUsers(res.sort((a, b) => a.fullName.localeCompare(b.fullName)));
        }).catch((err) => {
            console.error(err);
            toast.error(err.message);
        });
    };

    const handleDelete = (id: number) => {
        api.delete(`/users/${id}`).then(() => {
            toast.success("Usuario eliminado");
            fetchUsers();
        }).catch((err) => {
            console.error(err);
            toast.error(err.message);
        });
    };

    const filteredUsers = users.filter((user) => {
        return user.fullName.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <>
            <Card>
                <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Usuarios</h1>
                <div className="flex flex-row justify-between items-center pb-4">
                    <Input value={query} onChange={setQuery} placeholder="Buscar" width="half" prefixIcon={
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
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
                            {filteredUsers.map((user, index) => {
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
                            })}
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
                    handleDelete(currentUserId);
                }}
            />
        </>
    );
}

export default UsersList;