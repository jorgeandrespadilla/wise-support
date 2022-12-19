import { useState } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
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
import { isDefined, sortAsc } from "utils/dataHelpers";
import { deleteCategory, getCategories } from "services/categories";

function CategoriesList() {

    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [search, setSearch] = useState("");
    const confirmDialog = useModal();

    const categories = useQuery(['categories'],
        async () => {
            const data = await getCategories();
            return sortAsc(data, (category) => category.name);
        },
        {
            onError: (e) => {
                handleAPIError(e);
            },
        }
    );

    const deleteCategoryToast = useLoadingToast("deleteCategory", {
        loading: "Eliminando categoría...",
        success: "Categoría eliminada",
    });
    const { mutate: handleDelete } = useMutation(
        async (id: number) => {
            deleteCategoryToast.loading();
            await deleteCategory(id.toString());
        },
        {
            onSuccess: () => {
                deleteCategoryToast.success();
                categories.refetch();
            },
            onError: (e) => {
                deleteCategoryToast.error();
                handleAPIError(e, { toastId: deleteCategoryToast.toastId });
            }
        }
    );

    const filteredCategories = categories.data?.filter((category) => {
        return category.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <Card>
                <CardHeader title="Categorías" />
                <Divider vertical="lg" showRule />
                <div className="flex flex-row justify-between items-center pb-4 gap-4">
                    <Input value={search} onChange={setSearch} placeholder="Buscar" width="half" prefixContent={
                        <div className="pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                    } />
                    <Button as="link" navigateTo="/categories/new">Agregar</Button>
                </div>
                <TableContainer>
                    <thead>
                        <tr className="border-0 border-b-2 text-left">
                            <HeaderCell>Nombre</HeaderCell>
                            <HeaderCell>Descripción</HeaderCell>
                            <HeaderCell>Acciones</HeaderCell>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.isLoading
                            ? (
                                <TableLoader />
                            )
                            : (isDefined(filteredCategories) && !filteredCategories.isEmpty()
                                ? (
                                    filteredCategories!.map((category, index) => {
                                        return (
                                            <tr key={category.id} className={`table-row ${!filteredCategories.isLast(index) ? "border-b" : ""}`}>
                                                <Cell>{category.name}</Cell>
                                                <Cell disabled={!category.description}>{category.description ?? "No disponible"}</Cell>
                                                <Cell>
                                                    <div className="flex space-x-2">
                                                        <IconButton title="Editar categoría" as="link" navigateTo={`/categories/${category.id}`} icon={<PencilSquareIcon className="h-5 w-5 text-blue-500" />} />
                                                        <IconButton title="Eliminar categoría" icon={<TrashIcon className="h-5 w-5 text-danger" />} onClick={() => {
                                                            setSelectedCategoryId(category.id);
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
                title="Eliminar categoría"
                description="¿Estás seguro de que quieres eliminar esta categoría?"
                confirmText="Eliminar"
                cancelText="Cancelar"
                visible={confirmDialog.visible}
                setVisible={confirmDialog.setVisible}
                onCancel={() => {
                    confirmDialog.close();
                    setSelectedCategoryId(0);
                }}
                onConfirm={() => {
                    confirmDialog.close();
                    handleDelete(selectedCategoryId);
                }}
            />
        </>
    );
}

export default CategoriesList;