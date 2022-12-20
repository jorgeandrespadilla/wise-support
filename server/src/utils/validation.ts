import zod, { z, ZodType } from 'zod';
import { ValidationError } from '@/common/errors';
import { formatDateForDisplay } from './dateHelpers';

type TypeValidationMessage = {
    required_error: string;
    invalid_type_error?: string;
};

type ValidationMessage = {
    message: string;
};

type FieldError = {
    path: (string | number)[];
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
    minDateLessThanMaxDate: createMessage(
        'La fecha de inicio no debe ser posterior a la fecha de fin',
    ),

    boolean: createTypeMessage('Valor inválido'),
    password: createMessage(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
    ),
};

/**
 * Check if a string is a valid password.
 * @param password The password to check.
 * @returns Whether the password is valid or not.
 */
export const isValidPassword = (password: string) => {
    const hasNumber = /\d/;
    const hasUpperLetter = /[A-Z]/;
    const hasLowerLetter = /[a-z]/;
    if (password.length < 8) return false;
    if (!hasNumber.test(password)) return false;
    if (!hasUpperLetter.test(password)) return false;
    if (!hasLowerLetter.test(password)) return false;
    return true;
};

/**
 * Validates and parses data using a Zod schema.
 * @param schema The Zod schema to use.
 * @param data The data to validate and parse.
 * @returns The parsed data.
 * @throws ValidationError if the data is invalid.
 */
export const validateAndParse = <T extends zod.ZodTypeAny>(
    schema: T,
    data: any,
): zod.infer<T> => {
    const result = schema.safeParse(data);
    if (!result.success) {
        const fieldErrors = generateFieldErrors(result.error.issues);
        throw new ValidationError('Validación fallida.', {
            fields: fieldErrors,
        });
    }
    return result.data;
};

const generateFieldErrors = (issues: zod.ZodIssue[]): FieldError[] => {
    return issues.map(issue => {
        const path = issue.path;
        const message = issue.message;
        return { path, message, code: issue.code };
    });
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
 * Infer the type of a Zod schema.
 */
export type InferSchemaType<T extends ZodType<any, any, any>> = z.infer<T>;
