import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import Card from "components/Card";
import { handleAPIError } from "utils/validation";
import { TextAreaField, TextField } from "components/Form";
import { AddCategoryRequest } from "types";
import { useLoadingToast } from "hooks/useLoadingToast";
import { useMutation } from "@tanstack/react-query";
import { addCategory } from "services/categories";

type FormData = {
    name: string;
    code: string;
    description: string;
}

function AddCategory() {

    const navigate = useNavigate();
    
    const { control, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            name: "",
            code: "",
            description: "",
        },
    });

    const addCategoryToast = useLoadingToast("addCategory", {
        loading: "Agregando categoría...",
        success: "Categoría agregado",
    });
    const { mutate: handleAdd } = useMutation(
        async (category: FormData) => {
            addCategoryToast.loading();
            const request: AddCategoryRequest = {
                name: category.name,
                code: category.code,
                description: category.description,
            };
            await addCategory(request);
        },
        {
            onSuccess: () => {
                addCategoryToast.success();
                navigate("/categories");
            },
            onError: (e) => {
                addCategoryToast.error();
                handleAPIError(e, { form, toastId: addCategoryToast.toastId });
            },

        },
    );

    return (
        <Card>
            <h1 className="font-bold font-poppins text-2xl text-gray-800 pb-4">Nueva Categoría</h1>
            <div className="flex flex-col pb-8 space-y-4">
                <TextField name="name" label="Nombre" control={control} />
                <TextField name="code" label="Código" control={control} />
                <TextAreaField name="description" label="Descripción" control={control} />
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleSubmit(handleAdd)}>Guardar</Button>
                <Button as="link" navigateTo="/categories" type="secondary">Cancelar</Button>
            </div>
        </Card>
    );
}

export default AddCategory;