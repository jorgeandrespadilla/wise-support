import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import Card from "components/Card";
import { TextAreaField, TextField } from "components/Form";
import { handleAPIError } from "utils/validation";
import { UpdateCategoryRequest } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLoadingToast } from "hooks/useLoadingToast";
import { getCategory, updateCategory } from "services/categories";
import CardHeader from "components/CardHeader";

type FormData = {
    name: string;
    code: string;
    description: string;
}

function EditCategory() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { control, reset, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            name: "",
            code: "",
            description: "",
        },
    });

    useQuery(['category', id],
        async () => {
            if (!id) return;
            const res = await getCategory(id);
            return {
                name: res.name,
                code: res.code,
                description: res.description,
            } as FormData;
        },
        {
            onSuccess: (data) => {
                reset(data);
            },
            onError: (e) => {
                handleAPIError(e);
                navigate("/categories");
            },
            refetchOnWindowFocus: false,
        }
    );

    const editCategoryToast = useLoadingToast("editCategory", {
        loading: "Modificando categoría...",
        success: "Categoría modificada",
    });
    const { mutate: handleUpdate } = useMutation(
        async (category: FormData) => {
            editCategoryToast.loading();
            const request: UpdateCategoryRequest = {
                name: category.name,
                code: category.code,
                description: category.description,
            };
            await updateCategory(id!, request);
        },
        {
            onSuccess: () => {
                editCategoryToast.success();
                navigate("/categories");
            },
            onError: (e) => {
                editCategoryToast.error();
                handleAPIError(e, { form, toastId: editCategoryToast.toastId });
            },
        },
    );

    return (
        <Card>
            <CardHeader title="Categoría" />
            <div className="flex flex-col pt-8 pb-8 space-y-4">
                <TextField name="name" label="Nombre" control={control} />
                <TextField name="code" label="Código" control={control} />
                <TextAreaField name="description" label="Descripción" control={control} />
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleSubmit(handleUpdate)}>Guardar</Button>
                <Button as="link" navigateTo="/categories" type="secondary">Cancelar</Button>
            </div>
        </Card>
    );
}

export default EditCategory;
