import { FieldValues, UseFormSetError, Path } from "react-hook-form";
import toast from "react-hot-toast";

type FieldError = {
    path: (string | number)[];
    message: string;
}

/**
 * Handle errors from API calls
 * @param error The error returned from the server
 * @param setError The setError function from react-hook-form to add errors to the form
 */
export const handleAPIError = <TFields extends FieldValues = FieldValues>(error: any, setError?: UseFormSetError<TFields>) => {
    if (error?.code === "VALIDATION_ERROR" && error?.data?.fields && setError) {
        const fieldErrors = error.data.fields as FieldError[];
        fieldErrors.forEach(fieldError => {
            const path = fieldError.path.join(".") as Path<TFields>;
            setError(path, { message: fieldError.message });
        });
    } else {
        console.error(error);
        toast.error(error?.message ?? 'Algo salió mal.');
    }
}