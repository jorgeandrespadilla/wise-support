import { FieldValues, UseFormSetError, Path } from "react-hook-form";
import toast from "react-hot-toast";

type FieldError = {
    path: (string | number)[];
    message: string;
}

/**
 * Handle errors from API calls
 * @param error The error returned from the server
 * @param options The options to handle the error
 */
export const handleAPIError = <TFields extends FieldValues = FieldValues>(error: any, options?: {
    /**
     * The function to set the errors in the form (use react-hook-form's setError).
     * If not provided, a general error will be displayed as toast.
     */
    setFormError?: UseFormSetError<TFields>,
    /**
     * The toast ID to use when displaying the error,
     * If not provided, a new toast will be created.
     */
    toastId?: string,
}) => {
    const { setFormError, toastId = undefined } = options || {};
    
    if (error?.code === "VALIDATION_ERROR" && error?.data?.fields && setFormError) {
        const fieldErrors = error.data.fields as FieldError[];
        fieldErrors.forEach(fieldError => {
            const path = fieldError.path.join(".") as Path<TFields>;
            setFormError(path, { message: fieldError.message });
        });
    } else {
        console.error(error);
        toast.error(error?.message ?? 'Algo salió mal.', { id: toastId });
    }
}