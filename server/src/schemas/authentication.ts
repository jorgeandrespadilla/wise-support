import { sanitizeEmail } from '@/utils/sanitizers';
import { message, v } from '@/utils/validation';

export const AuthRequestSchema = v.object({
    email: v.string(message.required)
        .min(1, message.nonEmpty)
        .email(message.email)
        .transform(sanitizeEmail),
    password: v.string(message.required)
        .min(1, message.nonEmpty),
});
