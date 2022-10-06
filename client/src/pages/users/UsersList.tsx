import Input from "components/Input";
import MainLayout from "components/MainLayout";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import Card from "components/Card";
import Button from "components/Button";
import { UserData } from "types";
import { dateToDateStr } from "utils/dateHelpers";
import api from "utils/api";
import toast from "utils/toast";
import IconButton from "components/IconButton";
import { Link } from "react-router-dom";
import ConfirmDialog from "components/ConfirmDialog";

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
        <MainLayout>
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
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead className="border-b bg-blue-100">
                        <tr className="text-left">
                            <th className="font-bold font-poppins text-gray-800 p-4">Nombre</th>
                            <th className="font-bold font-poppins text-gray-800 p-4">Correo</th>
                            <th className="font-bold font-poppins text-gray-800 p-4">Fecha de nacimiento</th>
                            <th className="font-bold font-poppins text-gray-800 p-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="font-poppins text-gray-800 px-4 py-2">{user.fullName}</td>
                                <td className="font-poppins text-gray-800 px-4 py-2">{user.email}</td>
                                <td className="font-poppins text-gray-800 px-4 py-2">{dateToDateStr(new Date(user.birthDate))}</td>
                                <td className="font-poppins text-gray-800 p-4 py-2 space-x-2 flex">
                                    <Link to={`/users/${user.id}`}>
                                        <IconButton icon={<PencilSquareIcon className="h-5 w-5 text-blue-500" />} />
                                    </Link>
                                    <IconButton icon={<TrashIcon className="h-5 w-5 text-red-500" />} onClick={() => {
                                        setCurrentUserId(user.id);
                                        setIsConfirmDialogOpen(true);
                                    }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
        </MainLayout>
    );
}

export default UsersList;