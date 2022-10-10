import { today, tryParseDate } from '@/utils/dateHelpers';
import { sanitizeEmail, sanitizeText } from '@/utils/sanitizers';
import { isValidPassword, message, v } from '@/utils/validation';

const minDate = new Date(1900, 0, 1);

const UserRequestSchema = v.object({
    firstName: v.string(message.required)
        .min(1, message.nonEmpty)
        .transform(sanitizeText),
    lastName: v.string(message.required)
        .min(1, message.nonEmpty)
        .transform(sanitizeText),
    birthDate: v.preprocess(
        tryParseDate,
        v.date(message.date)
            .min(minDate, message.minDate(minDate))
            .max(today(), message.maxDate(today()))
    ),
    email: v.string(message.required)
        .email(message.email)
        .transform(sanitizeEmail),
});

export const UserCreateRequestSchema = UserRequestSchema.extend({
    password: v.string(message.required)
        .refine(isValidPassword, message.password),
});
export const UserUpdateRequestSchema = UserRequestSchema.extend({
    password: v.string(message.required)
        .refine(value => {
            if (value === '') return true;
            return isValidPassword(value);
        }, message.password),
}).partial({ password: true });