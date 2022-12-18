import { DATE_CONFIG } from '@/constants/settings';
import { today, tryParseDate } from '@/utils/dateHelpers';
import { sanitizeEmail, sanitizeOptionalField, sanitizeText } from '@/utils/sanitizers';
import { isValidPassword, message, v } from '@/utils/validation';

export const GetUsersRequestSchema = v.object({
    role: v.string(message.required)
        .transform(sanitizeOptionalField)
}).partial({ role: true });

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
            .min(DATE_CONFIG.minDate, message.minDate(DATE_CONFIG.minDate))
            .max(today("endOfDay"), message.maxDateToday)
    ),
    email: v.string(message.required)
        .min(1, message.nonEmpty)
        .email(message.email)
        .transform(sanitizeEmail),
    roleId: v.number(message.required)
        .min(1, message.nonEmpty),
});

export const CreateUserRequestSchema = UserRequestSchema.extend({
    password: v.string(message.required)
        .min(1, message.nonEmpty)
        .refine(isValidPassword, message.password),
});

export const UpdateUserRequestSchema = UserRequestSchema.extend({
    password: v.string(message.required)
        .refine(value => {
            if (value === '') return true;
            return isValidPassword(value);
        }, message.password),
}).partial({ password: true });