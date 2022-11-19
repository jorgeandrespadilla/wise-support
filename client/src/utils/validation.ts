import { FieldValues, UseFormSetError, Path, UseFormGetValues } from "react-hook-form";
import toast from "react-hot-toast";

type FieldError = {
    path: (string | number)[];
    message: string;
}

interface ErrorHandlerOptions<TFields extends FieldValues = FieldValues> {
    /**
     * The toast ID to use when displaying the error,
     * If not provided, a new toast will be created.
     */
    toastId?: string;
    /**
     * Form options
     * If not provided and a validation error occurs, a general error will be displayed in a toast.
     */
    form?: FormOptions<TFields>;
}

interface FormOptions<TFields extends FieldValues = FieldValues> {
    /** 
     * The function to set the errors in the form (use react-hook-form's setError).
     */
    setError: UseFormSetError<TFields>;
    /**
     * The form values (use react-hook-form's getValues).
     */
    getValues: UseFormGetValues<TFields>;
}

/**
 * Handle errors from API calls
 * @param error The error returned from the server
 * @param options The options to handle the error
 */
export const handleAPIError = <TFields extends FieldValues = FieldValues>(error: any, options?: ErrorHandlerOptions<TFields>) => {
    const { form, toastId = undefined } = options || {};

    if (error?.code === "VALIDATION_ERROR" && error?.data?.fields && form) {
        const fieldErrors = error.data.fields as FieldError[];
        handleFormError(fieldErrors, form);
    } else {
        console.error(error);
        toast.error(error?.message ?? 'Algo salió mal.', { id: toastId });
    }
}

const handleFormError = <TFields extends FieldValues = FieldValues>(fieldErrors: FieldError[], form: FormOptions<TFields>) => {
    const formFields = Object.keys(form.getValues());

    fieldErrors.forEach(fieldError => {
        const path = fieldError.path.join(".") as Path<TFields>;
        if (formFields.includes(path)) {
            form.setError(path, { message: fieldError.message });
        }
        else {
            console.error(`Field ${path}: ${fieldError.message}`);
        }
    });
}