import {
    FieldValues,
    UseFormSetError,
    UseFormGetValues,
    FieldPath,
} from 'react-hook-form';
import zod from 'zod';
import { z, ZodType, ZodTypeDef } from 'zod/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { formatDateForDisplay } from './dateHelpers';
import { ServerError } from 'shared/errors';

//#region Error handling

type FieldError = {
    path: (string | number)[];
    message: string;
};

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
export const handleAPIError = <TFields extends FieldValues = FieldValues>(
    error: unknown,
    options?: ErrorHandlerOptions<TFields>,
) => {
    const { form, toastId = undefined } = options || {};

    if (
        form &&
        error instanceof ServerError &&
        error?.code === 'VALIDATION_ERROR' &&
        error?.data?.fields
    ) {
        const fieldErrors = error.data.fields as FieldError[];
        handleFormError(fieldErrors, form);
    } else if (error instanceof Error) {
        console.error(error);
        toast.error(error?.message ?? 'Algo salió mal.', { id: toastId });
    } else {
        toast.error('Algo salió mal.', { id: toastId });
    }
};

const handleFormError = <TFields extends FieldValues = FieldValues>(
    fieldErrors: FieldError[],
    form: FormOptions<TFields>,
) => {
    const formFields = Object.keys(form.getValues());

    fieldErrors.forEach(fieldError => {
        const path = fieldError.path.join('.') as FieldPath<TFields>;
        if (formFields.includes(path)) {
            form.setError(path, { message: fieldError.message });
        } else {
            console.error(`Field ${path}: ${fieldError.message}`);
        }
    });
};

//#endregion

//#region Form validation

type TypeValidationMessage = {
    required_error: string;
    invalid_type_error?: string;
};

type ValidationMessage = {
    message: string;
};

const createTypeMessage = (
    invalidTypeMessage?: string,
): TypeValidationMessage => ({
    required_error: 'Campo obligatorio',
    invalid_type_error: invalidTypeMessage,
});
const createMessage = (message: string): ValidationMessage => ({ message });

/**
 * Validation messages.
 */
export const message = {
    required: createTypeMessage(),
    email: createMessage('Correo electrónico inválido'),
    nonEmpty: createMessage('Campo obligatorio'),
    minLength: (minLength: number) =>
        createMessage(
            `Debe tener al menos ${minLength} caracter${
                minLength === 1 ? '' : 'es'
            }`,
        ),
    maxLength: (maxLength: number) =>
        createMessage(
            `Debe tener como máximo ${maxLength} caracter${
                maxLength === 1 ? '' : 'es'
            }`,
        ),
    exactLength: (length: number) =>
        createMessage(
            `Debe tener ${length} caracter${length === 1 ? '' : 'es'}`,
        ),

    number: createTypeMessage('Número inválido'),
    min: (min: number) => createMessage(`Debe ser mayor o igual a ${min}`),
    max: (max: number) => createMessage(`Debe ser menor o igual a ${max}`),

    date: createTypeMessage('Fecha inválida'),
    minDate: (minDate: Date) =>
        createMessage(
            `No debe ser anterior al ${formatDateForDisplay(minDate)}`,
        ),
    maxDate: (maxDate: Date) =>
        createMessage(
            `No debe ser posterior al ${formatDateForDisplay(maxDate)}`,
        ),
    maxDateToday: createMessage('No debe ser posterior a la fecha actual'),

    boolean: createTypeMessage('Valor inválido'),
    password: createMessage(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
    ),
};

const errorMap: zod.ZodErrorMap = issue => {
    if (issue.code === zod.ZodIssueCode.invalid_date) {
        return { message: 'Fecha inválida' };
    }
    return { message: 'Campo inválido' };
};
zod.setErrorMap(errorMap); // Set the error map for all Zod schemas

/**
 * Zod validation.
 */
export const v = zod;

/**
 * Resolver a Zod schema.
 */
export const schemaResolver = zodResolver;

/**
 * Infer the type of a Zod schema.
 */
export type InferSchemaType<T extends ZodType<unknown, ZodTypeDef>> =
    z.infer<T>;

//#endregion
