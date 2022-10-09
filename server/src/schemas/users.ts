import { tryParseDate } from '@/utils/dateHelpers';
import { sanitizeEmail, sanitizeText } from '@/utils/sanitizers';
import { isValidPassword, message, v } from '@/utils/validation';

const UserRequestSchema = v.object({
    firstName: v.string(message.required)
        .min(1, message.minLength(1))
        .max(50, message.maxLength(50))
        .transform(sanitizeText),
    lastName: v.string(message.required)
        .min(1, message.minLength(1))
        .max(50, message.maxLength(50))
        .transform(sanitizeText),
    birthDate: v.preprocess(
        tryParseDate,
        v.date(message.date)
            .min(new Date(1900, 0, 1), message.minDate(new Date(1900, 0, 1)))
            .max(new Date(), message.maxDate(new Date()))
    ),
    email: v.string(message.required)
        .email(message.email)
        .transform(sanitizeEmail),
    password: v.string(message.required)
        .refine(isValidPassword, message.password),
});

export const UserCreateRequestSchema = UserRequestSchema;
export const UserUpdateRequestSchema = UserRequestSchema.partial({ password: true });