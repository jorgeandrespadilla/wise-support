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
import { formatDate, parseISODate } from "utils/dateHelpers";
import { handleAPIError } from "utils/validation";
import { deleteUser, getUsers } from "services/users";
import { useModal } from "hooks/useModal";
import { useLoadingToast } from "hooks/useLoadingToast";
import { isDefined, sortAsc } from "utils/dataHelpers";

function UsersList() {

    const [selectedUserId, setSelectedUserId] = useState(0);
    const [search, setSearch] = useState("");
    const confirmDialog = useModal();

    const users = useQuery(['users'],
        async () => {
            const data = await getUsers();
            return sortAsc(data, (user) => user.fullName);
        },
        {
            onError: (e) => {
                handleAPIError(e);
            },
        }
    );

    const deleteUserToast = useLoadingToast("deleteUser", {
        loading: "Eliminando usuario...",
        success: "Usuario eliminado",
    });
    const { mutate: handleDelete } = useMutation(
        async (id: number) => {
            deleteUserToast.loading();
            await deleteUser(id.toString());
        },
        {
            onSuccess: () => {
                deleteUserToast.success();
                users.refetch();
            },
            onError: (e) => {
                deleteUserToast.error();
                handleAPIError(e, { toastId: deleteUserToast.toastId });
            }
        }
    );

    const filteredUsers = users.data?.filter((user) => {
        return user.fullName.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <Card>
                <div className="flex flex-row justify-between items-center">
                    <CardHeader title="Usuarios" />
                </div>
                <Divider vertical="lg" showRule />
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
                <TableContainer>
                    <thead>
                        <tr className="border-0 border-b-2 text-left">
                            <HeaderCell>Nombre</HeaderCell>
                            <HeaderCell>Correo</HeaderCell>
                            <HeaderCell>Rol</HeaderCell>
                            <HeaderCell>Fecha de nacimiento</HeaderCell>
                            <HeaderCell>Acciones</HeaderCell>
                        </tr>
                    </thead>
                    <tbody>
                        {users.isLoading
                            ? (
                                <TableLoader />
                            )
                            : (isDefined(filteredUsers) && !filteredUsers.isEmpty()
                                ? (
                                    filteredUsers!.map((user, index) => {
                                        return (
                                            <tr key={user.id} className={`table-row ${!filteredUsers.isLast(index) ? "border-b" : ""}`}>
                                                <Cell>{user.fullName}</Cell>
                                                <Cell>{user.email}</Cell>
                                                <Cell>{user.role.name}</Cell>
                                                <Cell>{formatDate(parseISODate(user.birthDate))}</Cell>
                                                <Cell>
                                                    <div className="flex space-x-2">
                                                        <Link to={`/users/${user.id}`}>
                                                            <IconButton icon={<PencilSquareIcon className="h-5 w-5 text-blue-500" />} />
                                                        </Link>
                                                        <IconButton icon={<TrashIcon className="h-5 w-5 text-danger" />} onClick={() => {
                                                            setSelectedUserId(user.id);
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
                title="Eliminar usuario"
                description="¿Estás seguro de que quieres eliminar este usuario?"
                confirmText="Eliminar"
                cancelText="Cancelar"
                visible={confirmDialog.visible}
                setVisible={confirmDialog.setVisible}
                onCancel={() => {
                    confirmDialog.close();
                    setSelectedUserId(0);
                }}
                onConfirm={() => {
                    confirmDialog.close();
                    handleDelete(selectedUserId);
                }}
            />
        </>
    );
}

export default UsersList;